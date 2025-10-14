import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Mail, Award, BookOpen, Users, Target } from 'lucide-react';

export const metadata = {
  title: 'Our Team - The Academics Club',
  description: 'Meet our experienced team of admissions experts, writing coaches, and mentors dedicated to your success.',
};

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Anna Williams',
      role: 'Founder & Program Director',
      bio: 'Former admissions officer with 8+ years of experience helping students craft compelling applications.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      linkedin: '#',
      email: 'anna@theacademicsclub.com',
      expertise: ['Admissions Strategy', 'Application Review', 'Mentoring'],
    },
    {
      name: 'David Chen',
      role: 'Lead Writing Coach',
      bio: 'Published author and writing instructor specializing in academic and creative writing techniques.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      linkedin: '#',
      email: 'david@theacademicsclub.com',
      expertise: ['Academic Writing', 'Creative Writing', 'Grammar'],
    },
    {
      name: 'Maya Patel',
      role: 'Admissions Consultant',
      bio: 'Former Ivy League admissions reader with expertise in holistic application review and strategy.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      linkedin: '#',
      email: 'maya@theacademicsclub.com',
      expertise: ['Essay Review', 'Strategy', 'Ivy League Admissions'],
    },
    {
      name: 'John Rivera',
      role: 'Essay Editor',
      bio: 'Professional editor specializing in college admissions essays with 8+ years of experience.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      linkedin: '#',
      email: 'john@theacademicsclub.com',
      expertise: ['Essay Editing', 'Proofreading', 'Style Development'],
    },
    {
      name: 'Sarah Johnson',
      role: 'Academic Writing Specialist',
      bio: 'Former university writing center director specializing in student writing development.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      linkedin: '#',
      email: 'sarah@theacademicsclub.com',
      expertise: ['Writing Center', 'Student Development', 'Academic Support'],
    },
    {
      name: 'Michael Thompson',
      role: 'Student Success Coordinator',
      bio: 'Dedicated to ensuring every student receives personalized attention and support throughout their journey.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      linkedin: '#',
      email: 'michael@theacademicsclub.com',
      expertise: ['Student Support', 'Program Coordination', 'Progress Tracking'],
    }
  ];

  const stats = [
    { icon: Users, number: '500+', label: 'Students Helped' },
    { icon: Award, number: '95%', label: 'Success Rate' },
    { icon: Target, number: '50+', label: 'Top Universities' },
    { icon: BookOpen, number: '5+', label: 'Years Experience' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our experienced mentors are dedicated to helping you succeed
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                {/* Image */}
                <div className="relative h-72 mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-gray-200 font-medium">{member.role}</p>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Expertise */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200"
                      aria-label="Email"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href={member.linkedin}
                      className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Why Choose Our Team?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our diverse team brings together admissions expertise and genuine care for student success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Experience</h3>
              <p className="text-gray-600">
                Our team includes former admissions officers and experienced educators with decades of combined experience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Approach</h3>
              <p className="text-gray-600">
                Every student receives individual attention and customized guidance tailored to their unique goals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Results-Driven</h3>
              <p className="text-gray-600">
                We focus on measurable outcomes and track student progress to ensure every student reaches their potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Ready to Work With Our Team?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join hundreds of students who have achieved their college dreams with our experienced team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 inline-flex items-center justify-center"
            >
              Apply Now
            </Link>
            <Link
              href="/about"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 inline-flex items-center justify-center"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
