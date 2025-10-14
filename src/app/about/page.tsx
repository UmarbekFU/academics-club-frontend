import Image from 'next/image';
import Link from 'next/link';
import { Users, Target, Award, Heart, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us - The Academics Club',
  description: 'Learn about The Academics Club\'s mission to help students master writing and storytelling for college admissions success.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Student-Centered',
      description: 'Every decision we make is focused on what\'s best for our students\' success and growth.'
    },
    {
      icon: BookOpen,
      title: 'Excellence in Writing',
      description: 'We believe strong writing skills are fundamental to academic and professional success.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously evolve our methods to stay current with admissions trends and student needs.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We foster a supportive community where students learn from each other and grow together.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Students Helped' },
    { number: '95%', label: 'Success Rate' },
    { number: '50+', label: 'Top Universities' },
    { number: '5+', label: 'Years Experience' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
            About The Academics Club
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering students to tell their stories and achieve their dreams through exceptional writing
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The Academics Club helps students master the art of writing and storytelling for college admissions. Our team of experienced mentors supports students in crafting essays that express their authentic voice.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With personalized guidance and proven strategies, we prepare students for success in both written communication and the admissions process. We believe every student has a unique story to tell, and our mission is to help them tell it powerfully.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded by former admissions officers and writing experts, we understand what colleges are looking for and how to help students present their best selves through compelling narratives.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                  alt="Students working together"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we work with our students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to student success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-black text-gray-900 mb-3">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="Founder"
                width={500}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The Academics Club was born from a simple observation: too many talented students were struggling to express their unique stories in their college applications. As former admissions officers, we saw firsthand how powerful authentic storytelling could be.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We founded The Academics Club to bridge the gap between students' incredible potential and their ability to communicate it effectively. Our approach combines the insider knowledge of admissions professionals with the personalized attention that every student deserves.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we're proud to have helped hundreds of students find their voice and achieve their college dreams. But our mission remains the same: empowering every student to tell their story with confidence and clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Join hundreds of students who have discovered their voice and achieved their college dreams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 inline-flex items-center justify-center gap-2"
            >
              <span>Apply Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/writing-program"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 inline-flex items-center justify-center gap-2"
            >
              <span>Explore Programs</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
