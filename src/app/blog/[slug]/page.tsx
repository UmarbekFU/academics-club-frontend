import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ShareButton from '@/components/ShareButton';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  featured: boolean;
  tags: string | null;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    bio: string | null;
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug, published: true },
      include: {
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
    
    if (!blogPost) return null;
    
    return {
      ...blogPost,
      createdAt: blogPost.createdAt.toISOString(),
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blogPost = await getBlogPost(slug);
  
  if (!blogPost) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }
  
  return {
    title: blogPost.title,
    description: blogPost.excerpt || 'Read this blog post from The Academics Club',
    openGraph: {
      title: blogPost.title,
      description: blogPost.excerpt || 'Read this blog post from The Academics Club',
      type: 'article',
      publishedTime: blogPost.createdAt,
      authors: [blogPost.author.name],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blogPost = await getBlogPost(slug);
  
  if (!blogPost) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#001F3F] text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#87CEEB] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            {blogPost.tags && (
              <span className="px-3 py-1 bg-[#87CEEB] text-[#001F3F] rounded-full text-sm font-medium">
                {blogPost.tags.split(',')[0]}
              </span>
            )}
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {blogPost.title}
          </h1>
          
          {blogPost.excerpt && (
            <p className="text-xl text-gray-200 leading-relaxed">
              {blogPost.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Author Info */}
      <div className="border-b bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={blogPost.author.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                  alt={blogPost.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{blogPost.author.name}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blogPost.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <ShareButton
              title={blogPost.title}
              text={blogPost.excerpt || ''}
              url={`/blog/${blogPost.slug}`}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </div>
      </article>

      {/* Author Bio */}
      {blogPost.author.bio && (
        <div className="bg-gray-50 border-t">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-start gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={blogPost.author.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                  alt={blogPost.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  About {blogPost.author.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {blogPost.author.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Posts */}
      <div className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Placeholder for related posts */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">More Writing Tips</h4>
              <p className="text-gray-600 text-sm">Discover additional strategies for improving your college essays.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Success Stories</h4>
              <p className="text-gray-600 text-sm">Read about students who achieved their college admission goals.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-[#001F3F] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
          <p className="text-gray-200 mb-8">
            Subscribe to get more insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
            />
            <button className="bg-[#87CEEB] text-[#001F3F] px-6 py-3 rounded-lg font-semibold hover:bg-[#7BC4E0] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
