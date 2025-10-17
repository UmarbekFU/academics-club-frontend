import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Mail, Award, BookOpen, Users, Target, Sparkles, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Our Team - The Academics Club',
  description: 'Meet our experienced team of admissions experts, writing coaches, and mentors dedicated to your success.',
};

async function getTeamMembers() {
  try {
    const members = await prisma.teamMember.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return members;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  const stats = [
    { icon: Users, number: '500+', label: 'Students Helped' },
    { icon: Award, number: '95%', label: 'Success Rate' },
    { icon: Target, number: '50+', label: 'Top Universities' },
    { icon: BookOpen, number: '5+', label: 'Years Experience' }
  ];

  const reasons = [
    {
      icon: Award,
      title: 'Proven Experience',
      description: 'Our team includes former admissions officers and experienced educators with decades of combined experience.',
      color: '#FF6B6B'
    },
    {
      icon: Users,
      title: 'Personalized Approach',
      description: 'You receive individual attention and customized guidance tailored to your unique goals.',
      color: '#D4AF37'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We focus on measurable outcomes and track your progress to ensure you reach your potential.',
      color: '#00B4D8'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#002445] via-[#003d5c] to-[#00B4D8] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-semibold">Expert Mentors & Former Admissions Officers</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            Meet Our Team
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto">
            Your experienced mentors dedicated to helping you succeed
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#FF6B6B]/10 rounded-full blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const colors = ['#FF6B6B', '#D4AF37', '#00B4D8', '#002445'];
              return (
                <div key={index} className="text-center group">
                  <div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg bg-[${colors[index]}]`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#002445]/10 px-4 py-2 rounded-full mb-6">
              <Users className="w-4 h-4 text-[#002445]" />
              <span className="text-sm font-semibold text-[#002445]">Our Expert Team</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Experienced Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each team member brings years of expertise to help you succeed
            </p>
          </div>

          {teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No team members available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.id} 
                  className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#002445]"
                >
                  {/* Image */}
                  <div className="relative h-72">
                    <Image
                      src={member.image || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-gray-200 font-medium">{member.position}</p>
                    </div>
                    <div 
                      className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-[${['#FF6B6B', '#D4AF37', '#00B4D8', '#002445', '#9333EA', '#10B981'][index % 6]}]`}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Contact */}
                    <div className="flex gap-3">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex-1 p-3 bg-gray-100 hover:bg-[#002445] text-gray-900 hover:text-white rounded-lg transition-all duration-200 flex items-center justify-center group"
                          aria-label="Email"
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          className="flex-1 p-3 bg-gray-100 hover:bg-[#002445] text-gray-900 hover:text-white rounded-lg transition-all duration-200 flex items-center justify-center group"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#002445]/10 px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-semibold text-[#002445]">Why Choose Us</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              What Makes Our Team Different
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our diverse team brings together admissions expertise and genuine care for your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {reasons.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#002445] group"
                >
                  <div 
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg bg-[${reason.color}]`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#002445] to-[#003d5c] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            Ready to Work With Our Team?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join hundreds of students who have achieved their college dreams with our experienced team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-white text-[#002445] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 inline-flex items-center justify-center gap-2 group shadow-xl"
            >
              <span>Get Started Today</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold border-2 border-white hover:bg-white hover:text-[#002445] transition-all duration-200 inline-flex items-center justify-center"
            >
              Learn More About Us
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#FF6B6B]/10 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
}