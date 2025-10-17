import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiErrorHandler } from '@/lib/error-handler'
import { requireAdmin } from '@/lib/auth'

// Analytics service
export class AnalyticsService {
  static async getApplicationAnalytics() {
    const [
      totalApplications,
      applicationsByStatus,
      applicationsByProgram,
      applicationsByMonth,
      recentApplications,
    ] = await Promise.all([
      prisma.application.count(),
      prisma.application.groupBy({
        by: ['status'],
        _count: { status: true },
        orderBy: { _count: { status: 'desc' } },
      }),
      prisma.application.groupBy({
        by: ['program'],
        _count: { program: true },
        orderBy: { _count: { program: 'desc' } },
      }),
      prisma.$queryRaw`
        SELECT 
          strftime('%Y-%m', createdAt) as month,
          COUNT(*) as count
        FROM applications 
        WHERE createdAt >= datetime('now', '-12 months')
        GROUP BY strftime('%Y-%m', createdAt)
        ORDER BY month DESC
      `,
      prisma.application.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          program: true,
          status: true,
          createdAt: true,
        },
      }),
    ])
    
    return {
      totalApplications,
      applicationsByStatus,
      applicationsByProgram,
      applicationsByMonth,
      recentApplications,
    }
  }
  
  static async getNewsletterAnalytics() {
    const [
      totalSubscribers,
      activeSubscribers,
      subscribersByMonth,
    ] = await Promise.all([
      prisma.newsletter.count(),
      prisma.newsletter.count({ where: { active: true } }),
      prisma.$queryRaw`
        SELECT 
          strftime('%Y-%m', createdAt) as month,
          COUNT(*) as count
        FROM newsletter 
        WHERE createdAt >= datetime('now', '-12 months')
        GROUP BY strftime('%Y-%m', createdAt)
        ORDER BY month DESC
      `,
    ])
    
    return {
      totalSubscribers,
      activeSubscribers,
      subscribersByMonth,
    }
  }
  
  static async getBlogAnalytics() {
    const [
      totalPosts,
      publishedPosts,
      featuredPosts,
      postsByAuthor,
      postsByMonth,
      topPosts,
    ] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.blogPost.count({ where: { featured: true } }),
      prisma.blogPost.groupBy({
        by: ['authorId'],
        _count: { authorId: true },
        orderBy: { _count: { authorId: 'desc' } },
      }),
      prisma.$queryRaw`
        SELECT 
          strftime('%Y-%m', createdAt) as month,
          COUNT(*) as count
        FROM blog_posts 
        WHERE createdAt >= datetime('now', '-12 months')
        GROUP BY strftime('%Y-%m', createdAt)
        ORDER BY month DESC
      `,
      prisma.blogPost.findMany({
        where: { published: true },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          createdAt: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      }),
    ])
    
    return {
      totalPosts,
      publishedPosts,
      featuredPosts,
      postsByAuthor,
      postsByMonth,
      topPosts,
    }
  }
  
  static async getResourceAnalytics() {
    const [
      totalResources,
      activeResources,
      resourcesByType,
      topResources,
      totalDownloads,
    ] = await Promise.all([
      prisma.resource.count(),
      prisma.resource.count({ where: { active: true } }),
      prisma.resource.groupBy({
        by: ['type'],
        _count: { type: true },
        orderBy: { _count: { type: 'desc' } },
      }),
      prisma.resource.findMany({
        where: { active: true },
        take: 5,
        orderBy: { downloads: 'desc' },
        select: {
          id: true,
          title: true,
          type: true,
          downloads: true,
        },
      }),
      prisma.resource.aggregate({
        _sum: { downloads: true },
      }),
    ])
    
    return {
      totalResources,
      activeResources,
      resourcesByType,
      topResources,
      totalDownloads: totalDownloads._sum.downloads || 0,
    }
  }
  
  static async getOverallStats() {
    const [
      applicationStats,
      newsletterStats,
      blogStats,
      resourceStats,
    ] = await Promise.all([
      this.getApplicationAnalytics(),
      this.getNewsletterAnalytics(),
      this.getBlogAnalytics(),
      this.getResourceAnalytics(),
    ])
    
    return {
      applications: applicationStats,
      newsletter: newsletterStats,
      blog: blogStats,
      resources: resourceStats,
      generatedAt: new Date().toISOString(),
    }
  }
}

// API routes
export async function GET(request: NextRequest) {
  try {
    requireAdmin(request)
    
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'overall'
    
    let data
    switch (type) {
      case 'applications':
        data = await AnalyticsService.getApplicationAnalytics()
        break
      case 'newsletter':
        data = await AnalyticsService.getNewsletterAnalytics()
        break
      case 'blog':
        data = await AnalyticsService.getBlogAnalytics()
        break
      case 'resources':
        data = await AnalyticsService.getResourceAnalytics()
        break
      case 'overall':
      default:
        data = await AnalyticsService.getOverallStats()
        break
    }
    
    return ApiErrorHandler.success(data, 'Analytics retrieved successfully')
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

// Export analytics data
export async function POST(request: NextRequest) {
  try {
    requireAdmin(request)
    
    const body = await request.json()
    const { type = 'overall', format = 'json' } = body
    
    let data
    switch (type) {
      case 'applications':
        data = await AnalyticsService.getApplicationAnalytics()
        break
      case 'newsletter':
        data = await AnalyticsService.getNewsletterAnalytics()
        break
      case 'blog':
        data = await AnalyticsService.getBlogAnalytics()
        break
      case 'resources':
        data = await AnalyticsService.getResourceAnalytics()
        break
      case 'overall':
      default:
        data = await AnalyticsService.getOverallStats()
        break
    }
    
    if (format === 'csv') {
      // Convert to CSV format
      const csv = convertToCSV(data)
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="analytics-${type}-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      })
    }
    
    return ApiErrorHandler.success(data, 'Analytics exported successfully')
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

// Helper function to convert data to CSV
function convertToCSV(data: any): string {
  const headers = Object.keys(data)
  const rows = [headers.join(',')]
  
  // Simple CSV conversion - in production, use a proper CSV library
  for (const header of headers) {
    const value = data[header]
    if (Array.isArray(value)) {
      rows.push(`${header},${value.length}`)
    } else if (typeof value === 'object') {
      rows.push(`${header},"${JSON.stringify(value).replace(/"/g, '""')}"`)
    } else {
      rows.push(`${header},${value}`)
    }
  }
  
  return rows.join('\n')
}
