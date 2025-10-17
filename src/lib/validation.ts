import { z } from 'zod'

// Enhanced validation schemas with comprehensive rules

export const applicationSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z.string()
    .email('Valid email is required')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase(),
  phone: z.string()
    .refine((val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val), 'Invalid phone number format')
    .optional(),
  program: z.enum(['writing-program', 'essays-program', 'both', 'consultation'], {
    message: 'Please select a valid program'
  }),
  message: z.string()
    .max(1000, 'Message must be less than 1000 characters')
    .refine((val) => !val || val.trim().length > 0, 'Message cannot be empty or only whitespace')
    .optional()
})

export const newsletterSchema = z.object({
  email: z.string()
    .email('Valid email is required')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .refine((email) => {
      // Additional email validation
      const domain = email.split('@')[1]
      const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com']
      return validDomains.includes(domain) || domain.includes('.')
    }, 'Please enter a valid email address')
})

export const blogPostSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .refine((val) => val.trim().length > 0, 'Title cannot be empty or only whitespace'),
  slug: z.string()
    .min(1, 'Slug is required')
    .max(200, 'Slug must be less than 200 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  content: z.string()
    .min(1, 'Content is required')
    .max(50000, 'Content must be less than 50,000 characters')
    .refine((val) => val.trim().length > 0, 'Content cannot be empty or only whitespace'),
  excerpt: z.string()
    .max(500, 'Excerpt must be less than 500 characters')
    .optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  tags: z.string()
    .max(200, 'Tags must be less than 200 characters')
    .refine((val) => !val || val.split(',').every(tag => tag.trim().length > 0), 'All tags must be non-empty')
    .optional(),
  authorId: z.string()
    .min(1, 'Author ID is required')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid author ID format')
})

export const updateBlogPostSchema = z.object({
  title: z.string()
    .min(1)
    .max(200)
    .refine((val) => val.trim().length > 0)
    .optional(),
  slug: z.string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  content: z.string()
    .min(1)
    .max(50000)
    .refine((val) => val.trim().length > 0)
    .optional(),
  excerpt: z.string()
    .max(500)
    .optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  tags: z.string()
    .max(200)
    .refine((val) => !val || val.split(',').every(tag => tag.trim().length > 0))
    .optional(),
  authorId: z.string()
    .min(1)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional()
})

export const loginSchema = z.object({
  username: z.string()
    .min(1, 'Username is required')
    .max(100, 'Username must be less than 100 characters')
    .refine((val) => val.trim().length > 0, 'Username cannot be empty or only whitespace'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character')
})

export const updateApplicationSchema = z.object({
  status: z.enum(['pending', 'contacted', 'enrolled', 'rejected'], {
    message: 'Invalid status value'
  }).optional(),
  message: z.string()
    .max(1000, 'Message must be less than 1000 characters')
    .refine((val) => !val || val.trim().length > 0, 'Message cannot be empty or only whitespace')
    .optional()
})

// Sanitization functions
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '')
}

export function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes to prevent injection
}

// Validation helpers
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 255
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone)
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
