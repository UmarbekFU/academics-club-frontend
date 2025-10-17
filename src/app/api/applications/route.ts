import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiErrorHandler } from '@/lib/error-handler'
import { rateLimit } from '@/lib/rate-limit'
import { applicationSchema, sanitizeString } from '@/lib/validation'
import { EmailService, checkEmailRateLimit } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = rateLimit(request, '/api/applications')
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many applications submitted. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      )
    }

    const body = await request.json()
    const validatedData = applicationSchema.parse(body)
    
    // Sanitize input data
    const sanitizedData = {
      ...validatedData,
      name: sanitizeString(validatedData.name),
      message: validatedData.message ? sanitizeString(validatedData.message) : undefined
    }
    
    const application = await prisma.application.create({
      data: sanitizedData
    })
    
    // Send confirmation email to applicant
    try {
      if (checkEmailRateLimit(sanitizedData.email)) {
        await EmailService.sendApplicationConfirmation({
          name: sanitizedData.name,
          email: sanitizedData.email,
          program: sanitizedData.program,
        });
      }
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the application if email fails
    }
    
    // Send notification to admin
    try {
      await EmailService.sendAdminNotification({
        name: sanitizedData.name,
        email: sanitizedData.email,
        program: sanitizedData.program,
        message: sanitizedData.message,
      });
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
      // Don't fail the application if email fails
    }
    
    return ApiErrorHandler.created(application, 'Application submitted successfully')
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}
