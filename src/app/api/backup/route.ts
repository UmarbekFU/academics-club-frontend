import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Logger } from '@/lib/logger'
import { ApiErrorHandler } from '@/lib/error-handler'
import { requireAdmin } from '@/lib/auth'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { z } from 'zod'

// Backup configuration
interface BackupConfig {
  enabled: boolean
  schedule: string // Cron expression
  retentionDays: number
  compressionEnabled: boolean
  encryptionEnabled: boolean
  storageLocation: string
}

// Default backup configuration
const defaultBackupConfig: BackupConfig = {
  enabled: process.env.BACKUP_ENABLED === 'true',
  schedule: process.env.BACKUP_SCHEDULE || '0 2 * * *', // Daily at 2 AM
  retentionDays: parseInt(process.env.BACKUP_RETENTION_DAYS || '30'),
  compressionEnabled: process.env.BACKUP_COMPRESSION === 'true',
  encryptionEnabled: process.env.BACKUP_ENCRYPTION === 'true',
  storageLocation: process.env.BACKUP_LOCATION || './backups',
}

// Backup service
export class BackupService {
  private static config = defaultBackupConfig
  
  static configure(config: Partial<BackupConfig>): void {
    this.config = { ...this.config, ...config }
  }
  
  static async createBackup(): Promise<{
    id: string
    filename: string
    size: number
    createdAt: string
    tables: string[]
  }> {
    const backupId = `backup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `backup_${timestamp}.json`
    
    try {
      Logger.info('Starting database backup', { backupId, filename })
      
      // Ensure backup directory exists
      await mkdir(this.config.storageLocation, { recursive: true })
      
      // Get all table data
      const tables = await this.exportAllTables()
      
      // Create backup object
      const backup = {
        id: backupId,
        createdAt: new Date().toISOString(),
        version: '1.0.0',
        database: 'the-academics-club',
        tables,
        metadata: {
          totalRecords: Object.values(tables).reduce((sum, table) => sum + table.length, 0),
          tableCount: Object.keys(tables).length,
        },
      }
      
      // Serialize backup data
      const backupData = JSON.stringify(backup, null, 2)
      
      // Write backup file
      const filePath = join(this.config.storageLocation, filename)
      await writeFile(filePath, backupData, 'utf8')
      
      // Get file size
      const stats = await require('fs').promises.stat(filePath)
      const size = stats.size
      
      Logger.info('Database backup completed', {
        backupId,
        filename,
        size,
        recordCount: backup.metadata.totalRecords,
      })
      
      return {
        id: backupId,
        filename,
        size,
        createdAt: backup.createdAt,
        tables: Object.keys(tables),
      }
    } catch (error) {
      Logger.error('Database backup failed', { backupId }, error as Error)
      throw error
    }
  }
  
  private static async exportAllTables(): Promise<Record<string, any[]>> {
    const tables: Record<string, any[]> = {}
    
    // Export applications
    tables.applications = await prisma.application.findMany({
      orderBy: { createdAt: 'asc' },
    })
    
    // Export blog posts
    tables.blog_posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'asc' },
    })
    
    // Export authors
    tables.authors = await prisma.author.findMany({
      orderBy: { createdAt: 'asc' },
    })
    
    // Export admins
    tables.admins = await prisma.admin.findMany({
      orderBy: { createdAt: 'asc' },
    })
    
    // Export team members
    tables.team_members = await prisma.teamMember.findMany({
      orderBy: { createdAt: 'asc' },
    })
    
    // Export programs
    tables.programs = await prisma.program.findMany({
      orderBy: { createdAt: 'asc' },
    })
    
    // Export newsletter
    tables.newsletter = await prisma.newsletter.findMany({
      orderBy: { createdAt: 'asc' },
    })
    
    // Export resources
    tables.resources = await prisma.resource.findMany({
      orderBy: { createdAt: 'asc' },
    })
    
    return tables
  }
  
  static async restoreBackup(backupData: any): Promise<{
    success: boolean
    message: string
    restoredTables: string[]
    restoredRecords: number
  }> {
    try {
      Logger.info('Starting database restore', { backupId: backupData.id })
      
      let restoredRecords = 0
      const restoredTables: string[] = []
      
      // Restore each table
      for (const [tableName, records] of Object.entries(backupData.tables)) {
        if (Array.isArray(records) && records.length > 0) {
          await this.restoreTable(tableName, records as any[])
          restoredRecords += records.length
          restoredTables.push(tableName)
        }
      }
      
      Logger.info('Database restore completed', {
        backupId: backupData.id,
        restoredTables,
        restoredRecords,
      })
      
      return {
        success: true,
        message: 'Database restored successfully',
        restoredTables,
        restoredRecords,
      }
    } catch (error) {
      Logger.error('Database restore failed', { backupId: backupData.id }, error as Error)
      throw error
    }
  }
  
  private static async restoreTable(tableName: string, records: any[]): Promise<void> {
    // Clear existing data
    await this.clearTable(tableName)
    
    // Insert new data
    for (const record of records) {
      await this.insertRecord(tableName, record)
    }
  }
  
  private static async clearTable(tableName: string): Promise<void> {
    // Use raw SQL to clear table
    const tableMap: Record<string, any> = {
      applications: prisma.application,
      blog_posts: prisma.blogPost,
      authors: prisma.author,
      admins: prisma.admin,
      team_members: prisma.teamMember,
      programs: prisma.program,
      newsletter: prisma.newsletter,
      resources: prisma.resource,
    }
    
    const model = tableMap[tableName]
    if (model && model.deleteMany) {
      await model.deleteMany({})
    }
  }
  
  private static async insertRecord(tableName: string, record: any): Promise<void> {
    const tableMap: Record<string, any> = {
      applications: prisma.application,
      blog_posts: prisma.blogPost,
      authors: prisma.author,
      admins: prisma.admin,
      team_members: prisma.teamMember,
      programs: prisma.program,
      newsletter: prisma.newsletter,
      resources: prisma.resource,
    }
    
    const model = tableMap[tableName]
    if (model && model.create) {
      await model.create({ data: record })
    }
  }
  
  static async listBackups(): Promise<{
    backups: Array<{
      filename: string
      size: number
      createdAt: string
      id: string
    }>
    totalSize: number
  }> {
    try {
      const fs = require('fs')
      const path = require('path')
      
      const backupDir = this.config.storageLocation
      const files = await fs.promises.readdir(backupDir)
      
      const backups = []
      let totalSize = 0
      
      for (const file of files) {
        if (file.startsWith('backup_') && file.endsWith('.json')) {
          const filePath = path.join(backupDir, file)
          const stats = await fs.promises.stat(filePath)
          
          // Extract backup ID from filename
          const id = file.replace('backup_', '').replace('.json', '')
          
          backups.push({
            filename: file,
            size: stats.size,
            createdAt: stats.birthtime.toISOString(),
            id,
          })
          
          totalSize += stats.size
        }
      }
      
      // Sort by creation time (newest first)
      backups.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      
      return { backups, totalSize }
    } catch (error) {
      Logger.error('Failed to list backups', {}, error as Error)
      throw error
    }
  }
  
  static async getBackup(filename: string): Promise<any> {
    try {
      const filePath = join(this.config.storageLocation, filename)
      const backupData = await readFile(filePath, 'utf8')
      return JSON.parse(backupData)
    } catch (error) {
      Logger.error('Failed to read backup file', { filename }, error as Error)
      throw error
    }
  }
  
  static async deleteBackup(filename: string): Promise<void> {
    try {
      const fs = require('fs')
      const filePath = join(this.config.storageLocation, filename)
      await fs.promises.unlink(filePath)
      
      Logger.info('Backup deleted', { filename })
    } catch (error) {
      Logger.error('Failed to delete backup', { filename }, error as Error)
      throw error
    }
  }
  
  static async cleanupOldBackups(): Promise<{
    deletedCount: number
    freedSpace: number
  }> {
    try {
      const { backups } = await this.listBackups()
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - this.config.retentionDays)
      
      let deletedCount = 0
      let freedSpace = 0
      
      for (const backup of backups) {
        if (new Date(backup.createdAt) < cutoffDate) {
          await this.deleteBackup(backup.filename)
          deletedCount++
          freedSpace += backup.size
        }
      }
      
      Logger.info('Backup cleanup completed', { deletedCount, freedSpace })
      
      return { deletedCount, freedSpace }
    } catch (error) {
      Logger.error('Backup cleanup failed', {}, error as Error)
      throw error
    }
  }
}

// Validation schemas
const restoreBackupSchema = z.object({
  backupId: z.string().min(1, 'Backup ID is required'),
  confirmRestore: z.boolean().refine(val => val === true, 'Restore confirmation is required'),
})

// API Routes
export async function GET(request: NextRequest) {
  try {
    requireAdmin(request)
    
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || 'list'
    
    switch (action) {
      case 'list':
        const backups = await BackupService.listBackups()
        return ApiErrorHandler.success(backups, 'Backups retrieved successfully')
      
      case 'download':
        const filename = searchParams.get('filename')
        if (!filename) {
          return ApiErrorHandler.badRequest('Filename parameter is required')
        }
        
        const backupData = await BackupService.getBackup(filename)
        return NextResponse.json(backupData, {
          headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="${filename}"`,
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
      case 'create':
        const backup = await BackupService.createBackup()
        return ApiErrorHandler.created(backup, 'Backup created successfully')
      
      case 'restore':
        const { backupId, confirmRestore } = restoreBackupSchema.parse(body)
        
        if (!confirmRestore) {
          return ApiErrorHandler.badRequest('Restore confirmation is required')
        }
        
        const backupData = await BackupService.getBackup(`${backupId}.json`)
        const result = await BackupService.restoreBackup(backupData)
        
        return ApiErrorHandler.success(result, 'Backup restored successfully')
      
      case 'cleanup':
        const cleanupResult = await BackupService.cleanupOldBackups()
        return ApiErrorHandler.success(cleanupResult, 'Backup cleanup completed')
      
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

export async function DELETE(request: NextRequest) {
  try {
    requireAdmin(request)
    
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')
    
    if (!filename) {
      return ApiErrorHandler.badRequest('Filename parameter is required')
    }
    
    await BackupService.deleteBackup(filename)
    return ApiErrorHandler.success(null, 'Backup deleted successfully')
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
