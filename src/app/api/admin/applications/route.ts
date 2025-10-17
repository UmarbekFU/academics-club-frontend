import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiErrorHandler } from '@/lib/error-handler'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Require admin role
    requireAdmin(request)
    
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    return ApiErrorHandler.success(applications, 'Applications retrieved successfully')
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
