// Re-export prisma from the centralized instance
export { prisma } from './prisma'

// Database optimization utilities
export class DatabaseOptimizer {
  // Optimized blog post queries
  static async getBlogPostsOptimized(params: {
    page?: number;
    limit?: number;
    published?: boolean;
    featured?: boolean;
    tag?: string;
  }) {
    const { page = 1, limit = 10, published, featured, tag } = params;
    const skip = (page - 1) * limit;
    
    const where: Record<string, unknown> = {};
    if (published !== undefined) where.published = published;
    if (featured !== undefined) where.featured = featured;
    if (tag) where.tags = { contains: tag };
    
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          published: true,
          featured: true,
          tags: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);
    
    return { posts, total, page, limit, pages: Math.ceil(total / limit) };
  }

  // Optimized team member queries
  static async getTeamMembersOptimized() {
    return prisma.teamMember.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
        position: true,
        bio: true,
        image: true,
        email: true,
        linkedin: true,
        twitter: true,
        order: true,
      },
      orderBy: { order: 'asc' },
    });
  }

  // Optimized application queries
  static async getApplicationsOptimized() {
    return prisma.application.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        program: true,
        message: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Optimized program queries
  static async getProgramsOptimized() {
    return prisma.program.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        content: true,
        duration: true,
        level: true,
        price: true,
        image: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  // Optimized resource queries
  static async getResourcesOptimized() {
    return prisma.resource.findMany({
      where: { active: true },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        pages: true,
        downloads: true,
        highlights: true,
        fileUrl: true,
      },
      orderBy: { downloads: 'desc' },
    });
  }

  // Cache-friendly queries with connection pooling
  static async getBlogPostBySlug(slug: string) {
    return prisma.blogPost.findUnique({
      where: { slug, published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        excerpt: true,
        published: true,
        featured: true,
        tags: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            bio: true,
          },
        },
      },
    });
  }

  // Batch operations for better performance
  static async batchUpdateApplications(updates: Array<{ id: string; status: string }>) {
    const promises = updates.map(({ id, status }) =>
      prisma.application.update({
        where: { id },
        data: { status },
      })
    );
    
    return Promise.all(promises);
  }

  // Analytics queries
  static async getApplicationStats() {
    const [total, byStatus, byProgram] = await Promise.all([
      prisma.application.count(),
      prisma.application.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      prisma.application.groupBy({
        by: ['program'],
        _count: { program: true },
      }),
    ]);
    
    return { total, byStatus, byProgram };
  }

  static async getNewsletterStats() {
    const [total, active] = await Promise.all([
      prisma.newsletter.count(),
      prisma.newsletter.count({ where: { active: true } }),
    ]);
    
    return { total, active };
  }
}

// Connection health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Graceful shutdown
export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
}
