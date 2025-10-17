import { NextRequest, NextResponse } from 'next/server'

// OpenAPI/Swagger documentation
const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'The Academics Club API',
    description: 'API for The Academics Club - College admissions essay coaching and writing programs',
    version: '1.0.0',
    contact: {
      name: 'The Academics Club',
      email: 'admin@theacademicsclub.com',
    },
  },
  servers: [
    {
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      description: 'Production server',
    },
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  paths: {
    '/api/applications': {
      post: {
        summary: 'Submit application',
        description: 'Submit a new application for our programs',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'program'],
                properties: {
                  name: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 100,
                    example: 'John Doe',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'john@example.com',
                  },
                  phone: {
                    type: 'string',
                    example: '+1234567890',
                  },
                  program: {
                    type: 'string',
                    enum: ['writing-program', 'essays-program', 'both', 'consultation'],
                    example: 'writing-program',
                  },
                  message: {
                    type: 'string',
                    maxLength: 1000,
                    example: 'I am interested in improving my college essay writing skills.',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Application submitted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Application submitted successfully' },
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clx1234567890' },
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john@example.com' },
                        program: { type: 'string', example: 'writing-program' },
                        status: { type: 'string', example: 'pending' },
                        createdAt: { type: 'string', format: 'date-time' },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: false },
                    message: { type: 'string', example: 'Validation error' },
                    errors: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          field: { type: 'string', example: 'email' },
                          message: { type: 'string', example: 'Valid email is required' },
                          code: { type: 'string', example: 'invalid_string' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '429': {
            description: 'Too many requests',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: false },
                    message: { type: 'string', example: 'Too many requests' },
                    code: { type: 'string', example: 'RATE_LIMIT_EXCEEDED' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/newsletter': {
      post: {
        summary: 'Subscribe to newsletter',
        description: 'Subscribe to our newsletter for updates and tips',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'john@example.com',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Successfully subscribed to newsletter',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Successfully subscribed to newsletter' },
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clx1234567890' },
                        email: { type: 'string', example: 'john@example.com' },
                        active: { type: 'boolean', example: true },
                        createdAt: { type: 'string', format: 'date-time' },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Validation error or already subscribed',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: false },
                    message: { type: 'string', example: 'Email already subscribed to newsletter' },
                    code: { type: 'string', example: 'BAD_REQUEST' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/blog': {
      get: {
        summary: 'Get blog posts',
        description: 'Retrieve published blog posts with pagination',
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Page number',
            schema: { type: 'integer', minimum: 1, default: 1 },
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Number of posts per page',
            schema: { type: 'integer', minimum: 1, maximum: 50, default: 10 },
          },
          {
            name: 'featured',
            in: 'query',
            description: 'Filter by featured posts',
            schema: { type: 'boolean' },
          },
        ],
        responses: {
          '200': {
            description: 'Blog posts retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Blog posts retrieved successfully' },
                    data: {
                      type: 'object',
                      properties: {
                        posts: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              id: { type: 'string', example: 'clx1234567890' },
                              title: { type: 'string', example: 'How to Write a Compelling College Essay' },
                              slug: { type: 'string', example: 'how-to-write-compelling-college-essay' },
                              excerpt: { type: 'string', example: 'Learn the secrets to writing essays that stand out...' },
                              featured: { type: 'boolean', example: true },
                              tags: { type: 'string', example: 'essay-writing,college-admissions' },
                              createdAt: { type: 'string', format: 'date-time' },
                              author: {
                                type: 'object',
                                properties: {
                                  name: { type: 'string', example: 'Jane Smith' },
                                  avatar: { type: 'string', example: 'https://example.com/avatar.jpg' },
                                },
                              },
                            },
                          },
                        },
                        total: { type: 'integer', example: 25 },
                        page: { type: 'integer', example: 1 },
                        limit: { type: 'integer', example: 10 },
                        pages: { type: 'integer', example: 3 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/blog/{slug}': {
      get: {
        summary: 'Get blog post by slug',
        description: 'Retrieve a specific blog post by its slug',
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            description: 'Blog post slug',
            schema: { type: 'string', example: 'how-to-write-compelling-college-essay' },
          },
        ],
        responses: {
          '200': {
            description: 'Blog post retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Blog post retrieved successfully' },
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clx1234567890' },
                        title: { type: 'string', example: 'How to Write a Compelling College Essay' },
                        slug: { type: 'string', example: 'how-to-write-compelling-college-essay' },
                        content: { type: 'string', example: 'Full blog post content...' },
                        excerpt: { type: 'string', example: 'Learn the secrets to writing essays that stand out...' },
                        featured: { type: 'boolean', example: true },
                        tags: { type: 'string', example: 'essay-writing,college-admissions' },
                        createdAt: { type: 'string', format: 'date-time' },
                        author: {
                          type: 'object',
                          properties: {
                            id: { type: 'string', example: 'clx1234567890' },
                            name: { type: 'string', example: 'Jane Smith' },
                            email: { type: 'string', example: 'jane@example.com' },
                            avatar: { type: 'string', example: 'https://example.com/avatar.jpg' },
                            bio: { type: 'string', example: 'Experienced college admissions counselor...' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Blog post not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: false },
                    message: { type: 'string', example: 'Blog post not found' },
                    code: { type: 'string', example: 'NOT_FOUND' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/team': {
      get: {
        summary: 'Get team members',
        description: 'Retrieve active team members',
        responses: {
          '200': {
            description: 'Team members retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Team members retrieved successfully' },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string', example: 'clx1234567890' },
                          name: { type: 'string', example: 'Jane Smith' },
                          position: { type: 'string', example: 'Senior Essay Coach' },
                          bio: { type: 'string', example: 'Experienced college admissions counselor...' },
                          image: { type: 'string', example: 'https://example.com/team/jane.jpg' },
                          email: { type: 'string', example: 'jane@theacademicsclub.com' },
                          linkedin: { type: 'string', example: 'https://linkedin.com/in/janesmith' },
                          twitter: { type: 'string', example: 'https://twitter.com/janesmith' },
                          order: { type: 'integer', example: 1 },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/programs': {
      get: {
        summary: 'Get programs',
        description: 'Retrieve active programs',
        responses: {
          '200': {
            description: 'Programs retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Programs retrieved successfully' },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string', example: 'clx1234567890' },
                          name: { type: 'string', example: 'Writing Program' },
                          slug: { type: 'string', example: 'writing-program' },
                          description: { type: 'string', example: 'Comprehensive writing program...' },
                          content: { type: 'string', example: 'Full program description...' },
                          duration: { type: 'string', example: '4 weeks' },
                          level: { type: 'string', example: 'Beginner' },
                          price: { type: 'number', example: 299.99 },
                          image: { type: 'string', example: 'https://example.com/program.jpg' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/resources': {
      get: {
        summary: 'Get resources',
        description: 'Retrieve active resources',
        responses: {
          '200': {
            description: 'Resources retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Resources retrieved successfully' },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string', example: 'clx1234567890' },
                          title: { type: 'string', example: 'Essay Writing Guide' },
                          description: { type: 'string', example: 'Comprehensive guide to essay writing...' },
                          type: { type: 'string', example: 'PDF Guide' },
                          pages: { type: 'string', example: '25 pages' },
                          downloads: { type: 'integer', example: 150 },
                          highlights: { type: 'string', example: '["Step-by-step process", "Examples included"]' },
                          fileUrl: { type: 'string', example: 'https://example.com/resources/guide.pdf' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/search': {
      get: {
        summary: 'Search content',
        description: 'Search across blog posts and resources',
        parameters: [
          {
            name: 'query',
            in: 'query',
            required: true,
            description: 'Search query',
            schema: { type: 'string', example: 'college essay' },
          },
          {
            name: 'type',
            in: 'query',
            description: 'Content type to search',
            schema: { type: 'string', enum: ['blog', 'resources', 'all'], default: 'all' },
          },
          {
            name: 'page',
            in: 'query',
            description: 'Page number',
            schema: { type: 'integer', minimum: 1, default: 1 },
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Number of results per page',
            schema: { type: 'integer', minimum: 1, maximum: 50, default: 10 },
          },
        ],
        responses: {
          '200': {
            description: 'Search completed successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Search completed successfully' },
                    data: {
                      type: 'object',
                      properties: {
                        blog: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              id: { type: 'string', example: 'clx1234567890' },
                              title: { type: 'string', example: 'How to Write a Compelling College Essay' },
                              slug: { type: 'string', example: 'how-to-write-compelling-college-essay' },
                              excerpt: { type: 'string', example: 'Learn the secrets to writing essays...' },
                              tags: { type: 'string', example: 'essay-writing,college-admissions' },
                              createdAt: { type: 'string', format: 'date-time' },
                              author: {
                                type: 'object',
                                properties: {
                                  name: { type: 'string', example: 'Jane Smith' },
                                  avatar: { type: 'string', example: 'https://example.com/avatar.jpg' },
                                },
                              },
                            },
                          },
                        },
                        resources: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              id: { type: 'string', example: 'clx1234567890' },
                              title: { type: 'string', example: 'Essay Writing Guide' },
                              description: { type: 'string', example: 'Comprehensive guide...' },
                              type: { type: 'string', example: 'PDF Guide' },
                              downloads: { type: 'integer', example: 150 },
                            },
                          },
                        },
                        total: { type: 'integer', example: 15 },
                        page: { type: 'integer', example: 1 },
                        limit: { type: 'integer', example: 10 },
                        pages: { type: 'integer', example: 2 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/health': {
      get: {
        summary: 'Health check',
        description: 'Check the health status of the application and its services',
        parameters: [
          {
            name: 'type',
            in: 'query',
            description: 'Type of health check',
            schema: { type: 'string', enum: ['health', 'metrics', 'ready', 'live'], default: 'health' },
          },
        ],
        responses: {
          '200': {
            description: 'Health check passed',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', enum: ['healthy', 'degraded', 'unhealthy'], example: 'healthy' },
                    timestamp: { type: 'string', format: 'date-time' },
                    version: { type: 'string', example: '1.0.0' },
                    uptime: { type: 'number', example: 3600 },
                    services: {
                      type: 'object',
                      properties: {
                        database: {
                          type: 'object',
                          properties: {
                            status: { type: 'string', enum: ['healthy', 'degraded', 'unhealthy'] },
                            responseTime: { type: 'number', example: 15 },
                            lastChecked: { type: 'string', format: 'date-time' },
                          },
                        },
                        email: {
                          type: 'object',
                          properties: {
                            status: { type: 'string', enum: ['healthy', 'degraded', 'unhealthy'] },
                            responseTime: { type: 'number', example: 25 },
                            lastChecked: { type: 'string', format: 'date-time' },
                          },
                        },
                      },
                    },
                    metrics: {
                      type: 'object',
                      properties: {
                        memory: {
                          type: 'object',
                          properties: {
                            used: { type: 'number', example: 52428800 },
                            total: { type: 'number', example: 1073741824 },
                            percentage: { type: 'number', example: 5 },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '503': {
            description: 'Service unavailable',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'unhealthy' },
                    timestamp: { type: 'string', format: 'date-time' },
                    services: {
                      type: 'object',
                      properties: {
                        database: {
                          type: 'object',
                          properties: {
                            status: { type: 'string', example: 'unhealthy' },
                            error: { type: 'string', example: 'Connection failed' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'An error occurred' },
          code: { type: 'string', example: 'INTERNAL_ERROR' },
          timestamp: { type: 'string', format: 'date-time' },
        },
      },
      ValidationError: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Validation error' },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string', example: 'email' },
                message: { type: 'string', example: 'Valid email is required' },
                code: { type: 'string', example: 'invalid_string' },
              },
            },
          },
          code: { type: 'string', example: 'VALIDATION_ERROR' },
          timestamp: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
  tags: [
    {
      name: 'Applications',
      description: 'Application submission and management',
    },
    {
      name: 'Newsletter',
      description: 'Newsletter subscription management',
    },
    {
      name: 'Blog',
      description: 'Blog posts and content management',
    },
    {
      name: 'Team',
      description: 'Team member information',
    },
    {
      name: 'Programs',
      description: 'Program information and details',
    },
    {
      name: 'Resources',
      description: 'Educational resources and downloads',
    },
    {
      name: 'Search',
      description: 'Content search functionality',
    },
    {
      name: 'Health',
      description: 'System health and monitoring',
    },
  ],
}

// API Documentation endpoint
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'
    
    if (format === 'yaml') {
      // Convert to YAML format
      const yaml = require('js-yaml')
      const yamlSpec = yaml.dump(openApiSpec)
      
      return new NextResponse(yamlSpec, {
        headers: {
          'Content-Type': 'text/yaml',
          'Content-Disposition': 'inline; filename="api-docs.yaml"',
        },
      })
    }
    
    // Return JSON format by default
    return NextResponse.json(openApiSpec, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate API documentation' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
