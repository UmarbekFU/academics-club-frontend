import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock environment variables
process.env.NODE_ENV = 'test'
process.env.DATABASE_URL = 'file:./test.db'
process.env.NEXTAUTH_SECRET = 'test-secret'
process.env.NEXTAUTH_URL = 'http://localhost:3000'

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    application: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    blogPost: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    author: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    admin: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    teamMember: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    program: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    newsletter: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    resource: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    $disconnect: jest.fn(),
  },
}))

// Mock email service
jest.mock('@/lib/email', () => ({
  EmailService: {
    sendApplicationConfirmation: jest.fn(),
    sendNewsletterWelcome: jest.fn(),
    sendAdminNotification: jest.fn(),
    testConnection: jest.fn(),
  },
  checkEmailRateLimit: jest.fn(() => true),
}))

// Mock rate limiting
jest.mock('@/lib/rate-limit', () => ({
  rateLimit: jest.fn(() => ({
    allowed: true,
    remaining: 10,
    resetTime: Date.now() + 60000,
  })),
}))

// Mock CSRF
jest.mock('@/lib/csrf', () => ({
  generateCSRFToken: jest.fn(() => 'test-csrf-token'),
  validateCSRFToken: jest.fn(() => true),
  getCSRFTokenFromRequest: jest.fn(() => 'test-csrf-token'),
}))

// Mock auth
jest.mock('@/lib/auth', () => ({
  generateToken: jest.fn(() => 'test-jwt-token'),
  verifyToken: jest.fn(() => ({ id: 'test-admin-id', username: 'test-admin' })),
  createAuthResponse: jest.fn(() => ({
    success: true,
    data: { token: 'test-jwt-token' },
  })),
  requireAdmin: jest.fn(),
}))

// Global test utilities
global.fetch = jest.fn()

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks()
})

// Setup and teardown
beforeAll(() => {
  // Setup test environment
})

afterAll(() => {
  // Cleanup test environment
})
