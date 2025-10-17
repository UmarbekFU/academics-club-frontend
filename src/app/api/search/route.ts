import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiErrorHandler } from '@/lib/error-handler'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100, 'Query too long'),
  type: z.enum(['blog', 'resources', 'programs', 'team', 'all']).default('all'),
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('10'),
})

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = rateLimit(request, '/api/search')
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many search requests. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '30',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      )
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') || ''
    const type = searchParams.get('type') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const validatedData = searchSchema.parse({ query, type, page: page.toString(), limit: limit.toString() })
    
    const skip = (page - 1) * limit
    const results: any = {
      blog: [],
      resources: [],
      programs: [],
      team: [],
      total: 0,
      page,
      limit,
      pages: 0,
    }
    
    // Search blog posts
    if (validatedData.type === 'blog' || validatedData.type === 'all') {
      const blogResults = await prisma.blogPost.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: validatedData.query, mode: 'insensitive' } },
            { content: { contains: validatedData.query, mode: 'insensitive' } },
            { excerpt: { contains: validatedData.query, mode: 'insensitive' } },
            { tags: { contains: validatedData.query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          tags: true,
          createdAt: true,
          author: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: validatedData.type === 'blog' ? skip : 0,
        take: validatedData.type === 'blog' ? limit : 5,
      })
      
      results.blog = blogResults
    }
    
    // Search resources
    if (validatedData.type === 'resources' || validatedData.type === 'all') {
      const resourceResults = await prisma.resource.findMany({
        where: {
          active: true,
          OR: [
            { title: { contains: validatedData.query, mode: 'insensitive' } },
            { description: { contains: validatedData.query, mode: 'insensitive' } },
            { type: { contains: validatedData.query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          description: true,
          type: true,
          pages: true,
          downloads: true,
          highlights: true,
          fileUrl: true,
        },
        orderBy: { downloads: 'desc' },
        skip: validatedData.type === 'resources' ? skip : 0,
        take: validatedData.type === 'resources' ? limit : 5,
      })
      
      results.resources = resourceResults
    }
    
    // Search programs
    if (validatedData.type === 'programs' || validatedData.type === 'all') {
      const programResults = await prisma.program.findMany({
        where: {
          active: true,
          OR: [
            { name: { contains: validatedData.query, mode: 'insensitive' } },
            { description: { contains: validatedData.query, mode: 'insensitive' } },
            { content: { contains: validatedData.query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          duration: true,
          level: true,
          price: true,
          image: true,
        },
        orderBy: { createdAt: 'asc' },
        skip: validatedData.type === 'programs' ? skip : 0,
        take: validatedData.type === 'programs' ? limit : 5,
      })
      
      results.programs = programResults
    }
    
    // Search team members
    if (validatedData.type === 'team' || validatedData.type === 'all') {
      const teamResults = await prisma.teamMember.findMany({
        where: {
          active: true,
          OR: [
            { name: { contains: validatedData.query, mode: 'insensitive' } },
            { position: { contains: validatedData.query, mode: 'insensitive' } },
            { bio: { contains: validatedData.query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          name: true,
          position: true,
          bio: true,
          image: true,
          email: true,
          linkedin: true,
          twitter: true,
        },
        orderBy: { order: 'asc' },
        skip: validatedData.type === 'team' ? skip : 0,
        take: validatedData.type === 'team' ? limit : 5,
      })
      
      results.team = teamResults
    }
    
    // Calculate totals
    if (validatedData.type === 'blog') {
      const total = await prisma.blogPost.count({
        where: {
          published: true,
          OR: [
            { title: { contains: validatedData.query, mode: 'insensitive' } },
            { content: { contains: validatedData.query, mode: 'insensitive' } },
            { excerpt: { contains: validatedData.query, mode: 'insensitive' } },
            { tags: { contains: validatedData.query, mode: 'insensitive' } },
          ],
        },
      })
      results.total = total
      results.pages = Math.ceil(total / limit)
    } else if (validatedData.type === 'resources') {
      const total = await prisma.resource.count({
        where: {
          active: true,
          OR: [
            { title: { contains: validatedData.query, mode: 'insensitive' } },
            { description: { contains: validatedData.query, mode: 'insensitive' } },
            { type: { contains: validatedData.query, mode: 'insensitive' } },
          ],
        },
      })
      results.total = total
      results.pages = Math.ceil(total / limit)
    } else if (validatedData.type === 'programs') {
      const total = await prisma.program.count({
        where: {
          active: true,
          OR: [
            { name: { contains: validatedData.query, mode: 'insensitive' } },
            { description: { contains: validatedData.query, mode: 'insensitive' } },
            { content: { contains: validatedData.query, mode: 'insensitive' } },
          ],
        },
      })
      results.total = total
      results.pages = Math.ceil(total / limit)
    } else if (validatedData.type === 'team') {
      const total = await prisma.teamMember.count({
        where: {
          active: true,
          OR: [
            { name: { contains: validatedData.query, mode: 'insensitive' } },
            { position: { contains: validatedData.query, mode: 'insensitive' } },
            { bio: { contains: validatedData.query, mode: 'insensitive' } },
          ],
        },
      })
      results.total = total
      results.pages = Math.ceil(total / limit)
    } else {
      // For 'all' type, return combined results without pagination
      results.total = results.blog.length + results.resources.length + results.programs.length + results.team.length
    }
    
    return ApiErrorHandler.success(results, 'Search completed successfully')
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}

// Advanced search with filters
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, filters = {}, page = 1, limit = 10 } = body
    
    if (!query || query.trim().length === 0) {
      return ApiErrorHandler.badRequest('Search query is required')
    }
    
    const skip = (page - 1) * limit
    const results: any = {
      blog: [],
      resources: [],
      programs: [],
      team: [],
      total: 0,
      page,
      limit,
      pages: 0,
    }
    
    // Build search conditions
    const blogWhere: any = {
      published: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
        { excerpt: { contains: query, mode: 'insensitive' } },
        { tags: { contains: query, mode: 'insensitive' } },
      ],
    }
    
    // Apply filters
    if (filters.tags && filters.tags.length > 0) {
      blogWhere.tags = {
        in: filters.tags.map((tag: string) => tag.toLowerCase())
      }
    }
    
    if (filters.dateRange) {
      blogWhere.createdAt = {
        gte: new Date(filters.dateRange.start),
        lte: new Date(filters.dateRange.end),
      }
    }
    
    // Search blog posts
    const blogResults = await prisma.blogPost.findMany({
      where: blogWhere,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        tags: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    })
    
    results.blog = blogResults
    
    // Get total count
    const total = await prisma.blogPost.count({ where: blogWhere })
    results.total = total
    results.pages = Math.ceil(total / limit)
    
    return ApiErrorHandler.success(results, 'Advanced search completed successfully')
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}
