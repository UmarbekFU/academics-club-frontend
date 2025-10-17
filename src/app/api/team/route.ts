import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiErrorHandler } from '@/lib/error-handler'

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    })
    
    return ApiErrorHandler.success(teamMembers, 'Team members retrieved successfully')
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}
