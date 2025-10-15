'use client';

import { ArrowRight, Star, CheckCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const HeroNew = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#002445] via-[#003d5c] to-[#00B4D8]">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 dot-pattern" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#002445]/20" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20 text-center">
        <div className="space-y-8">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
            <span className="text-sm font-semibold text-white">
              Helping Students Get Into Top Universities
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
              Write Essays That Get You Into<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E5C158]">
                Your Dream College
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Get personalized coaching to craft authentic essays that make admissions officers say &quot;yes&quot;
            </p>
          </div>

          {/* Key Benefits */}
          <div className="flex flex-col sm:flex-row gap-4 text-white justify-center">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm font-medium">Personalized Feedback</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm font-medium">Expert Mentorship</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm font-medium">Structured Program</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <Link
              href="/essays-program"
              className="bg-[#FF6B6B] hover:bg-[#ff5252] text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/about"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/30 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Learn More</span>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-[#D4AF37] to-[#E5C158] flex items-center justify-center font-bold text-white text-xs"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1 justify-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-sm text-gray-200">
                Join <strong className="text-white font-bold">500+</strong> students improving their essays
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-white/10 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-white mb-2">
                6-8
              </div>
              <div className="text-sm text-gray-300">
                Week Programs
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-white mb-2">
                1-on-1
              </div>
              <div className="text-sm text-gray-300">
                Expert Guidance
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-white mb-2">
                50+
              </div>
              <div className="text-sm text-gray-300">
                Partner Universities
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#00B4D8]/10 rounded-full blur-3xl" />
    </section>
  );
};

export default HeroNew;

