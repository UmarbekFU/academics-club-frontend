import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

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
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: blogPost,
    })
  } catch (error) {
    console.error('Get blog post error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
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
        return NextResponse.json(
          { 
            success: false, 
            message: 'A blog post with this slug already exists' 
          },
          { status: 400 }
        )
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
    
    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
      data: blogPost,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.issues 
        },
        { status: 400 }
      )
    }
    
    console.error('Update blog post error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
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
    
    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    })
  } catch (error) {
    console.error('Delete blog post error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

