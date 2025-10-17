import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { ApiErrorHandler } from '@/lib/error-handler'

// Cache for blog posts (5 minutes)
const blogCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCachedData(key: string) {
  const cached = blogCache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }
  return null
}

function setCachedData(key: string, data: any) {
  blogCache.set(key, { data, timestamp: Date.now() })
}

function invalidateCache() {
  blogCache.clear()
}

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  tags: z.string().optional(),
  authorId: z.string().min(1, 'Author ID is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = blogPostSchema.parse(body)
    
    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: validatedData.slug },
    })
    
    if (existingPost) {
      return ApiErrorHandler.badRequest('A blog post with this slug already exists')
    }
    
    const blogPost = await prisma.blogPost.create({
      data: validatedData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    })
    
    // Invalidate cache when new post is created
    invalidateCache()
    
    return ApiErrorHandler.created(blogPost, 'Blog post created successfully')
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const published = searchParams.get('published')
    const featured = searchParams.get('featured')
    const tag = searchParams.get('tag')
    
    // Create cache key
    const cacheKey = `blog-${page}-${limit}-${published}-${featured}-${tag}`
    
    // Check cache first
    const cachedData = getCachedData(cacheKey)
    if (cachedData) {
      return NextResponse.json(cachedData, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=300',
          'X-Cache': 'HIT'
        }
      })
    }
    
    const skip = (page - 1) * limit
    
    const where: Record<string, unknown> = {}
    if (published !== null) {
      where.published = published === 'true'
    }
    if (featured !== null) {
      where.featured = featured === 'true'
    }
    if (tag) {
      where.tags = {
        contains: tag,
      }
    }
    
    const [blogPosts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ])
    
    const result = {
      posts: blogPosts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
    
    // Cache the result
    setCachedData(cacheKey, result)
    
    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        'X-Cache': 'MISS'
      }
    })
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}

