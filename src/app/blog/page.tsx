import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

export const metadata = {
  title: 'Blog - The Academics Club',
  description: 'Read our latest insights on college admissions, writing tips, and student success stories.',
};

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'How to Find Your Voice in College Essays',
      excerpt: 'Discover the key to writing authentic college essays that truly represent who you are. Learn techniques for uncovering your unique voice and perspective.',
      author: 'David Chen',
      date: '2024-01-15',
      category: 'Essay Writing',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Top 5 Writing Mistakes Students Make',
      excerpt: 'Avoid these common writing pitfalls that can hurt your college applications. Learn how to identify and fix these mistakes before submitting your essays.',
      author: 'Sarah Johnson',
      date: '2024-01-10',
      category: 'Writing Tips',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'From Draft to Admission: A Student Success Story',
      excerpt: 'Follow the journey of Maria, who transformed her initial essay draft into a compelling narrative that helped her gain admission to her dream school.',
      author: 'Anna Williams',
      date: '2024-01-05',
      category: 'Success Stories',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Understanding the Common Application Essay Prompts',
      excerpt: 'A comprehensive guide to the Common Application essay prompts and how to approach each one effectively. Get expert tips for choosing the right prompt for your story.',
      author: 'Maya Patel',
      date: '2024-01-01',
      category: 'Admissions Tips',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      readTime: '8 min read'
    },
    {
      id: 5,
      title: 'Building a Strong Extracurricular Profile',
      excerpt: 'Learn how to showcase your extracurricular activities effectively in your college applications. Discover what admissions officers are really looking for.',
      author: 'John Rivera',
      date: '2023-12-28',
      category: 'Admissions Tips',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      readTime: '6 min read'
    },
    {
      id: 6,
      title: 'The Art of Storytelling in College Essays',
      excerpt: 'Master the fundamentals of storytelling to create compelling college essays. Learn narrative techniques that will make your essays memorable and impactful.',
      author: 'David Chen',
      date: '2023-12-20',
      category: 'Essay Writing',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
      readTime: '9 min read'
    }
  ];

  const categories = ['All', 'Essay Writing', 'Writing Tips', 'Admissions Tips', 'Success Stories'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-[#001F3F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Insights, tips, and success stories to help you navigate the college admissions process with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  index === 0
                    ? 'bg-[#87CEEB] text-[#001F3F]'
                    : 'bg-gray-100 text-gray-600 hover:bg-[#87CEEB] hover:text-[#001F3F]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#87CEEB] text-[#001F3F] rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#001F3F] mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Read More */}
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center space-x-2 text-[#87CEEB] hover:text-[#001F3F] transition-colors duration-200 font-medium"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-primary px-8 py-3">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-[#001F3F] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Get the latest blog posts, writing tips, and admissions insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
            />
            <button className="btn-accent px-6 py-3">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}




