import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { generateToken, createAuthResponse } from '@/lib/auth'
import { ApiErrorHandler } from '@/lib/error-handler'
import { rateLimit } from '@/lib/rate-limit'
import { loginSchema, sanitizeString } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = rateLimit(request, '/api/admin/login')
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many login attempts. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      )
    }

    const body = await request.json()
    const { username, password } = loginSchema.parse(body)
    
    // Sanitize username
    const sanitizedUsername = sanitizeString(username)
    
    // Find admin by username or email
    const admin = await prisma.admin.findFirst({
      where: {
        OR: [
          { username: sanitizedUsername },
          { email: sanitizedUsername },
        ],
      },
    })
    
    if (!admin) {
      return ApiErrorHandler.unauthorized('Invalid credentials')
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password)
    
    if (!isValidPassword) {
      return ApiErrorHandler.unauthorized('Invalid credentials')
    }
    
    // Generate JWT token
    const token = generateToken({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role
    })
    
    const responseData = {
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    }
    
    return createAuthResponse(responseData, token)
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}