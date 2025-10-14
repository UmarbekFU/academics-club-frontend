'use client';

import Image from 'next/image';

const Universities = () => {
  const universities = [
    {
      name: 'Harvard University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/200px-Harvard_University_coat_of_arms.svg.png'
    },
    {
      name: 'Yale University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/200px-Yale_University_Shield_1.svg.png'
    },
    {
      name: 'Princeton University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/200px-Princeton_seal.svg.png'
    },
    {
      name: 'MIT',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/200px-MIT_logo.svg.png'
    },
    {
      name: 'Stanford University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/200px-Seal_of_Leland_Stanford_Junior_University.svg.png'
    },
    {
      name: 'Columbia University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Columbia_University_shield.svg/200px-Columbia_University_shield.svg.png'
    },
    {
      name: 'University of Pennsylvania',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UPenn_shield_with_banner.svg/200px-UPenn_shield_with_banner.svg.png'
    },
    {
      name: 'Cornell University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/200px-Cornell_University_seal.svg.png'
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
            Our Students Have Been Admitted To
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Top Universities Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {universities.map((university, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 hover:scale-105 transition-transform duration-200"
            >
              <div className="relative w-20 h-20 grayscale hover:grayscale-0 transition-all duration-300">
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


