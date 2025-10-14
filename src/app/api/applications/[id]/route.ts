import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateApplicationSchema = z.object({
  status: z.enum(['pending', 'contacted', 'enrolled', 'rejected']).optional(),
  message: z.string().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const application = await prisma.application.findUnique({
      where: { id: params.id },
    })
    
    if (!application) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: application,
    })
  } catch (error) {
    console.error('Get application error:', error)
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
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = updateApplicationSchema.parse(body)
    
    const application = await prisma.application.update({
      where: { id: params.id },
      data: validatedData,
    })
    
    return NextResponse.json({
      success: true,
      message: 'Application updated successfully',
      data: application,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    console.error('Update application error:', error)
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.application.delete({
      where: { id: params.id },
    })
    
    return NextResponse.json({
      success: true,
      message: 'Application deleted successfully',
    })
  } catch (error) {
    console.error('Delete application error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

