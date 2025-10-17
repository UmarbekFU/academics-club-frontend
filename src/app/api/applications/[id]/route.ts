import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { ApiErrorHandler } from '@/lib/error-handler'
import { validateCSRFToken, getCSRFTokenFromRequest, getSessionIdFromRequest } from '@/lib/csrf'
import { requireAdmin } from '@/lib/auth'

const updateApplicationSchema = z.object({
  status: z.enum(['pending', 'contacted', 'enrolled', 'rejected']).optional(),
  message: z.string().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const application = await prisma.application.findUnique({
      where: { id },
    })
    
    if (!application) {
      return ApiErrorHandler.notFound('Application not found')
    }
    
    return ApiErrorHandler.success(application, 'Application retrieved successfully')
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require admin role
    requireAdmin(request)
    
    // CSRF protection for admin operations
    const sessionId = getSessionIdFromRequest(request)
    const csrfToken = getCSRFTokenFromRequest(request)
    
    if (!csrfToken || !validateCSRFToken(sessionId, csrfToken)) {
      return ApiErrorHandler.forbidden('Invalid CSRF token')
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = updateApplicationSchema.parse(body)
    
    const application = await prisma.application.update({
      where: { id },
      data: validatedData,
    })
    
    return ApiErrorHandler.success(application, 'Application updated successfully')
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require admin role
    requireAdmin(request)
    
    // CSRF protection for admin operations
    const sessionId = getSessionIdFromRequest(request)
    const csrfToken = getCSRFTokenFromRequest(request)
    
    if (!csrfToken || !validateCSRFToken(sessionId, csrfToken)) {
      return ApiErrorHandler.forbidden('Invalid CSRF token')
    }

    const { id } = await params
    await prisma.application.delete({
      where: { id },
    })
    
    return ApiErrorHandler.success(null, 'Application deleted successfully')
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

