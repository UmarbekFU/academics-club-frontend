import { NextRequest } from 'next/server'

// Log levels
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

// Log entry interface
export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, unknown>
  requestId?: string
  userId?: string
  ip?: string
  userAgent?: string
  duration?: number
  error?: {
    name: string
    message: string
    stack?: string
  }
}

// Logger configuration
interface LoggerConfig {
  level: LogLevel
  enableConsole: boolean
  enableFile: boolean
  enableRemote: boolean
  remoteEndpoint?: string
  maxFileSize: number
  maxFiles: number
}

// Default configuration
const defaultConfig: LoggerConfig = {
  level: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
  enableConsole: true,
  enableFile: process.env.NODE_ENV === 'production',
  enableRemote: process.env.NODE_ENV === 'production' && !!process.env.LOG_ENDPOINT,
  remoteEndpoint: process.env.LOG_ENDPOINT,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
}

// Request context extraction
export function extractRequestContext(request: NextRequest): Partial<LogEntry> {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown'
  
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  return {
    ip,
    userAgent,
    requestId: request.headers.get('x-request-id') || 
               `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private static timers = new Map<string, number>()
  
  static startTimer(key: string): void {
    this.timers.set(key, Date.now())
  }
  
  static endTimer(key: string): number {
    const startTime = this.timers.get(key)
    if (!startTime) {
      return 0
    }
    
    const duration = Date.now() - startTime
    this.timers.delete(key)
    return duration
  }
  
  static measure<T>(key: string, fn: () => T): T {
    this.startTimer(key)
    try {
      const result = fn()
      const duration = this.endTimer(key)
      Logger.info(`Performance: ${key} completed in ${duration}ms`)
      return result
    } catch (error) {
      const duration = this.endTimer(key)
      Logger.error(`Performance: ${key} failed after ${duration}ms`, { error })
      throw error
    }
  }
  
  static async measureAsync<T>(key: string, fn: () => Promise<T>): Promise<T> {
    this.startTimer(key)
    try {
      const result = await fn()
      const duration = this.endTimer(key)
      Logger.info(`Performance: ${key} completed in ${duration}ms`)
      return result
    } catch (error) {
      const duration = this.endTimer(key)
      Logger.error(`Performance: ${key} failed after ${duration}ms`, { error })
      throw error
    }
  }
}

// Main Logger class
export class Logger {
  private static config = defaultConfig
  
  static configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config }
  }
  
  private static shouldLog(level: LogLevel): boolean {
    return level <= this.config.level
  }
  
  private static formatLogEntry(entry: LogEntry): string {
    const { timestamp, level, message, context, requestId, userId, duration, error } = entry
    
    let logLine = `[${timestamp}] ${LogLevel[level]} ${message}`
    
    if (requestId) logLine += ` [${requestId}]`
    if (userId) logLine += ` [user:${userId}]`
    if (duration !== undefined) logLine += ` [${duration}ms]`
    
    if (context && Object.keys(context).length > 0) {
      logLine += ` ${JSON.stringify(context)}`
    }
    
    if (error) {
      logLine += `\nError: ${error.name}: ${error.message}`
      if (error.stack) {
        logLine += `\nStack: ${error.stack}`
      }
    }
    
    return logLine
  }
  
  private static writeLog(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) return
    
    const formattedLog = this.formatLogEntry(entry)
    
    // Console output
    if (this.config.enableConsole) {
      switch (entry.level) {
        case LogLevel.ERROR:
          console.error(formattedLog)
          break
        case LogLevel.WARN:
          console.warn(formattedLog)
          break
        case LogLevel.INFO:
          console.info(formattedLog)
          break
        case LogLevel.DEBUG:
          console.debug(formattedLog)
          break
      }
    }
    
    // File output (in production)
    if (this.config.enableFile && typeof process !== 'undefined') {
      this.writeToFile(formattedLog)
    }
    
    // Remote logging (in production)
    if (this.config.enableRemote && this.config.remoteEndpoint) {
      this.sendToRemote(entry)
    }
  }
  
  private static writeToFile(logLine: string): void {
    // In a real implementation, you would use a proper logging library
    // like winston or pino for file logging
    try {
      const fs = require('fs')
      const path = require('path')
      
      const logDir = path.join(process.cwd(), 'logs')
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true })
      }
      
      const logFile = path.join(logDir, `app-${new Date().toISOString().split('T')[0]}.log`)
      fs.appendFileSync(logFile, logLine + '\n')
    } catch (error) {
      console.error('Failed to write to log file:', error)
    }
  }
  
  private static async sendToRemote(entry: LogEntry): Promise<void> {
    try {
      if (!this.config.remoteEndpoint) return
      
      await fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      })
    } catch (error) {
      console.error('Failed to send log to remote endpoint:', error)
    }
  }
  
  static error(message: string, context?: Record<string, unknown>, error?: Error): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      message,
      context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : undefined,
    })
  }
  
  static warn(message: string, context?: Record<string, unknown>): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.WARN,
      message,
      context,
    })
  }
  
  static info(message: string, context?: Record<string, unknown>): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      message,
      context,
    })
  }
  
  static debug(message: string, context?: Record<string, unknown>): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.DEBUG,
      message,
      context,
    })
  }
  
  // Request logging helpers
  static logRequest(request: NextRequest, method: string, path: string): string {
    const context = extractRequestContext(request)
    const requestId = context.requestId!
    
    this.info(`Request: ${method} ${path}`, {
      ...context,
      method,
      path,
    })
    
    return requestId
  }
  
  static logResponse(requestId: string, status: number, duration: number): void {
    this.info(`Response: ${status}`, {
      requestId,
      status,
      duration,
    })
  }
  
  static logError(requestId: string, error: Error, context?: Record<string, unknown>): void {
    this.error(`Request failed: ${error.message}`, {
      requestId,
      ...context,
    }, error)
  }
  
  // Database logging
  static logDatabaseQuery(query: string, duration: number, params?: unknown[]): void {
    this.debug(`Database query executed`, {
      query: query.substring(0, 200) + (query.length > 200 ? '...' : ''),
      duration,
      paramCount: params?.length || 0,
    })
  }
  
  static logDatabaseError(query: string, error: Error): void {
    this.error(`Database query failed`, {
      query: query.substring(0, 200) + (query.length > 200 ? '...' : ''),
    }, error)
  }
  
  // Security logging
  static logSecurityEvent(event: string, context: Record<string, unknown>): void {
    this.warn(`Security event: ${event}`, {
      ...context,
      severity: 'security',
    })
  }
  
  static logAuthAttempt(username: string, success: boolean, ip: string): void {
    this.info(`Authentication attempt`, {
      username,
      success,
      ip,
      severity: 'auth',
    })
  }
  
  // Business logic logging
  static logApplicationSubmitted(applicationId: string, email: string): void {
    this.info(`Application submitted`, {
      applicationId,
      email,
      severity: 'business',
    })
  }
  
  static logNewsletterSignup(email: string): void {
    this.info(`Newsletter signup`, {
      email,
      severity: 'business',
    })
  }
  
  static logAdminAction(action: string, adminId: string, targetId?: string): void {
    this.info(`Admin action: ${action}`, {
      adminId,
      targetId,
      severity: 'admin',
    })
  }
}

// Middleware for request logging
export function withLogging<T extends any[]>(
  handler: (...args: T) => Promise<Response> | Response
) {
  return async (...args: T): Promise<Response> => {
    const startTime = Date.now()
    let requestId: string | undefined
    
    try {
      // Extract request from args (assuming first arg is NextRequest)
      const request = args[0] as NextRequest
      if (request) {
        const url = new URL(request.url)
        requestId = Logger.logRequest(request, request.method, url.pathname)
      }
      
      const response = await handler(...args)
      const duration = Date.now() - startTime
      
      if (requestId) {
        Logger.logResponse(requestId, response.status, duration)
      }
      
      return response
    } catch (error) {
      const duration = Date.now() - startTime
      
      if (requestId) {
        Logger.logError(requestId, error as Error, { duration })
      } else {
        Logger.error('Unhandled error in request', { duration }, error as Error)
      }
      
      throw error
    }
  }
}

// Database query logging wrapper
export function withDatabaseLogging<T extends any[]>(
  queryFn: (...args: T) => Promise<any>
) {
  return async (...args: T): Promise<any> => {
    const startTime = Date.now()
    const query = args[0] as string
    
    try {
      const result = await queryFn(...args)
      const duration = Date.now() - startTime
      
      Logger.logDatabaseQuery(query, duration, args.slice(1))
      return result
    } catch (error) {
      const duration = Date.now() - startTime
      Logger.logDatabaseError(query, error as Error)
      throw error
    }
  }
}
