import { NextRequest, NextResponse } from 'next/server'

// Cache configuration
interface CacheConfig {
  ttl: number // Time to live in seconds
  maxSize: number // Maximum number of items
  enableMemoryCache: boolean
  enableRedisCache: boolean
  enableBrowserCache: boolean
}

// Cache entry
interface CacheEntry<T = any> {
  key: string
  value: T
  expiresAt: number
  createdAt: number
  hits: number
}

// Default cache configuration
const defaultConfig: CacheConfig = {
  ttl: 300, // 5 minutes
  maxSize: 1000,
  enableMemoryCache: true,
  enableRedisCache: !!process.env.REDIS_URL,
  enableBrowserCache: true,
}

// In-memory cache store
class MemoryCache {
  private cache = new Map<string, CacheEntry>()
  private config: CacheConfig
  
  constructor(config: CacheConfig) {
    this.config = config
  }
  
  set<T>(key: string, value: T, ttl?: number): void {
    const expiresAt = Date.now() + (ttl || this.config.ttl) * 1000
    
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.config.maxSize) {
      const oldestKey = this.cache.keys().next().value
      if (oldestKey) {
        this.cache.delete(oldestKey)
      }
    }
    
    this.cache.set(key, {
      key,
      value,
      expiresAt,
      createdAt: Date.now(),
      hits: 0,
    })
  }
  
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    
    if (!entry) {
      return null
    }
    
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return null
    }
    
    entry.hits++
    return entry.value
  }
  
  delete(key: string): boolean {
    return this.cache.delete(key)
  }
  
  clear(): void {
    this.cache.clear()
  }
  
  size(): number {
    return this.cache.size
  }
  
  getStats(): { size: number; hitRate: number } {
    const entries = Array.from(this.cache.values())
    const totalHits = entries.reduce((sum, entry) => sum + entry.hits, 0)
    const totalRequests = entries.length + totalHits
    
    return {
      size: this.cache.size,
      hitRate: totalRequests > 0 ? totalHits / totalRequests : 0,
    }
  }
}

// Redis cache implementation (placeholder)
class RedisCache {
  private config: CacheConfig
  
  constructor(config: CacheConfig) {
    this.config = config
  }
  
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    // In a real implementation, you would use a Redis client
    // For now, this is a placeholder
    console.log(`Redis set: ${key} (TTL: ${ttl || this.config.ttl}s)`)
  }
  
  async get<T>(key: string): Promise<T | null> {
    // In a real implementation, you would use a Redis client
    console.log(`Redis get: ${key}`)
    return null
  }
  
  async delete(key: string): Promise<boolean> {
    // In a real implementation, you would use a Redis client
    console.log(`Redis delete: ${key}`)
    return true
  }
  
  async clear(): Promise<void> {
    // In a real implementation, you would use a Redis client
    console.log('Redis clear')
  }
}

// Main cache service
export class CacheService {
  private static config = defaultConfig
  private static memoryCache = new MemoryCache(defaultConfig)
  private static redisCache = new RedisCache(defaultConfig)
  
  static configure(config: Partial<CacheConfig>): void {
    this.config = { ...this.config, ...config }
    this.memoryCache = new MemoryCache(this.config)
    this.redisCache = new RedisCache(this.config)
  }
  
  static async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const promises: Promise<void>[] = []
    
    if (this.config.enableMemoryCache) {
      this.memoryCache.set(key, value, ttl)
    }
    
    if (this.config.enableRedisCache) {
      promises.push(this.redisCache.set(key, value, ttl))
    }
    
    await Promise.all(promises)
  }
  
  static async get<T>(key: string): Promise<T | null> {
    // Try memory cache first
    if (this.config.enableMemoryCache) {
      const memoryValue = this.memoryCache.get<T>(key)
      if (memoryValue !== null) {
        return memoryValue
      }
    }
    
    // Try Redis cache
    if (this.config.enableRedisCache) {
      const redisValue = await this.redisCache.get<T>(key)
      if (redisValue !== null) {
        // Store in memory cache for faster access
        if (this.config.enableMemoryCache) {
          this.memoryCache.set(key, redisValue)
        }
        return redisValue
      }
    }
    
    return null
  }
  
  static async delete(key: string): Promise<boolean> {
    const promises: Promise<boolean>[] = []
    
    if (this.config.enableMemoryCache) {
      this.memoryCache.delete(key)
    }
    
    if (this.config.enableRedisCache) {
      promises.push(this.redisCache.delete(key))
    }
    
    const results = await Promise.all(promises)
    return results.some(result => result)
  }
  
  static async clear(): Promise<void> {
    const promises: Promise<void>[] = []
    
    if (this.config.enableMemoryCache) {
      this.memoryCache.clear()
    }
    
    if (this.config.enableRedisCache) {
      promises.push(this.redisCache.clear())
    }
    
    await Promise.all(promises)
  }
  
  static getStats(): { memory: any; redis: any } {
    return {
      memory: this.memoryCache.getStats(),
      redis: { enabled: this.config.enableRedisCache },
    }
  }
}

// Cache key generators
export class CacheKeys {
  static blogPost(slug: string): string {
    return `blog:post:${slug}`
  }
  
  static blogPosts(page: number, limit: number): string {
    return `blog:posts:${page}:${limit}`
  }
  
  static featuredBlogPosts(): string {
    return 'blog:posts:featured'
  }
  
  static teamMembers(): string {
    return 'team:members'
  }
  
  static programs(): string {
    return 'programs:all'
  }
  
  static resources(): string {
    return 'resources:all'
  }
  
  static applicationStats(): string {
    return 'stats:applications'
  }
  
  static newsletterStats(): string {
    return 'stats:newsletter'
  }
  
  static search(query: string, type: string): string {
    return `search:${type}:${Buffer.from(query).toString('base64')}`
  }
}

// Cache middleware for API routes
export function withCache<T extends any[]>(
  keyGenerator: (...args: T) => string,
  ttl?: number
) {
  return function(
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value
    
    descriptor.value = async function(...args: T) {
      const cacheKey = keyGenerator(...args)
      
      // Try to get from cache
      const cached = await CacheService.get(cacheKey)
      if (cached !== null) {
        return cached
      }
      
      // Execute the original method
      const result = await method.apply(this, args)
      
      // Store in cache
      await CacheService.set(cacheKey, result, ttl)
      
      return result
    }
    
    return descriptor
  }
}

// Cache invalidation helpers
export class CacheInvalidation {
  static async invalidateBlogPost(slug: string): Promise<void> {
    await Promise.all([
      CacheService.delete(CacheKeys.blogPost(slug)),
      CacheService.delete(CacheKeys.featuredBlogPosts()),
      // Invalidate all blog post lists
      CacheService.delete('blog:posts:*'),
    ])
  }
  
  static async invalidateTeamMembers(): Promise<void> {
    await CacheService.delete(CacheKeys.teamMembers())
  }
  
  static async invalidatePrograms(): Promise<void> {
    await CacheService.delete(CacheKeys.programs())
  }
  
  static async invalidateResources(): Promise<void> {
    await CacheService.delete(CacheKeys.resources())
  }
  
  static async invalidateStats(): Promise<void> {
    await Promise.all([
      CacheService.delete(CacheKeys.applicationStats()),
      CacheService.delete(CacheKeys.newsletterStats()),
    ])
  }
  
  static async invalidateSearch(query: string, type: string): Promise<void> {
    await CacheService.delete(CacheKeys.search(query, type))
  }
}

// Browser cache headers
export function getCacheHeaders(ttl: number = 300): Record<string, string> {
  return {
    'Cache-Control': `public, max-age=${ttl}, stale-while-revalidate=${ttl * 2}`,
    'Expires': new Date(Date.now() + ttl * 1000).toUTCString(),
  }
}

// ETag generation
export function generateETag(content: string): string {
  const crypto = require('crypto')
  return `"${crypto.createHash('md5').update(content).digest('hex')}"`
}

// Conditional request handling
export function handleConditionalRequest(
  request: NextRequest,
  etag: string,
  lastModified: Date
): { shouldReturn304: boolean; response?: NextResponse } {
  const ifNoneMatch = request.headers.get('if-none-match')
  const ifModifiedSince = request.headers.get('if-modified-since')
  
  // Check ETag
  if (ifNoneMatch && ifNoneMatch === etag) {
    return { shouldReturn304: true }
  }
  
  // Check Last-Modified
  if (ifModifiedSince) {
    const ifModifiedSinceDate = new Date(ifModifiedSince)
    if (lastModified <= ifModifiedSinceDate) {
      return { shouldReturn304: true }
    }
  }
  
  return { shouldReturn304: false }
}

// Cache API route
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || 'stats'
    
    switch (action) {
      case 'stats':
        const stats = CacheService.getStats()
        return NextResponse.json(stats)
      
      case 'clear':
        await CacheService.clear()
        return NextResponse.json({ message: 'Cache cleared successfully' })
      
      case 'invalidate':
        const key = searchParams.get('key')
        if (!key) {
          return NextResponse.json(
            { error: 'Key parameter is required' },
            { status: 400 }
          )
        }
        
        await CacheService.delete(key)
        return NextResponse.json({ message: `Cache key ${key} invalidated` })
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Cache operation failed' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, key, value, ttl } = body
    
    switch (action) {
      case 'set':
        if (!key || value === undefined) {
          return NextResponse.json(
            { error: 'Key and value are required' },
            { status: 400 }
          )
        }
        
        await CacheService.set(key, value, ttl)
        return NextResponse.json({ message: 'Value cached successfully' })
      
      case 'get':
        if (!key) {
          return NextResponse.json(
            { error: 'Key is required' },
            { status: 400 }
          )
        }
        
        const cachedValue = await CacheService.get(key)
        return NextResponse.json({ value: cachedValue })
      
      case 'delete':
        if (!key) {
          return NextResponse.json(
            { error: 'Key is required' },
            { status: 400 }
          )
        }
        
        await CacheService.delete(key)
        return NextResponse.json({ message: 'Key deleted successfully' })
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Cache operation failed' },
      { status: 500 }
    )
  }
}
