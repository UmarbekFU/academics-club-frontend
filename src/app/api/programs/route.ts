import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiErrorHandler } from '@/lib/error-handler'

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      where: { active: true },
      orderBy: { createdAt: 'asc' }
    })
    
    return ApiErrorHandler.success(programs, 'Programs retrieved successfully')
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}
