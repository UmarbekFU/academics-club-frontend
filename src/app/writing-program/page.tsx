import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Award, BookOpen, CheckCircle, ArrowRight, Calendar } from 'lucide-react';

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
      topics: ['Grammar fundamentals', 'Sentence structure', 'Paragraph development', 'Writing basics']
    },
    {
      week: 2,
      title: 'Style and Voice',
      topics: ['Finding your voice', 'Tone and style', 'Word choice', 'Writing clarity']
    },
    {
      week: 3,
      title: 'Structure and Organization',
      topics: ['Essay structure', 'Logical flow', 'Transitions', 'Outlining techniques']
    },
    {
      week: 4,
      title: 'Academic Writing',
      topics: ['Research integration', 'Citation methods', 'Argumentation', 'Critical thinking']
    },
    {
      week: 5,
      title: 'Revision and Editing',
      topics: ['Self-editing techniques', 'Peer review', 'Feedback integration', 'Final polishing']
    },
    {
      week: 6,
      title: 'Application and Beyond',
      topics: ['Admission essays', 'Portfolio development', 'Future writing goals', 'Continued practice']
    }
  ];

  const instructors = [
    {
      name: 'David Chen',
      role: 'Lead Writing Coach',
      bio: 'Published author and writing instructor with 10+ years of experience in academic writing.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Sarah Johnson',
      role: 'Academic Writing Specialist',
      bio: 'Former university writing center director specializing in student writing development.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    }
  ];

  const outcomes = [
    {
      icon: BookOpen,
      title: 'Improved Grammar',
      description: 'Master fundamental grammar rules and sentence structure'
    },
    {
      icon: Award,
      title: 'Enhanced Clarity',
      description: 'Write with precision and communicate ideas effectively'
    },
    {
      icon: Users,
      title: 'Academic Readiness',
      description: 'Prepare for college-level writing assignments'
    },
    {
      icon: CheckCircle,
      title: 'Essay Preparation',
      description: 'Build foundation for admission essays and applications'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 mb-6">
                6-Week Program
              </span>
              <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Writing Program
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Build strong writing skills for academic success with our comprehensive program. Master the fundamentals of effective writing with personalized guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#contact"
                  className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 inline-flex items-center justify-center gap-2"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/essays-program"
                  className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 inline-flex items-center justify-center"
                >
                  View Essays Program
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Students writing and studying"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-900 rounded-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Duration</h3>
              </div>
              <p className="text-gray-600">6 weeks of intensive writing development</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-900 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Format</h3>
              </div>
              <p className="text-gray-600">Online small groups + optional 1:1 sessions</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-900 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Schedule</h3>
              </div>
              <p className="text-gray-600">2 sessions per week (1.5 hours each)</p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                What You'll Get
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-900 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              6-Week Curriculum
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {curriculum.map((week, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-black text-xl">{week.week}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{week.title}</h3>
                </div>
                <ul className="space-y-3">
                  {week.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
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
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Meet Your Instructors
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {instructors.map((instructor, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{instructor.name}</h3>
                    <p className="text-gray-600 font-semibold mb-2">{instructor.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{instructor.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
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
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{outcome.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{outcome.description}</p>
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
              className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 inline-flex items-center justify-center gap-2"
            >
              <span>Apply Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/essays-program"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 inline-flex items-center justify-center"
            >
              View Essays Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
