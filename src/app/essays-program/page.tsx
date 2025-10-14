import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Award, FileText, CheckCircle, ArrowRight, Calendar, Target } from 'lucide-react';

export const metadata = {
  title: 'Essays Program - The Academics Club',
  description: 'Craft compelling college application essays with expert guidance from admissions professionals.',
};

export default function EssaysProgramPage() {
  const features = [
    'Personalized essay coaching',
    'Common App and supplemental essays',
    'Multiple rounds of feedback',
    'Brainstorming and topic selection',
    'Story development techniques',
    'College-specific strategies',
    'Final proofreading and polish',
    'Unlimited revisions until perfect'
  ];

  const curriculum = [
    {
      week: 1,
      title: 'Discovery & Brainstorming',
      topics: ['Self-reflection exercises', 'Topic exploration', 'Story selection', 'Initial drafts']
    },
    {
      week: 2,
      title: 'Story Development',
      topics: ['Narrative structure', 'Show, don\'t tell', 'Voice and authenticity', 'Compelling hooks']
    },
    {
      week: 3,
      title: 'Revision & Refinement',
      topics: ['Feedback integration', 'Content strengthening', 'Clarity and flow', 'Word choice']
    },
    {
      week: 4,
      title: 'Polish & Submit',
      topics: ['Final edits', 'Proofreading', 'College-specific tweaks', 'Submission preparation']
    }
  ];

  const instructors = [
    {
      name: 'Michael Rodriguez',
      role: 'Former MIT Admissions Officer',
      bio: 'Ex-admissions officer with 8 years of experience reviewing thousands of college applications.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      name: 'Emily Watson',
      role: 'College Essay Specialist',
      bio: 'Professional writer and college counselor specializing in compelling personal narratives.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    }
  ];

  const essayTypes = [
    {
      title: 'Common Application',
      description: 'Personal statement for the Common App platform',
      icon: FileText
    },
    {
      title: 'Supplemental Essays',
      description: 'College-specific essays and "Why Us?" prompts',
      icon: Target
    },
    {
      title: 'Coalition App',
      description: 'Essays for Coalition Application schools',
      icon: FileText
    },
    {
      title: 'UC Personal Insights',
      description: 'University of California PIQs (4 essays)',
      icon: Target
    }
  ];

  const outcomes = [
    {
      icon: FileText,
      title: 'Authentic Voice',
      description: 'Essays that reflect your true personality and values'
    },
    {
      icon: Award,
      title: 'Competitive Edge',
      description: 'Stand out from thousands of other applicants'
    },
    {
      icon: Users,
      title: 'Expert Feedback',
      description: 'Insights from former admissions officers'
    },
    {
      icon: CheckCircle,
      title: 'Submission Ready',
      description: 'Polished essays ready for college applications'
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
                4-Week Program
              </span>
              <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Essays Program
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Craft compelling college application essays with guidance from admissions experts. Create narratives that stand out and showcase your authentic voice.
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
                  href="/writing-program"
                  className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 inline-flex items-center justify-center"
                >
                  View Writing Program
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
                alt="Student writing essays"
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
              <p className="text-gray-600">4 weeks of intensive essay development</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-900 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Format</h3>
              </div>
              <p className="text-gray-600">1:1 personalized coaching sessions</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-900 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Schedule</h3>
              </div>
              <p className="text-gray-600">2 sessions per week (1 hour each)</p>
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

      {/* Essay Types */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Essays We Help With
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive support for all your college application essays
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {essayTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{type.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              4-Week Process
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {curriculum.map((week, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8">
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
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Meet Your Coaches
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {instructors.map((instructor, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
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
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              What You'll Achieve
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create essays that truly represent who you are and capture admissions officers' attention
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
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Ready to Write Your Story?
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Join our Essays Program and create application essays that showcase your authentic voice
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
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 inline-flex items-center justify-center"
            >
              View Writing Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
