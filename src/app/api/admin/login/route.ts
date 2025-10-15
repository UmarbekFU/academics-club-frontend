import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = loginSchema.parse(body)
    
    // Find admin by username or email
    const admin = await prisma.admin.findFirst({
      where: {
        OR: [
          { username },
          { email: username },
        ],
      },
    })
    
    if (!admin) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid credentials' 
        },
        { status: 401 }
      )
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid credentials' 
        },
        { status: 401 }
      )
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin.id, 
        username: admin.username, 
        email: admin.email,
        role: admin.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )
    
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.issues 
        },
        { status: 400 }
      )
    }
    
    console.error('Admin login error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

