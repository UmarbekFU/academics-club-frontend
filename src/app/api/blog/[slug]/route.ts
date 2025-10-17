import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { ApiErrorHandler } from '@/lib/error-handler'

const updateBlogPostSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  tags: z.string().optional(),
  authorId: z.string().min(1).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            bio: true,
          },
        },
      },
    })
    
    if (!blogPost) {
      return ApiErrorHandler.notFound('Blog post not found')
    }
    
    return ApiErrorHandler.success(blogPost, 'Blog post retrieved successfully')
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    const validatedData = updateBlogPostSchema.parse(body)
    
    // If updating slug, check if it already exists
    if (validatedData.slug) {
      const existingPost = await prisma.blogPost.findUnique({
        where: { slug: validatedData.slug },
      })
      
      if (existingPost && existingPost.slug !== slug) {
        return ApiErrorHandler.badRequest('A blog post with this slug already exists')
      }
    }
    
    const blogPost = await prisma.blogPost.update({
      where: { slug },
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
    
    return ApiErrorHandler.success(blogPost, 'Blog post updated successfully')
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    await prisma.blogPost.delete({
      where: { slug },
    })
    
    return ApiErrorHandler.success(null, 'Blog post deleted successfully')
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}

