'use client';

import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs');
    programsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center py-20">
        <div className="space-y-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
            <span className="text-sm font-semibold text-gray-700">$2M+ in Scholarships to Top Universities</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
              Get Into Your Dream University
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
              Our students received full scholarships to Harvard, Yale, Princeton, Columbia, and other top universities
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={scrollToPrograms}
              className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center gap-2"
            >
              <span>Explore Programs</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <button
              onClick={scrollToContact}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              Apply Now
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto pt-16">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">$2M+</div>
              <div className="text-sm text-gray-600 font-medium">in Scholarships</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">500+</div>
              <div className="text-sm text-gray-600 font-medium">Students Admitted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">50+</div>
              <div className="text-sm text-gray-600 font-medium">Top Universities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToPrograms}
          className="animate-bounce text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Scroll to programs section"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;