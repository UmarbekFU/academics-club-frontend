import { NextResponse } from 'next/server'
import { createLogoutResponse } from '@/lib/auth'
import { ApiErrorHandler } from '@/lib/error-handler'

export async function POST() {
  try {
    return createLogoutResponse()
  } catch (error) {
    return ApiErrorHandler.handle(error)
  }
}
