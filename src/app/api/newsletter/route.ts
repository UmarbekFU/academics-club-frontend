import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiErrorHandler } from '@/lib/error-handler'
import { rateLimit } from '@/lib/rate-limit'
import { newsletterSchema } from '@/lib/validation'
import { EmailService, checkEmailRateLimit } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = rateLimit(request, '/api/newsletter')
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many newsletter signups. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      )
    }

    const body = await request.json()
    const { email } = newsletterSchema.parse(body)
    
    // Check if email already exists
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email }
    })
    
    if (existingSubscription) {
      return ApiErrorHandler.badRequest('Email already subscribed to newsletter')
    }
    
    const subscription = await prisma.newsletter.create({
      data: { email }
    })
    
    // Send welcome email
    try {
      if (checkEmailRateLimit(email)) {
        await EmailService.sendNewsletterWelcome(email);
      }
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the subscription if email fails
    }
    
    return ApiErrorHandler.created(subscription, 'Successfully subscribed to newsletter')
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return ApiErrorHandler.badRequest('Email parameter is required');
    }

    // Check if email exists
    const subscriber = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return ApiErrorHandler.notFound('Email not found in newsletter subscriptions');
    }

    // Deactivate subscription instead of deleting
    await prisma.newsletter.update({
      where: { email },
      data: { active: false },
    });

    return ApiErrorHandler.success({}, 'Successfully unsubscribed from newsletter');
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
}
