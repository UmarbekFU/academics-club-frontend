import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Logger } from '@/lib/logger'
import { ApiErrorHandler } from '@/lib/error-handler'
import { requireAdmin } from '@/lib/auth'
import { blogPostSchema, updateBlogPostSchema } from '@/lib/validation'
import { CacheInvalidation } from '@/lib/cache'

// Content Management Service
export class ContentManagementService {
  // Blog Post Management
  static async createBlogPost(data: any) {
    try {
      const validatedData = blogPostSchema.parse(data)
      
      // Check if slug already exists
      const existingPost = await prisma.blogPost.findUnique({
        where: { slug: validatedData.slug },
      })
      
      if (existingPost) {
        throw new Error('Blog post with this slug already exists')
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
      
      // Invalidate cache
      await CacheInvalidation.invalidateBlogPost(blogPost.slug)
      
      Logger.logAdminAction('blog_post_created', 'admin', blogPost.id)
      
      return blogPost
    } catch (error) {
      Logger.error('Failed to create blog post', { data }, error as Error)
      throw error
    }
  }
  
  static async updateBlogPost(id: string, data: any) {
    try {
      const validatedData = updateBlogPostSchema.parse(data)
      
      const existingPost = await prisma.blogPost.findUnique({
        where: { id },
      })
      
      if (!existingPost) {
        throw new Error('Blog post not found')
      }
      
      // Check slug uniqueness if slug is being updated
      if (validatedData.slug && validatedData.slug !== existingPost.slug) {
        const slugExists = await prisma.blogPost.findUnique({
          where: { slug: validatedData.slug },
        })
        
        if (slugExists) {
          throw new Error('Blog post with this slug already exists')
        }
      }
      
      const blogPost = await prisma.blogPost.update({
        where: { id },
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
      
      // Invalidate cache
      await CacheInvalidation.invalidateBlogPost(blogPost.slug)
      
      Logger.logAdminAction('blog_post_updated', 'admin', blogPost.id)
      
      return blogPost
    } catch (error) {
      Logger.error('Failed to update blog post', { id, data }, error as Error)
      throw error
    }
  }
  
  static async deleteBlogPost(id: string) {
    try {
      const blogPost = await prisma.blogPost.findUnique({
        where: { id },
      })
      
      if (!blogPost) {
        throw new Error('Blog post not found')
      }
      
      await prisma.blogPost.delete({
        where: { id },
      })
      
      // Invalidate cache
      await CacheInvalidation.invalidateBlogPost(blogPost.slug)
      
      Logger.logAdminAction('blog_post_deleted', 'admin', blogPost.id)
      
      return { success: true, message: 'Blog post deleted successfully' }
    } catch (error) {
      Logger.error('Failed to delete blog post', { id }, error as Error)
      throw error
    }
  }
  
  static async getBlogPost(id: string) {
    try {
      const blogPost = await prisma.blogPost.findUnique({
        where: { id },
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
        throw new Error('Blog post not found')
      }
      
      return blogPost
    } catch (error) {
      Logger.error('Failed to get blog post', { id }, error as Error)
      throw error
    }
  }
  
  static async getBlogPosts(params: {
    page?: number
    limit?: number
    published?: boolean
    featured?: boolean
    authorId?: string
  }) {
    try {
      const { page = 1, limit = 10, published, featured, authorId } = params
      const skip = (page - 1) * limit
      
      const where: any = {}
      if (published !== undefined) where.published = published
      if (featured !== undefined) where.featured = featured
      if (authorId) where.authorId = authorId
      
      const [posts, total] = await Promise.all([
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
      
      return {
        posts,
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      }
    } catch (error) {
      Logger.error('Failed to get blog posts', { params }, error as Error)
      throw error
    }
  }
  
  // Author Management
  static async createAuthor(data: {
    name: string
    email: string
    bio?: string
    avatar?: string
  }) {
    try {
      const author = await prisma.author.create({
        data,
      })
      
      Logger.logAdminAction('author_created', 'admin', author.id)
      
      return author
    } catch (error) {
      Logger.error('Failed to create author', { data }, error as Error)
      throw error
    }
  }
  
  static async updateAuthor(id: string, data: {
    name?: string
    email?: string
    bio?: string
    avatar?: string
  }) {
    try {
      const author = await prisma.author.update({
        where: { id },
        data,
      })
      
      Logger.logAdminAction('author_updated', 'admin', author.id)
      
      return author
    } catch (error) {
      Logger.error('Failed to update author', { id, data }, error as Error)
      throw error
    }
  }
  
  static async deleteAuthor(id: string) {
    try {
      // Check if author has blog posts
      const postCount = await prisma.blogPost.count({
        where: { authorId: id },
      })
      
      if (postCount > 0) {
        throw new Error('Cannot delete author with existing blog posts')
      }
      
      await prisma.author.delete({
        where: { id },
      })
      
      Logger.logAdminAction('author_deleted', 'admin', id)
      
      return { success: true, message: 'Author deleted successfully' }
    } catch (error) {
      Logger.error('Failed to delete author', { id }, error as Error)
      throw error
    }
  }
  
  static async getAuthors() {
    try {
      const authors = await prisma.author.findMany({
        include: {
          _count: {
            select: {
              posts: true,
            },
          },
        },
        orderBy: { name: 'asc' },
      })
      
      return authors
    } catch (error) {
      Logger.error('Failed to get authors', {}, error as Error)
      throw error
    }
  }
  
  // Team Member Management
  static async createTeamMember(data: {
    name: string
    position: string
    bio: string
    image?: string
    email?: string
    linkedin?: string
    twitter?: string
    order?: number
  }) {
    try {
      const teamMember = await prisma.teamMember.create({
        data: {
          ...data,
          active: true,
          order: data.order || 0,
        },
      })
      
      // Invalidate cache
      await CacheInvalidation.invalidateTeamMembers()
      
      Logger.logAdminAction('team_member_created', 'admin', teamMember.id)
      
      return teamMember
    } catch (error) {
      Logger.error('Failed to create team member', { data }, error as Error)
      throw error
    }
  }
  
  static async updateTeamMember(id: string, data: {
    name?: string
    position?: string
    bio?: string
    image?: string
    email?: string
    linkedin?: string
    twitter?: string
    order?: number
    active?: boolean
  }) {
    try {
      const teamMember = await prisma.teamMember.update({
        where: { id },
        data,
      })
      
      // Invalidate cache
      await CacheInvalidation.invalidateTeamMembers()
      
      Logger.logAdminAction('team_member_updated', 'admin', teamMember.id)
      
      return teamMember
    } catch (error) {
      Logger.error('Failed to update team member', { id, data }, error as Error)
      throw error
    }
  }
  
  static async deleteTeamMember(id: string) {
    try {
      await prisma.teamMember.delete({
        where: { id },
      })
      
      // Invalidate cache
      await CacheInvalidation.invalidateTeamMembers()
      
      Logger.logAdminAction('team_member_deleted', 'admin', id)
      
      return { success: true, message: 'Team member deleted successfully' }
    } catch (error) {
      Logger.error('Failed to delete team member', { id }, error as Error)
      throw error
    }
  }
  
  // Program Management
  static async createProgram(data: {
    name: string
    slug: string
    description: string
    content: string
    duration: string
    level: string
    price?: number
    image?: string
  }) {
    try {
      const program = await prisma.program.create({
        data: {
          ...data,
          active: true,
        },
      })
      
      // Invalidate cache
      await CacheInvalidation.invalidatePrograms()
      
      Logger.logAdminAction('program_created', 'admin', program.id)
      
      return program
    } catch (error) {
      Logger.error('Failed to create program', { data }, error as Error)
      throw error
    }
  }
  
  static async updateProgram(id: string, data: {
    name?: string
    slug?: string
    description?: string
    content?: string
    duration?: string
    level?: string
    price?: number
    image?: string
    active?: boolean
  }) {
    try {
      const program = await prisma.program.update({
        where: { id },
        data,
      })
      
      // Invalidate cache
      await CacheInvalidation.invalidatePrograms()
      
      Logger.logAdminAction('program_updated', 'admin', program.id)
      
      return program
    } catch (error) {
      Logger.error('Failed to update program', { id, data }, error as Error)
      throw error
    }
  }
  
  static async deleteProgram(id: string) {
    try {
      await prisma.program.delete({
        where: { id },
      })
      
      // Invalidate cache
      await CacheInvalidation.invalidatePrograms()
      
      Logger.logAdminAction('program_deleted', 'admin', id)
      
      return { success: true, message: 'Program deleted successfully' }
    } catch (error) {
      Logger.error('Failed to delete program', { id }, error as Error)
      throw error
    }
  }
  
  // Resource Management
  static async createResource(data: {
    title: string
    description: string
    type: string
    pages?: string
    highlights: string
    fileUrl?: string
  }) {
    try {
      const resource = await prisma.resource.create({
        data: {
          ...data,
          downloads: 0,
          active: true,
        },
      })
      
      // Invalidate cache
      await CacheInvalidation.invalidateResources()
      
      Logger.logAdminAction('resource_created', 'admin', resource.id)
      
      return resource
    } catch (error) {
      Logger.error('Failed to create resource', { data }, error as Error)
      throw error
    }
  }
  
  static async updateResource(id: string, data: {
    title?: string
    description?: string
    type?: string
    pages?: string
    highlights?: string
    fileUrl?: string
    active?: boolean
  }) {
    try {
      const resource = await prisma.resource.update({
        where: { id },
        data,
      })
      
      // Invalidate cache
      await CacheInvalidation.invalidateResources()
      
      Logger.logAdminAction('resource_updated', 'admin', resource.id)
      
      return resource
    } catch (error) {
      Logger.error('Failed to update resource', { id, data }, error as Error)
      throw error
    }
  }
  
  static async deleteResource(id: string) {
    try {
      await prisma.resource.delete({
        where: { id },
      })
      
      // Invalidate cache
      await CacheInvalidation.invalidateResources()
      
      Logger.logAdminAction('resource_deleted', 'admin', id)
      
      return { success: true, message: 'Resource deleted successfully' }
    } catch (error) {
      Logger.error('Failed to delete resource', { id }, error as Error)
      throw error
    }
  }
  
  static async incrementResourceDownloads(id: string) {
    try {
      const resource = await prisma.resource.update({
        where: { id },
        data: {
          downloads: {
            increment: 1,
          },
        },
      })
      
      return resource
    } catch (error) {
      Logger.error('Failed to increment resource downloads', { id }, error as Error)
      throw error
    }
  }
}

// API Routes
export async function GET(request: NextRequest) {
  try {
    requireAdmin(request)
    
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'blog'
    const action = searchParams.get('action') || 'list'
    
    switch (type) {
      case 'blog':
        if (action === 'list') {
          const page = parseInt(searchParams.get('page') || '1')
          const limit = parseInt(searchParams.get('limit') || '10')
          const published = searchParams.get('published')
          const featured = searchParams.get('featured')
          const authorId = searchParams.get('authorId')
          
          const result = await ContentManagementService.getBlogPosts({
            page,
            limit,
            published: published ? published === 'true' : undefined,
            featured: featured ? featured === 'true' : undefined,
            authorId: authorId || undefined,
          })
          
          return ApiErrorHandler.success(result, 'Blog posts retrieved successfully')
        }
        break
      
      case 'authors':
        const authors = await ContentManagementService.getAuthors()
        return ApiErrorHandler.success(authors, 'Authors retrieved successfully')
      
      case 'team':
        const teamMembers = await prisma.teamMember.findMany({
          orderBy: { order: 'asc' },
        })
        return ApiErrorHandler.success(teamMembers, 'Team members retrieved successfully')
      
      case 'programs':
        const programs = await prisma.program.findMany({
          orderBy: { createdAt: 'asc' },
        })
        return ApiErrorHandler.success(programs, 'Programs retrieved successfully')
      
      case 'resources':
        const resources = await prisma.resource.findMany({
          orderBy: { downloads: 'desc' },
        })
        return ApiErrorHandler.success(resources, 'Resources retrieved successfully')
      
      default:
        return ApiErrorHandler.badRequest('Invalid content type')
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
    const { type, action, ...data } = body
    
    switch (type) {
      case 'blog':
        if (action === 'create') {
          const blogPost = await ContentManagementService.createBlogPost(data)
          return ApiErrorHandler.created(blogPost, 'Blog post created successfully')
        }
        break
      
      case 'authors':
        if (action === 'create') {
          const author = await ContentManagementService.createAuthor(data)
          return ApiErrorHandler.created(author, 'Author created successfully')
        }
        break
      
      case 'team':
        if (action === 'create') {
          const teamMember = await ContentManagementService.createTeamMember(data)
          return ApiErrorHandler.created(teamMember, 'Team member created successfully')
        }
        break
      
      case 'programs':
        if (action === 'create') {
          const program = await ContentManagementService.createProgram(data)
          return ApiErrorHandler.created(program, 'Program created successfully')
        }
        break
      
      case 'resources':
        if (action === 'create') {
          const resource = await ContentManagementService.createResource(data)
          return ApiErrorHandler.created(resource, 'Resource created successfully')
        }
        break
      
      default:
        return ApiErrorHandler.badRequest('Invalid content type')
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

export async function PUT(request: NextRequest) {
  try {
    requireAdmin(request)
    
    const body = await request.json()
    const { type, id, ...data } = body
    
    if (!id) {
      return ApiErrorHandler.badRequest('ID is required')
    }
    
    switch (type) {
      case 'blog':
        const blogPost = await ContentManagementService.updateBlogPost(id, data)
        return ApiErrorHandler.success(blogPost, 'Blog post updated successfully')
      
      case 'authors':
        const author = await ContentManagementService.updateAuthor(id, data)
        return ApiErrorHandler.success(author, 'Author updated successfully')
      
      case 'team':
        const teamMember = await ContentManagementService.updateTeamMember(id, data)
        return ApiErrorHandler.success(teamMember, 'Team member updated successfully')
      
      case 'programs':
        const program = await ContentManagementService.updateProgram(id, data)
        return ApiErrorHandler.success(program, 'Program updated successfully')
      
      case 'resources':
        const resource = await ContentManagementService.updateResource(id, data)
        return ApiErrorHandler.success(resource, 'Resource updated successfully')
      
      default:
        return ApiErrorHandler.badRequest('Invalid content type')
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
    const type = searchParams.get('type')
    const id = searchParams.get('id')
    
    if (!type || !id) {
      return ApiErrorHandler.badRequest('Type and ID are required')
    }
    
    switch (type) {
      case 'blog':
        const blogResult = await ContentManagementService.deleteBlogPost(id)
        return ApiErrorHandler.success(blogResult, 'Blog post deleted successfully')
      
      case 'authors':
        const authorResult = await ContentManagementService.deleteAuthor(id)
        return ApiErrorHandler.success(authorResult, 'Author deleted successfully')
      
      case 'team':
        const teamResult = await ContentManagementService.deleteTeamMember(id)
        return ApiErrorHandler.success(teamResult, 'Team member deleted successfully')
      
      case 'programs':
        const programResult = await ContentManagementService.deleteProgram(id)
        return ApiErrorHandler.success(programResult, 'Program deleted successfully')
      
      case 'resources':
        const resourceResult = await ContentManagementService.deleteResource(id)
        return ApiErrorHandler.success(resourceResult, 'Resource deleted successfully')
      
      default:
        return ApiErrorHandler.badRequest('Invalid content type')
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
