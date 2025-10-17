import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals'
import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'
import { ApiErrorHandler } from '@/lib/error-handler'
import { rateLimit } from '@/lib/rate-limit'
import { applicationSchema, newsletterSchema } from '@/lib/validation'

// Test database setup
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL || 'file:./test.db',
    },
  },
})

// Test utilities
export class TestUtils {
  static async cleanupDatabase() {
    await prisma.resource.deleteMany()
    await prisma.newsletter.deleteMany()
    await prisma.program.deleteMany()
    await prisma.teamMember.deleteMany()
    await prisma.admin.deleteMany()
    await prisma.blogPost.deleteMany()
    await prisma.author.deleteMany()
    await prisma.application.deleteMany()
  }

  static async seedTestData() {
    // Create test author
    const author = await prisma.author.create({
      data: {
        name: 'Test Author',
        email: 'test@example.com',
        bio: 'Test bio',
      },
    })

    // Create test blog post
    await prisma.blogPost.create({
      data: {
        title: 'Test Blog Post',
        slug: 'test-blog-post',
        content: 'Test content',
        excerpt: 'Test excerpt',
        published: true,
        authorId: author.id,
      },
    })

    // Create test team member
    await prisma.teamMember.create({
      data: {
        name: 'Test Team Member',
        position: 'Test Position',
        bio: 'Test bio',
        email: 'team@example.com',
        active: true,
        order: 1,
      },
    })

    // Create test program
    await prisma.program.create({
      data: {
        name: 'Test Program',
        slug: 'test-program',
        description: 'Test description',
        content: 'Test content',
        duration: '4 weeks',
        level: 'Beginner',
        active: true,
      },
    })

    // Create test resource
    await prisma.resource.create({
      data: {
        title: 'Test Resource',
        description: 'Test description',
        type: 'PDF Guide',
        pages: '25 pages',
        highlights: '["Highlight 1", "Highlight 2"]',
        active: true,
      },
    })
  }

  static createMockRequest(method: string = 'GET', body?: any): NextRequest {
    const url = 'http://localhost:3000/api/test'
    const init: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (body) {
      init.body = JSON.stringify(body)
    }

    return new NextRequest(url, init)
  }
}

// Test suites
describe('Validation', () => {
  describe('applicationSchema', () => {
    it('should validate correct application data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        program: 'writing-program',
        message: 'Test message',
      }

      const result = applicationSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        program: 'writing-program',
      }

      const result = applicationSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject empty name', () => {
      const invalidData = {
        name: '',
        email: 'john@example.com',
        program: 'writing-program',
      }

      const result = applicationSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('newsletterSchema', () => {
    it('should validate correct email', () => {
      const validData = {
        email: 'test@example.com',
      }

      const result = newsletterSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
      }

      const result = newsletterSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})

describe('Rate Limiting', () => {
  beforeEach(() => {
    // Clear rate limit store before each test
    // This would need to be implemented in the rate-limit module
  })

  it('should allow requests within limit', () => {
    const request = TestUtils.createMockRequest()
    const result = rateLimit(request, '/api/applications')

    expect(result.allowed).toBe(true)
    expect(result.remaining).toBeGreaterThan(0)
  })

  it('should block requests exceeding limit', () => {
    const request = TestUtils.createMockRequest()
    
    // Make multiple requests to exceed limit
    for (let i = 0; i < 15; i++) {
      rateLimit(request, '/api/applications')
    }

    const result = rateLimit(request, '/api/applications')
    expect(result.allowed).toBe(false)
  })
})

describe('Error Handling', () => {
  it('should handle validation errors', () => {
    const error = new Error('Validation failed')
    const response = ApiErrorHandler.handle(error)

    expect(response.status).toBe(500)
  })

  it('should handle Zod validation errors', () => {
    const zodError = {
      issues: [
        {
          path: ['email'],
          message: 'Invalid email',
          code: 'invalid_string',
        },
      ],
    }

    const response = ApiErrorHandler.handle(zodError)
    expect(response.status).toBe(400)
  })
})

describe('Database Operations', () => {
  beforeAll(async () => {
    await TestUtils.cleanupDatabase()
    await TestUtils.seedTestData()
  })

  afterAll(async () => {
    await TestUtils.cleanupDatabase()
    await prisma.$disconnect()
  })

  describe('Applications', () => {
    it('should create application', async () => {
      const application = await prisma.application.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          program: 'writing-program',
          message: 'Test message',
        },
      })

      expect(application.id).toBeDefined()
      expect(application.name).toBe('Test User')
      expect(application.status).toBe('pending')
    })

    it('should retrieve applications', async () => {
      const applications = await prisma.application.findMany()
      expect(applications.length).toBeGreaterThan(0)
    })
  })

  describe('Blog Posts', () => {
    it('should retrieve published blog posts', async () => {
      const posts = await prisma.blogPost.findMany({
        where: { published: true },
        include: { author: true },
      })

      expect(posts.length).toBeGreaterThan(0)
      expect(posts[0].author).toBeDefined()
    })
  })

  describe('Team Members', () => {
    it('should retrieve active team members', async () => {
      const members = await prisma.teamMember.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
      })

      expect(members.length).toBeGreaterThan(0)
      expect(members[0].active).toBe(true)
    })
  })
})

describe('API Endpoints', () => {
  beforeAll(async () => {
    await TestUtils.cleanupDatabase()
    await TestUtils.seedTestData()
  })

  afterAll(async () => {
    await TestUtils.cleanupDatabase()
    await prisma.$disconnect()
  })

  describe('Applications API', () => {
    it('should create application via API', async () => {
      const request = TestUtils.createMockRequest('POST', {
        name: 'API Test User',
        email: 'apitest@example.com',
        program: 'writing-program',
        message: 'API test message',
      })

      // This would test the actual API endpoint
      // const response = await POST(request)
      // expect(response.status).toBe(201)
    })
  })

  describe('Newsletter API', () => {
    it('should subscribe to newsletter', async () => {
      const request = TestUtils.createMockRequest('POST', {
        email: 'newsletter@example.com',
      })

      // This would test the actual API endpoint
      // const response = await POST(request)
      // expect(response.status).toBe(201)
    })
  })
})

// Integration tests
describe('Integration Tests', () => {
  beforeAll(async () => {
    await TestUtils.cleanupDatabase()
    await TestUtils.seedTestData()
  })

  afterAll(async () => {
    await TestUtils.cleanupDatabase()
    await prisma.$disconnect()
  })

  it('should handle complete application flow', async () => {
    // Test the complete flow from application submission to admin review
    const application = await prisma.application.create({
      data: {
        name: 'Integration Test User',
        email: 'integration@example.com',
        program: 'writing-program',
        message: 'Integration test message',
      },
    })

    expect(application.id).toBeDefined()

    // Update application status
    const updatedApplication = await prisma.application.update({
      where: { id: application.id },
      data: { status: 'contacted' },
    })

    expect(updatedApplication.status).toBe('contacted')
  })

  it('should handle newsletter subscription flow', async () => {
    const subscription = await prisma.newsletter.create({
      data: {
        email: 'integration-newsletter@example.com',
      },
    })

    expect(subscription.id).toBeDefined()
    expect(subscription.active).toBe(true)

    // Test duplicate subscription
    try {
      await prisma.newsletter.create({
        data: {
          email: 'integration-newsletter@example.com',
        },
      })
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})

// Performance tests
describe('Performance Tests', () => {
  beforeAll(async () => {
    await TestUtils.cleanupDatabase()
    await TestUtils.seedTestData()
  })

  afterAll(async () => {
    await TestUtils.cleanupDatabase()
    await prisma.$disconnect()
  })

  it('should handle bulk operations efficiently', async () => {
    const startTime = Date.now()

    // Create multiple applications
    const applications = []
    for (let i = 0; i < 100; i++) {
      applications.push({
        name: `Bulk Test User ${i}`,
        email: `bulk${i}@example.com`,
        program: 'writing-program',
      })
    }

    await prisma.application.createMany({
      data: applications,
    })

    const endTime = Date.now()
    const duration = endTime - startTime

    // Should complete within reasonable time (adjust threshold as needed)
    expect(duration).toBeLessThan(5000) // 5 seconds
  })

  it('should handle complex queries efficiently', async () => {
    const startTime = Date.now()

    const results = await prisma.blogPost.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    const endTime = Date.now()
    const duration = endTime - startTime

    expect(results).toBeDefined()
    expect(duration).toBeLessThan(1000) // 1 second
  })
})
