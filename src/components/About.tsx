'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';

const About = () => {
  const features = [
    "Personalized mentorship from experienced writers",
    "Proven strategies for compelling personal statements",
    "Support for supplemental essays and applications",
    "Access to exclusive writing resources"
  ];

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="order-1 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="Students working together"
                width={600}
                height={400}
                className="w-full h-auto"
                loading="lazy"
                quality={85}
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-2">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              About The Academics Club
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We help students master the art of writing and storytelling for college admissions. Our experienced mentors support students in crafting essays that express their authentic voice.
            </p>

            {/* Features list */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:gap-3 transition-all"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;