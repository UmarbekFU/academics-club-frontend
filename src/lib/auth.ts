import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET: string = process.env.JWT_SECRET || 'build-time-placeholder'

function getJWTSecret(): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required')
  }
  return process.env.JWT_SECRET
}

export interface JWTPayload {
  id: string
  username: string
  email: string
  role: string
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, getJWTSecret(), { 
    expiresIn: '24h',
    issuer: 'academics-club',
    audience: 'admin',
    algorithm: 'HS256'
  })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, getJWTSecret(), {
      issuer: 'academics-club',
      audience: 'admin',
      algorithms: ['HS256']
    }) as JWTPayload
  } catch {
    return null
  }
}

export function setAuthCookie(response: NextResponse, token: string): void {
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/'
  })
}

export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  })
}

export function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get('admin_token')?.value || null
}

export function createAuthResponse(data: unknown, token: string): NextResponse {
  const response = NextResponse.json({
    success: true,
    message: 'Login successful',
    data
  })
  
  setAuthCookie(response, token)
  return response
}

export function createLogoutResponse(): NextResponse {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  })
  
  clearAuthCookie(response)
  return response
}

export function getUserFromRequest(request: NextRequest): JWTPayload | null {
  const token = getTokenFromRequest(request)
  if (!token) return null
  
  return verifyToken(token)
}

export function requireAuth(request: NextRequest): JWTPayload {
  const user = getUserFromRequest(request)
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}

export function requireRole(request: NextRequest, allowedRoles: string[]): JWTPayload {
  const user = requireAuth(request)
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Insufficient permissions')
  }
  return user
}

export function requireAdmin(request: NextRequest): JWTPayload {
  return requireRole(request, ['admin'])
}
