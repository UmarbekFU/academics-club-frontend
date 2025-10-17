import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export interface ApiErrorResponse {
  success: false
  message: string
  errors?: unknown[]
  code?: string
  timestamp?: string
}

export interface ApiSuccessResponse<T = unknown> {
  success: true
  message: string
  data?: T
  timestamp?: string
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse

export class ApiErrorHandler {
  static handle(error: unknown): NextResponse<ApiErrorResponse> {
    console.error('API Error:', error)

    // Zod validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
            code: issue.code
          })),
          code: 'VALIDATION_ERROR',
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      )
    }

    // Custom API errors
    if (error instanceof Error && 'status' in error) {
      const apiError = error as Error & { status: number; code?: string }
      return NextResponse.json(
        {
          success: false,
          message: apiError.message,
          code: apiError.code || 'API_ERROR',
          timestamp: new Date().toISOString()
        },
        { status: apiError.status }
      )
    }

    // Database errors
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resource already exists',
          code: 'DUPLICATE_RESOURCE',
          timestamp: new Date().toISOString()
        },
        { status: 409 }
      )
    }

    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resource not found',
          code: 'NOT_FOUND',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      )
    }

    // Generic errors
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }

  static success<T>(data: T, message: string = 'Success'): NextResponse<ApiSuccessResponse<T>> {
    return NextResponse.json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    })
  }

  static created<T>(data: T, message: string = 'Created successfully'): NextResponse<ApiSuccessResponse<T>> {
    return NextResponse.json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    }, { status: 201 })
  }

  static notFound(message: string = 'Resource not found'): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
      {
        success: false,
        message,
        code: 'NOT_FOUND',
        timestamp: new Date().toISOString()
      },
      { status: 404 }
    )
  }

  static unauthorized(message: string = 'Authentication required'): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
      {
        success: false,
        message,
        code: 'UNAUTHORIZED',
        timestamp: new Date().toISOString()
      },
      { status: 401 }
    )
  }

  static forbidden(message: string = 'Access denied'): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
      {
        success: false,
        message,
        code: 'FORBIDDEN',
        timestamp: new Date().toISOString()
      },
      { status: 403 }
    )
  }

  static badRequest(message: string = 'Bad request', errors?: unknown[]): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
      {
        success: false,
        message,
        errors,
        code: 'BAD_REQUEST',
        timestamp: new Date().toISOString()
      },
      { status: 400 }
    )
  }

  static tooManyRequests(message: string = 'Too many requests'): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
      {
        success: false,
        message,
        code: 'TOO_MANY_REQUESTS',
        timestamp: new Date().toISOString()
      },
      { status: 429 }
    )
  }
}

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
