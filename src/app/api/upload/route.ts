import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { ApiErrorHandler } from '@/lib/error-handler'
import { requireAdmin } from '@/lib/auth'
import { z } from 'zod'

const uploadSchema = z.object({
  type: z.enum(['resource', 'team', 'blog']),
  description: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    requireAdmin(request)
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string
    const description = formData.get('description') as string
    
    // Validate input
    const validatedData = uploadSchema.parse({ type, description })
    
    if (!file) {
      return ApiErrorHandler.badRequest('No file provided')
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      return ApiErrorHandler.badRequest('Invalid file type. Allowed types: JPEG, PNG, WebP, PDF, DOC, DOCX')
    }
    
    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return ApiErrorHandler.badRequest('File too large. Maximum size is 10MB')
    }
    
    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop()
    const filename = `${timestamp}-${randomString}.${extension}`
    
    // Determine upload directory based on type
    const uploadDir = join(process.cwd(), 'public', 'uploads', validatedData.type)
    
    // Create directory if it doesn't exist
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }
    
    // Save file
    const filePath = join(uploadDir, filename)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    await writeFile(filePath, buffer)
    
    // Return file information
    const fileInfo = {
      filename,
      originalName: file.name,
      size: file.size,
      type: file.type,
      url: `/uploads/${validatedData.type}/${filename}`,
      uploadedAt: new Date().toISOString(),
    }
    
    return ApiErrorHandler.created(fileInfo, 'File uploaded successfully')
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

// Get uploaded files
export async function GET(request: NextRequest) {
  try {
    requireAdmin(request)
    
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    
    if (!type || !['resource', 'team', 'blog'].includes(type)) {
      return ApiErrorHandler.badRequest('Invalid type parameter')
    }
    
    // In a real implementation, you would read the directory and return file list
    // For now, return a placeholder response
    const files = [] // This would be populated by reading the upload directory
    
    return ApiErrorHandler.success(files, 'Files retrieved successfully')
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
