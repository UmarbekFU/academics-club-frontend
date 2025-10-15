'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const Universities = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const universities = [
    {
      name: 'Harvard University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/200px-Harvard_University_coat_of_arms.svg.png',
      color: '#A51C30'
    },
    {
      name: 'Yale University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/200px-Yale_University_Shield_1.svg.png',
      color: '#00356B'
    },
    {
      name: 'Princeton University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/200px-Princeton_seal.svg.png',
      color: '#FF8F00'
    },
    {
      name: 'MIT',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/200px-MIT_logo.svg.png',
      color: '#A31F34'
    },
    {
      name: 'Stanford University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/200px-Seal_of_Leland_Stanford_Junior_University.svg.png',
      color: '#8C1515'
    },
    {
      name: 'Columbia University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Columbia_Lions_logo.svg/200px-Columbia_Lions_logo.svg.png',
      color: '#B9D9EB'
    },
    {
      name: 'University of Pennsylvania',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UPenn_shield_with_banner.svg/200px-UPenn_shield_with_banner.svg.png',
      color: '#011F5B'
    },
    {
      name: 'Cornell University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/200px-Cornell_University_seal.svg.png',
      color: '#B31B1B'
    },
    {
      name: 'Brown University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Brown_Bears_logo.svg/200px-Brown_Bears_logo.svg.png',
      color: '#4E3629'
    },
    {
      name: 'Duke University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Duke_Blue_Devils_logo.svg/200px-Duke_Blue_Devils_logo.svg.png',
      color: '#003087'
    },
    {
      name: 'Northwestern University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Northwestern_Wildcats_logo.svg/200px-Northwestern_Wildcats_logo.svg.png',
      color: '#4E2A84'
    },
    {
      name: 'UC Berkeley',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/University_of_California%2C_Berkeley_logo.svg/200px-University_of_California%2C_Berkeley_logo.svg.png',
      color: '#003262'
    },
  ];

  // Duplicate for seamless loop
  const duplicatedUniversities = [...universities, ...universities];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset when halfway through (seamless loop)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-16 bg-white border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
            Our Students Have Been Admitted To
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Top Universities Worldwide
          </h2>
        </div>

        {/* Scrolling Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Scrolling Content */}
          <div 
            ref={scrollRef}
            className="flex gap-12 overflow-x-hidden smooth-scroll"
          >
            {duplicatedUniversities.map((university, index) => (
              <div
                key={`${university.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center group"
              >
                <div 
                  className="relative w-24 h-24 transition-all duration-300 hover:scale-110 no-grayscale"
                >
                  <Image
                    src={university.logo}
                    alt={university.name}
                    fill
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            and <strong className="text-gray-900">50+ other top-tier universities</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Universities;
