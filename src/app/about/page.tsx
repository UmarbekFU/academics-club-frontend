import Image from 'next/image';
import Link from 'next/link';
import { Heart, BookOpen, Lightbulb, Users, ArrowRight, CheckCircle, Award, Target, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About Us - The Academics Club',
  description: 'Learn about The Academics Club\'s mission to help students master writing and storytelling for college admissions success.',
};

const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    '#FF6B6B': 'bg-coral',
    '#D4AF37': 'bg-gold',
    '#00B4D8': 'bg-teal',
    '#002445': 'bg-navy',
    '#9333EA': 'bg-purple',
    '#10B981': 'bg-green'
  };
  return colorMap[color] || 'bg-gray-500';
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Student-Centered',
      description: 'Every decision we make focuses on what\'s best for your success and growth.',
      color: '#FF6B6B'
    },
    {
      icon: BookOpen,
      title: 'Excellence in Writing',
      description: 'Strong writing skills are fundamental to your academic and professional success.',
      color: '#D4AF37'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously evolve our methods to stay current with admissions trends.',
      color: '#00B4D8'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a supportive community where you learn from others and grow together.',
      color: '#002445'
    }
  ];

  const stats = [
    { number: '500+', label: 'Students Helped', icon: Users },
    { number: '95%', label: 'Success Rate', icon: Award },
    { number: '50+', label: 'Top Universities', icon: Target },
    { number: '5+', label: 'Years Experience', icon: Sparkles }
  ];

  const benefits = [
    'Work with former admissions officers who know what colleges want',
    'Get personalized feedback on every draft of your essay',
    'Learn proven strategies used by accepted students',
    'Join weekly live sessions with writing experts',
    'Access our library of successful essay examples',
    'Receive unlimited revisions until your essay shines'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <section className="relative py-24 bg-gradient-to-br from-[#002445] via-[#003d5c] to-[#00B4D8] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-semibold">Founded by Former Admissions Officers</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            About The Academics Club
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto">
            Empowering you to tell your story and achieve your dreams through exceptional writing
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#00B4D8]/10 rounded-full blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#002445] to-[#00B4D8] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-[#002445]/10 px-4 py-2 rounded-full mb-6">
                <Heart className="w-4 h-4 text-[#FF6B6B]" />
                <span className="text-sm font-semibold text-[#002445]">Our Mission</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                Helping You Master the Art of Writing
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We help students master the art of writing and storytelling for college admissions. Our team of experienced mentors supports you in crafting essays that express your authentic voice.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                With personalized guidance and proven strategies, we prepare you for success in both written communication and the admissions process. Every student has a unique story to tell, and our mission is to help you tell it powerfully.
              </p>

              <div className="space-y-3 mb-8">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/team"
                className="inline-flex items-center gap-2 bg-[#002445] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#003d5c] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Meet Our Team</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                  alt="Students working together"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002445]/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#002445]/10 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-semibold text-[#002445]">Core Values</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we work with our students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#002445] group"
                >
                  <div 
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg ${getColorClass(value.color)}`}
                  >
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

      {/* What You Get Section */}
      <section className="py-24 bg-gradient-to-br from-[#002445] to-[#003d5c] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              What You Get When You Work With Us
            </h2>
            <p className="text-xl text-gray-300">
              Comprehensive support throughout your entire college essay journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
              >
                <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-gray-100 leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#00B4D8]/10 rounded-full blur-3xl"></div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
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
              className="bg-gradient-to-r from-[#002445] to-[#00B4D8] text-white px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center gap-2 group"
            >
              <span>Start Free Consultation</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/resources"
              className="bg-white text-[#002445] px-8 py-4 rounded-lg font-semibold border-2 border-[#002445] hover:bg-[#002445] hover:text-white transition-all duration-200 inline-flex items-center justify-center gap-2"
            >
              <span>Browse Free Resources</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
