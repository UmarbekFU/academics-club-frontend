'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, PenTool } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      id: 'writing',
      title: 'Writing Program',
      description: 'Build strong writing skills for academic success with our comprehensive 6-week program.',
      icon: BookOpen,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      href: '/writing-program',
      duration: '6 weeks',
      level: 'Foundation'
    },
    {
      id: 'essays',
      title: 'Essays Program',
      description: 'Craft compelling college application essays with guidance from admissions experts.',
      icon: PenTool,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
      href: '/essays-program',
      duration: '4 weeks',
      level: 'Advanced'
    }
  ];

  return (
    <section id="programs" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Our Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the program that best fits your needs and goals
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {programs.map((program) => {
            const IconComponent = program.icon;
            return (
              <div
                key={program.id}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="p-3 bg-white rounded-lg shadow-lg">
                      <IconComponent className="h-6 w-6 text-gray-900" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {program.title}
                    </h3>
                    <span className="text-sm font-semibold text-gray-600">
                      {program.duration}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  <Link
                    href={program.href}
                    className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:gap-3 transition-all"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Programs;