import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Award, BookOpen, CheckCircle, ArrowRight, Calendar, Sparkles, Star } from 'lucide-react';

export const metadata = {
  title: 'Writing Program - The Academics Club',
  description: 'Build strong writing skills for academic and personal success with our comprehensive 6-week Writing Program.',
};

export default function WritingProgramPage() {
  const features = [
    'Small group sessions (max 8 students)',
    'Optional 1:1 feedback sessions',
    'Interactive writing workshops',
    'Grammar and style fundamentals',
    'Academic writing techniques',
    'Essay structure and organization',
    'Peer review and collaboration',
    'Progress tracking and assessment'
  ];

  const curriculum = [
    {
      week: 1,
      title: 'Foundation Building',
      topics: ['Grammar fundamentals', 'Sentence structure', 'Paragraph development', 'Writing basics'],
      color: '#FF6B6B'
    },
    {
      week: 2,
      title: 'Style and Voice',
      topics: ['Finding your voice', 'Tone and style', 'Word choice', 'Writing clarity'],
      color: '#D4AF37'
    },
    {
      week: 3,
      title: 'Structure and Organization',
      topics: ['Essay structure', 'Logical flow', 'Transitions', 'Outlining techniques'],
      color: '#00B4D8'
    },
    {
      week: 4,
      title: 'Academic Writing',
      topics: ['Research integration', 'Citation methods', 'Argumentation', 'Critical thinking'],
      color: '#002445'
    },
    {
      week: 5,
      title: 'Revision and Editing',
      topics: ['Self-editing techniques', 'Peer review', 'Feedback integration', 'Final polishing'],
      color: '#FF6B6B'
    },
    {
      week: 6,
      title: 'Application and Beyond',
      topics: ['Admission essays', 'Portfolio development', 'Future writing goals', 'Continued practice'],
      color: '#D4AF37'
    }
  ];

  const instructors = [
    {
      name: 'David Chen',
      role: 'Lead Writing Coach',
      bio: 'Published author and writing instructor with 10+ years of experience in academic writing.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      color: '#D4AF37'
    },
    {
      name: 'Sarah Johnson',
      role: 'Academic Writing Specialist',
      bio: 'Former university writing center director specializing in student writing development.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      color: '#00B4D8'
    }
  ];

  const outcomes = [
    {
      icon: BookOpen,
      title: 'Improved Grammar',
      description: 'Master fundamental grammar rules and sentence structure',
      color: '#FF6B6B'
    },
    {
      icon: Award,
      title: 'Enhanced Clarity',
      description: 'Write with precision and communicate ideas effectively',
      color: '#D4AF37'
    },
    {
      icon: Users,
      title: 'Academic Readiness',
      description: 'Prepare for college-level writing assignments',
      color: '#00B4D8'
    },
    {
      icon: CheckCircle,
      title: 'Essay Preparation',
      description: 'Build foundation for admission essays and applications',
      color: '#002445'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#002445] via-[#003d5c] to-[#00B4D8] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-semibold">6-Week Intensive Program</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                Writing Program
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 mb-8 leading-relaxed">
                Build strong writing skills for academic success with personalized guidance and proven techniques
              </p>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#002445] bg-gradient-to-br from-[#D4AF37] to-[#E5C158]"></div>
                  ))}
                </div>
                <div className="text-sm text-gray-200">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                    <span className="font-bold">4.9/5</span>
                  </div>
                  <span>from 200+ students</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#contact"
                  className="bg-white text-[#002445] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-xl group"
                >
                  <span>Start Application</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/essays-program"
                  className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold border-2 border-white hover:bg-white hover:text-[#002445] transition-all duration-200 inline-flex items-center justify-center"
                >
                  View Essays Program
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Students writing and studying"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002445]/50 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#FF6B6B]/10 rounded-full blur-3xl"></div>
      </section>

      {/* Program Details */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#FF6B6B] to-[#ff5252] text-white rounded-2xl p-8 shadow-xl hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Duration</h3>
              </div>
              <p className="text-white/90">6 weeks of intensive writing development</p>
            </div>
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#E5C158] text-white rounded-2xl p-8 shadow-xl hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Format</h3>
              </div>
              <p className="text-white/90">Online small groups + optional 1:1 sessions</p>
            </div>
            <div className="bg-gradient-to-br from-[#00B4D8] to-[#33C4E0] text-white rounded-2xl p-8 shadow-xl hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Schedule</h3>
              </div>
              <p className="text-white/90">2 sessions per week (1.5 hours each)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#002445]/10 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-semibold text-[#002445]">Program Benefits</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              What You'll Get
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive support and resources to master writing skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#002445] transition-all shadow-sm hover:shadow-lg group"
              >
                <CheckCircle className="h-6 w-6 text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#002445]/10 px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-4 h-4 text-[#002445]" />
              <span className="text-sm font-semibold text-[#002445]">Comprehensive Curriculum</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              6-Week Curriculum
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Structured learning path designed to build your writing skills progressively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {curriculum.map((week, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-2xl p-8 border-2 border-transparent hover:border-[#002445] hover:shadow-xl transition-all group"
              >
                <div className="text-center mb-6">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg"
                    style={{ backgroundColor: week.color }}
                  >
                    <span className="text-white font-black text-xl">{week.week}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{week.title}</h3>
                </div>
                <ul className="space-y-3">
                  {week.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start gap-2">
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: week.color }}
                      ></div>
                      <span className="text-gray-600 text-sm leading-relaxed">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-24 bg-gradient-to-br from-[#002445] to-[#003d5c] text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <Users className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-semibold">Expert Instructors</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              Meet Your Instructors
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Learn from experienced writing professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {instructors.map((instructor, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                      <Image
                        src={instructor.image}
                        alt={instructor.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div 
                      className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-[#002445]"
                      style={{ backgroundColor: instructor.color }}
                    ></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{instructor.name}</h3>
                    <p className="text-[#D4AF37] font-semibold mb-3">{instructor.role}</p>
                    <p className="text-gray-300 leading-relaxed">{instructor.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#00B4D8]/10 rounded-full blur-3xl"></div>
      </section>

      {/* Outcomes */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#002445]/10 px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-semibold text-[#002445]">Learning Outcomes</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              What You'll Achieve
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              By the end of this program, you'll have the writing skills and confidence needed for academic success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {outcomes.map((outcome, index) => {
              const IconComponent = outcome.icon;
              return (
                <div 
                  key={index} 
                  className="text-center bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-[#002445] group"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg"
                    style={{ backgroundColor: outcome.color }}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{outcome.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{outcome.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Ready to Improve Your Writing?
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Join our Writing Program and develop the skills you need for academic and personal success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-gradient-to-r from-[#002445] to-[#00B4D8] text-white px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center gap-2 group"
            >
              <span>Start Application</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/essays-program"
              className="bg-white text-[#002445] px-8 py-4 rounded-lg font-semibold border-2 border-[#002445] hover:bg-[#002445] hover:text-white transition-all duration-200 inline-flex items-center justify-center"
            >
              View Essays Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
