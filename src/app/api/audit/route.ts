import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Logger } from '@/lib/logger'
import { ApiErrorHandler } from '@/lib/error-handler'
import { requireAdmin } from '@/lib/auth'
import { z } from 'zod'

// Audit log entry interface
interface AuditLogEntry {
  id: string
  action: string
  resource: string
  resourceId: string
  userId: string
  userType: 'admin' | 'user'
  details: Record<string, unknown>
  ipAddress: string
  userAgent: string
  timestamp: string
}

// Audit log service
export class AuditLogService {
  static async logAction(
    action: string,
    resource: string,
    resourceId: string,
    userId: string,
    userType: 'admin' | 'user',
    details: Record<string, unknown> = {},
    request?: NextRequest
  ): Promise<void> {
    try {
      const ipAddress = request
        ? request.headers.get('x-forwarded-for') ||
          request.headers.get('x-real-ip') ||
          'unknown'
        : 'system'
      
      const userAgent = request
        ? request.headers.get('user-agent') || 'unknown'
        : 'system'
      
      const auditEntry = {
        action,
        resource,
        resourceId,
        userId,
        userType,
        details: JSON.stringify(details),
        ipAddress,
        userAgent,
        timestamp: new Date().toISOString(),
      }
      
      // Store in database
      await prisma.auditLog.create({
        data: auditEntry,
      })
      
      // Also log to application logger
      Logger.info(`Audit: ${action} on ${resource}`, {
        resourceId,
        userId,
        userType,
        ipAddress,
        ...details,
      })
    } catch (error) {
      Logger.error('Failed to log audit action', {
        action,
        resource,
        resourceId,
        userId,
        userType,
      }, error as Error)
    }
  }
  
  static async getAuditLogs(params: {
    page?: number
    limit?: number
    action?: string
    resource?: string
    userId?: string
    userType?: 'admin' | 'user'
    startDate?: string
    endDate?: string
  }): Promise<{
    logs: AuditLogEntry[]
    total: number
    page: number
    limit: number
    pages: number
  }> {
    try {
      const {
        page = 1,
        limit = 50,
        action,
        resource,
        userId,
        userType,
        startDate,
        endDate,
      } = params
      
      const skip = (page - 1) * limit
      
      const where: any = {}
      
      if (action) where.action = action
      if (resource) where.resource = resource
      if (userId) where.userId = userId
      if (userType) where.userType = userType
      
      if (startDate || endDate) {
        where.timestamp = {}
        if (startDate) where.timestamp.gte = new Date(startDate)
        if (endDate) where.timestamp.lte = new Date(endDate)
      }
      
      const [logs, total] = await Promise.all([
        prisma.auditLog.findMany({
          where,
          orderBy: { timestamp: 'desc' },
          skip,
          take: limit,
        }),
        prisma.auditLog.count({ where }),
      ])
      
      // Parse details JSON
      const parsedLogs = logs.map(log => ({
        ...log,
        details: JSON.parse(log.details),
      }))
      
      return {
        logs: parsedLogs,
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      }
    } catch (error) {
      Logger.error('Failed to get audit logs', { params }, error as Error)
      throw error
    }
  }
  
  static async getAuditStats(): Promise<{
    totalActions: number
    actionsByType: Record<string, number>
    actionsByResource: Record<string, number>
    actionsByUser: Record<string, number>
    recentActivity: Array<{
      action: string
      resource: string
      userId: string
      timestamp: string
    }>
  }> {
    try {
      const [
        totalActions,
        actionsByType,
        actionsByResource,
        actionsByUser,
        recentActivity,
      ] = await Promise.all([
        prisma.auditLog.count(),
        prisma.auditLog.groupBy({
          by: ['action'],
          _count: { action: true },
          orderBy: { _count: { action: 'desc' } },
        }),
        prisma.auditLog.groupBy({
          by: ['resource'],
          _count: { resource: true },
          orderBy: { _count: { resource: 'desc' } },
        }),
        prisma.auditLog.groupBy({
          by: ['userId'],
          _count: { userId: true },
          orderBy: { _count: { userId: 'desc' } },
          take: 10,
        }),
        prisma.auditLog.findMany({
          take: 10,
          orderBy: { timestamp: 'desc' },
          select: {
            action: true,
            resource: true,
            userId: true,
            timestamp: true,
          },
        }),
      ])
      
      return {
        totalActions,
        actionsByType: actionsByType.reduce((acc, item) => {
          acc[item.action] = item._count.action
          return acc
        }, {} as Record<string, number>),
        actionsByResource: actionsByResource.reduce((acc, item) => {
          acc[item.resource] = item._count.resource
          return acc
        }, {} as Record<string, number>),
        actionsByUser: actionsByUser.reduce((acc, item) => {
          acc[item.userId] = item._count.userId
          return acc
        }, {} as Record<string, number>),
        recentActivity,
      }
    } catch (error) {
      Logger.error('Failed to get audit stats', {}, error as Error)
      throw error
    }
  }
  
  static async exportAuditLogs(params: {
    action?: string
    resource?: string
    userId?: string
    userType?: 'admin' | 'user'
    startDate?: string
    endDate?: string
    format?: 'json' | 'csv'
  }): Promise<{
    data: string
    filename: string
    contentType: string
  }> {
    try {
      const { format = 'json', ...filterParams } = params
      
      // Get all matching logs (no pagination for export)
      const logs = await prisma.auditLog.findMany({
        where: filterParams,
        orderBy: { timestamp: 'desc' },
      })
      
      const parsedLogs = logs.map(log => ({
        ...log,
        details: JSON.parse(log.details),
      }))
      
      const timestamp = new Date().toISOString().split('T')[0]
      
      if (format === 'csv') {
        const csv = convertToCSV(parsedLogs)
        return {
          data: csv,
          filename: `audit-logs-${timestamp}.csv`,
          contentType: 'text/csv',
        }
      } else {
        return {
          data: JSON.stringify(parsedLogs, null, 2),
          filename: `audit-logs-${timestamp}.json`,
          contentType: 'application/json',
        }
      }
    } catch (error) {
      Logger.error('Failed to export audit logs', { params }, error as Error)
      throw error
    }
  }
  
  static async cleanupOldLogs(retentionDays: number = 90): Promise<{
    deletedCount: number
  }> {
    try {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays)
      
      const result = await prisma.auditLog.deleteMany({
        where: {
          timestamp: {
            lt: cutoffDate,
          },
        },
      })
      
      Logger.info('Audit log cleanup completed', {
        deletedCount: result.count,
        retentionDays,
      })
      
      return { deletedCount: result.count }
    } catch (error) {
      Logger.error('Failed to cleanup audit logs', { retentionDays }, error as Error)
      throw error
    }
  }
}

// Helper function to convert data to CSV
function convertToCSV(data: any[]): string {
  if (data.length === 0) return ''
  
  const headers = Object.keys(data[0])
  const csvRows = [headers.join(',')]
  
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header]
      if (typeof value === 'object') {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`
      }
      return `"${String(value).replace(/"/g, '""')}"`
    })
    csvRows.push(values.join(','))
  }
  
  return csvRows.join('\n')
}

// Validation schemas
const auditLogQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 50),
  action: z.string().optional(),
  resource: z.string().optional(),
  userId: z.string().optional(),
  userType: z.enum(['admin', 'user']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

const exportAuditLogsSchema = z.object({
  action: z.string().optional(),
  resource: z.string().optional(),
  userId: z.string().optional(),
  userType: z.enum(['admin', 'user']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  format: z.enum(['json', 'csv']).optional().default('json'),
})

// API Routes
export async function GET(request: NextRequest) {
  try {
    requireAdmin(request)
    
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || 'list'
    
    switch (action) {
      case 'list':
        const queryParams = auditLogQuerySchema.parse({
          page: searchParams.get('page'),
          limit: searchParams.get('limit'),
          action: searchParams.get('action'),
          resource: searchParams.get('resource'),
          userId: searchParams.get('userId'),
          userType: searchParams.get('userType'),
          startDate: searchParams.get('startDate'),
          endDate: searchParams.get('endDate'),
        })
        
        const logs = await AuditLogService.getAuditLogs(queryParams)
        return ApiErrorHandler.success(logs, 'Audit logs retrieved successfully')
      
      case 'stats':
        const stats = await AuditLogService.getAuditStats()
        return ApiErrorHandler.success(stats, 'Audit stats retrieved successfully')
      
      case 'export':
        const exportParams = exportAuditLogsSchema.parse({
          action: searchParams.get('action'),
          resource: searchParams.get('resource'),
          userId: searchParams.get('userId'),
          userType: searchParams.get('userType'),
          startDate: searchParams.get('startDate'),
          endDate: searchParams.get('endDate'),
          format: searchParams.get('format'),
        })
        
        const exportResult = await AuditLogService.exportAuditLogs(exportParams)
        
        return new NextResponse(exportResult.data, {
          headers: {
            'Content-Type': exportResult.contentType,
            'Content-Disposition': `attachment; filename="${exportResult.filename}"`,
          },
        })
      
      default:
        return ApiErrorHandler.badRequest('Invalid action')
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return ApiErrorHandler.unauthorized('Authentication required')
    }
    if (error instanceof Error && error.message === 'Insufficient permissions') {
      return ApiErrorHandler.forbidden('Admin access required')
    }
    return ApiErrorHandler.handle(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    requireAdmin(request)
    
    const body = await request.json()
    const { action } = body
    
    switch (action) {
      case 'cleanup':
        const { retentionDays = 90 } = body
        const result = await AuditLogService.cleanupOldLogs(retentionDays)
        return ApiErrorHandler.success(result, 'Audit log cleanup completed')
      
      default:
        return ApiErrorHandler.badRequest('Invalid action')
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return ApiErrorHandler.unauthorized('Authentication required')
    }
    if (error instanceof Error && error.message === 'Insufficient permissions') {
      return ApiErrorHandler.forbidden('Admin access required')
    }
    return ApiErrorHandler.handle(error)
  }
}

// Add audit log to Prisma schema
// This should be added to the Prisma schema:
/*
model AuditLog {
  id          String   @id @default(cuid())
  action      String
  resource    String
  resourceId  String
  userId      String
  userType    String   // 'admin' or 'user'
  details     String   // JSON string
  ipAddress   String
  userAgent   String
  timestamp   DateTime @default(now())

  @@index([action])
  @@index([resource])
  @@index([userId])
  @@index([userType])
  @@index([timestamp])
  @@map("audit_logs")
}
*/
