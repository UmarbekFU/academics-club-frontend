import { NextRequest } from 'next/server'
import crypto from 'crypto'

// CSRF token storage with Redis support
let csrfTokens: Map<string, { token: string; expires: number }>

// Initialize storage based on environment
if (process.env.REDIS_URL) {
  // Redis implementation would go here
  // For now, fallback to in-memory with better cleanup
  csrfTokens = new Map<string, { token: string; expires: number }>()
} else {
  csrfTokens = new Map<string, { token: string; expires: number }>()
}

const CSRF_TOKEN_LENGTH = 32
const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000 // 1 hour

export function generateCSRFToken(sessionId: string): string {
  const token = crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex')
  const expires = Date.now() + CSRF_TOKEN_EXPIRY
  
  csrfTokens.set(sessionId, { token, expires })
  
  // Cleanup expired tokens
  cleanupExpiredTokens()
  
  return token
}

export function validateCSRFToken(sessionId: string, token: string): boolean {
  const stored = csrfTokens.get(sessionId)
  
  if (!stored) {
    return false
  }
  
  if (Date.now() > stored.expires) {
    csrfTokens.delete(sessionId)
    return false
  }
  
  return stored.token === token
}

export function getCSRFTokenFromRequest(request: NextRequest): string | null {
  // Check header first (preferred for AJAX requests)
  const headerToken = request.headers.get('x-csrf-token')
  if (headerToken) {
    return headerToken
  }
  
  // Check form data for traditional form submissions
  const contentType = request.headers.get('content-type')
  if (contentType?.includes('application/x-www-form-urlencoded')) {
    // For form data, we'd need to parse the body
    // This is a simplified version - in practice, you'd parse the form data
    return null
  }
  
  return null
}

export function getSessionIdFromRequest(request: NextRequest): string {
  // Use IP + User-Agent as session identifier
  // In production, use proper session management
  const ip = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  return crypto.createHash('sha256').update(`${ip}-${userAgent}`).digest('hex')
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

function cleanupExpiredTokens(): void {
  const now = Date.now()
  for (const [sessionId, data] of csrfTokens.entries()) {
    if (now > data.expires) {
      csrfTokens.delete(sessionId)
    }
  }
}

// Cleanup expired tokens every 5 minutes
setInterval(cleanupExpiredTokens, 5 * 60 * 1000)

// Graceful shutdown cleanup
process.on('beforeExit', () => {
  csrfTokens.clear()
})

// Export additional utilities
export function revokeCSRFToken(sessionId: string): void {
  csrfTokens.delete(sessionId)
}

export function getCSRFTokenCount(): number {
  cleanupExpiredTokens()
  return csrfTokens.size
}

export function isCSRFTokenValid(sessionId: string, token: string): boolean {
  return validateCSRFToken(sessionId, token)
}
