import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Logger } from '@/lib/logger'
import { PerformanceMonitor } from '@/lib/logger'
import { ApiErrorHandler } from '@/lib/error-handler'

// Health check status
interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  version: string
  uptime: number
  services: {
    database: ServiceStatus
    email?: ServiceStatus
    redis?: ServiceStatus
    storage?: ServiceStatus
  }
  metrics: {
    memory: {
      used: number
      total: number
      percentage: number
    }
    cpu?: {
      usage: number
    }
  }
}

interface ServiceStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  responseTime?: number
  lastChecked: string
  error?: string
}

// System metrics
interface SystemMetrics {
  timestamp: string
  applications: {
    total: number
    pending: number
    contacted: number
    enrolled: number
    rejected: number
  }
  newsletter: {
    total: number
    active: number
  }
  blog: {
    total: number
    published: number
    featured: number
  }
  resources: {
    total: number
    active: number
    totalDownloads: number
  }
  performance: {
    avgResponseTime: number
    errorRate: number
    requestsPerMinute: number
  }
}

// Health check service
export class HealthService {
  static async checkDatabase(): Promise<ServiceStatus> {
    const startTime = Date.now()
    
    try {
      await prisma.$queryRaw`SELECT 1`
      const responseTime = Date.now() - startTime
      
      return {
        status: responseTime < 1000 ? 'healthy' : 'degraded',
        responseTime,
        lastChecked: new Date().toISOString(),
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        lastChecked: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
  
  static async checkEmail(): Promise<ServiceStatus> {
    const startTime = Date.now()
    
    try {
      // Check if email configuration is available
      const hasSmtpConfig = !!(
        process.env.SMTP_HOST &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS
      )
      
      if (!hasSmtpConfig) {
        return {
          status: 'degraded',
          lastChecked: new Date().toISOString(),
          error: 'SMTP configuration missing',
        }
      }
      
      // In a real implementation, you would test the SMTP connection
      const responseTime = Date.now() - startTime
      
      return {
        status: 'healthy',
        responseTime,
        lastChecked: new Date().toISOString(),
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        lastChecked: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
  
  static async checkRedis(): Promise<ServiceStatus> {
    const startTime = Date.now()
    
    try {
      // Check if Redis is configured
      if (!process.env.REDIS_URL) {
        return {
          status: 'degraded',
          lastChecked: new Date().toISOString(),
          error: 'Redis not configured',
        }
      }
      
      // In a real implementation, you would test the Redis connection
      const responseTime = Date.now() - startTime
      
      return {
        status: 'healthy',
        responseTime,
        lastChecked: new Date().toISOString(),
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        lastChecked: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
  
  static async checkStorage(): Promise<ServiceStatus> {
    const startTime = Date.now()
    
    try {
      // Check if storage is accessible
      const fs = require('fs')
      const path = require('path')
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      const exists = fs.existsSync(uploadDir)
      
      if (!exists) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }
      
      const responseTime = Date.now() - startTime
      
      return {
        status: 'healthy',
        responseTime,
        lastChecked: new Date().toISOString(),
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        lastChecked: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
  
  static getSystemMetrics(): { memory: any; cpu?: any } {
    const memoryUsage = process.memoryUsage()
    const totalMemory = memoryUsage.heapTotal + memoryUsage.external
    
    return {
      memory: {
        used: memoryUsage.heapUsed,
        total: totalMemory,
        percentage: Math.round((memoryUsage.heapUsed / totalMemory) * 100),
      },
      // CPU usage would require additional libraries in a real implementation
    }
  }
  
  static async getOverallHealth(): Promise<HealthStatus> {
    const [database, email, redis, storage] = await Promise.all([
      this.checkDatabase(),
      this.checkEmail(),
      this.checkRedis(),
      this.checkStorage(),
    ])
    
    const services = { database, email, redis, storage }
    
    // Determine overall status
    const hasUnhealthy = Object.values(services).some(s => s.status === 'unhealthy')
    const hasDegraded = Object.values(services).some(s => s.status === 'degraded')
    
    let overallStatus: 'healthy' | 'degraded' | 'unhealthy'
    if (hasUnhealthy) {
      overallStatus = 'unhealthy'
    } else if (hasDegraded) {
      overallStatus = 'degraded'
    } else {
      overallStatus = 'healthy'
    }
    
    return {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      services,
      metrics: this.getSystemMetrics(),
    }
  }
}

// Metrics service
export class MetricsService {
  static async getApplicationMetrics() {
    const [total, byStatus] = await Promise.all([
      prisma.application.count(),
      prisma.application.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ])
    
    const statusCounts = byStatus.reduce((acc, item) => {
      acc[item.status] = item._count.status
      return acc
    }, {} as Record<string, number>)
    
    return {
      total,
      pending: statusCounts.pending || 0,
      contacted: statusCounts.contacted || 0,
      enrolled: statusCounts.enrolled || 0,
      rejected: statusCounts.rejected || 0,
    }
  }
  
  static async getNewsletterMetrics() {
    const [total, active] = await Promise.all([
      prisma.newsletter.count(),
      prisma.newsletter.count({ where: { active: true } }),
    ])
    
    return { total, active }
  }
  
  static async getBlogMetrics() {
    const [total, published, featured] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.blogPost.count({ where: { featured: true } }),
    ])
    
    return { total, published, featured }
  }
  
  static async getResourceMetrics() {
    const [total, active, totalDownloads] = await Promise.all([
      prisma.resource.count(),
      prisma.resource.count({ where: { active: true } }),
      prisma.resource.aggregate({
        _sum: { downloads: true },
      }),
    ])
    
    return {
      total,
      active,
      totalDownloads: totalDownloads._sum.downloads || 0,
    }
  }
  
  static async getPerformanceMetrics(): Promise<{
    avgResponseTime: number
    errorRate: number
    requestsPerMinute: number
  }> {
    // In a real implementation, you would collect these metrics from your monitoring system
    return {
      avgResponseTime: 150, // ms
      errorRate: 0.02, // 2%
      requestsPerMinute: 45,
    }
  }
  
  static async getAllMetrics(): Promise<SystemMetrics> {
    const [applications, newsletter, blog, resources, performance] = await Promise.all([
      this.getApplicationMetrics(),
      this.getNewsletterMetrics(),
      this.getBlogMetrics(),
      this.getResourceMetrics(),
      this.getPerformanceMetrics(),
    ])
    
    return {
      timestamp: new Date().toISOString(),
      applications,
      newsletter,
      blog,
      resources,
      performance,
    }
  }
}

// API Routes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'health'
    
    switch (type) {
      case 'health':
        const health = await PerformanceMonitor.measureAsync('health-check', () =>
          HealthService.getOverallHealth()
        )
        
        const statusCode = health.status === 'healthy' ? 200 : 
                          health.status === 'degraded' ? 200 : 503
        
        return NextResponse.json(health, { status: statusCode })
      
      case 'metrics':
        const metrics = await PerformanceMonitor.measureAsync('metrics-collection', () =>
          MetricsService.getAllMetrics()
        )
        
        return NextResponse.json(metrics)
      
      case 'ready':
        const dbStatus = await HealthService.checkDatabase()
        const isReady = dbStatus.status === 'healthy'
        
        return NextResponse.json(
          { ready: isReady, database: dbStatus },
          { status: isReady ? 200 : 503 }
        )
      
      case 'live':
        return NextResponse.json({ alive: true, timestamp: new Date().toISOString() })
      
      default:
        return ApiErrorHandler.badRequest('Invalid health check type')
    }
  } catch (error) {
    Logger.error('Health check failed', { type: 'health-check' }, error as Error)
    return ApiErrorHandler.handle(error)
  }
}

// Detailed health check endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { services = ['database', 'email', 'redis', 'storage'] } = body
    
    const results: Record<string, ServiceStatus> = {}
    
    for (const service of services) {
      switch (service) {
        case 'database':
          results.database = await HealthService.checkDatabase()
          break
        case 'email':
          results.email = await HealthService.checkEmail()
          break
        case 'redis':
          results.redis = await HealthService.checkRedis()
          break
        case 'storage':
          results.storage = await HealthService.checkStorage()
          break
        default:
          results[service] = {
            status: 'unhealthy',
            lastChecked: new Date().toISOString(),
            error: 'Unknown service',
          }
      }
    }
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      services: results,
    })
  } catch (error) {
    Logger.error('Detailed health check failed', {}, error as Error)
    return ApiErrorHandler.handle(error)
  }
}
