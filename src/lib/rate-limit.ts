import { NextRequest } from 'next/server'

// Rate limiting store with Redis support
let rateLimitStore: Map<string, { count: number; resetTime: number }>

// Initialize storage based on environment
if (process.env.REDIS_URL) {
  // Redis implementation would go here
  // For now, fallback to in-memory with better cleanup
  rateLimitStore = new Map<string, { count: number; resetTime: number }>()
} else {
  rateLimitStore = new Map<string, { count: number; resetTime: number }>()
}

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  '/api/admin/login': { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 attempts per 15 minutes
  '/api/applications': { maxRequests: 10, windowMs: 60 * 1000 }, // 10 submissions per minute
  '/api/newsletter': { maxRequests: 3, windowMs: 60 * 1000 }, // 3 newsletter signups per minute
  '/api/blog': { maxRequests: 30, windowMs: 60 * 1000 }, // 30 requests per minute
  '/api/team': { maxRequests: 20, windowMs: 60 * 1000 }, // 20 requests per minute
  '/api/programs': { maxRequests: 20, windowMs: 60 * 1000 }, // 20 requests per minute
}

export function rateLimit(request: NextRequest, endpoint: string): { allowed: boolean; remaining: number; resetTime: number } {
  const config = RATE_LIMITS[endpoint]
  if (!config) {
    return { allowed: true, remaining: Infinity, resetTime: 0 }
  }

  const ip = getClientIP(request)
  const now = Date.now()
  const key = `${ip}:${endpoint}`
  
  const current = rateLimitStore.get(key)
  
  if (!current || now > current.resetTime) {
    // Reset or initialize
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs
    })
    return { allowed: true, remaining: config.maxRequests - 1, resetTime: now + config.windowMs }
  }
  
  if (current.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetTime: current.resetTime }
  }
  
  // Increment count
  current.count++
  rateLimitStore.set(key, current)
  
  return { 
    allowed: true, 
    remaining: config.maxRequests - current.count, 
    resetTime: current.resetTime 
  }
}

function getClientIP(request: NextRequest): string {
  // Check for forwarded IP first (from proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  // Check for real IP header
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  
  // Fallback
  return 'unknown'
}

// Cleanup expired entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 60 * 1000) // Cleanup every minute
