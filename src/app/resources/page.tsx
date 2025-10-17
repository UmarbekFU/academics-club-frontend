import Link from 'next/link';
import { Download, FileText, CheckCircle, BookOpen, Lightbulb, Target } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Free Resources - The Academics Club',
  description: 'Download free college essay guides, templates, and writing resources to help you craft compelling applications.',
};

async function getResources() {
  try {
    const resources = await prisma.resource.findMany({
      where: { active: true },
      orderBy: { downloads: 'desc' },
    });
    return resources;
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
}

const getIconForType = (type: string) => {
  switch (type) {
    case 'PDF Guide':
      return BookOpen;
    case 'Templates':
      return FileText;
    case 'Worksheet':
      return Lightbulb;
    case 'Checklist':
      return Target;
    default:
      return FileText;
  }
};

export default async function ResourcesPage() {
  const resources = await getResources();

  const bonuses = [
    'Weekly essay writing tips newsletter',
    'Access to private student community',
    'Monthly live Q&A sessions',
    'Priority program discounts'
  ];

  const totalDownloads = resources.reduce((sum, resource) => sum + resource.downloads, 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#002445] via-[#003d5c] to-[#00B4D8] text-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-semibold">100% Free, No Credit Card Required</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
            Free College Essay Resources
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Download proven guides, templates, and checklists used by hundreds of students to get into their dream schools
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm">
            <div>
              <div className="text-2xl font-black">{totalDownloads.toLocaleString()}+</div>
              <div className="text-gray-300">Downloads</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div>
              <div className="text-2xl font-black">4.9/5</div>
              <div className="text-gray-300">Rating</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div>
              <div className="text-2xl font-black">100%</div>
              <div className="text-gray-300">Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          {resources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No resources available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.map((resource) => {
                const IconComponent = getIconForType(resource.type);
                const highlights = JSON.parse(resource.highlights || '[]');
                
                return (
                  <div
                    key={resource.id}
                    className="group bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#002445] hover:shadow-xl transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 bg-[#002445] rounded-xl group-hover:scale-110 transition-transform">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-[#D4AF37]">{resource.type}</div>
                        <div className="text-xs text-gray-500">{resource.pages}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#002445] transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {resource.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 mb-6">
                      {highlights.map((highlight: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        <Download className="w-4 h-4 inline mr-1" />
                        {resource.downloads.toLocaleString()} downloads
                      </div>
                      <button className="bg-[#002445] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#003d5c] transition-all duration-200 flex items-center gap-2 group-hover:scale-105">
                        Download Free
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-24 bg-gradient-to-br from-[#002445] to-[#003d5c] text-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Get Even More When You Join
            </h2>
            <p className="text-xl text-gray-300">
              Unlock exclusive bonuses and ongoing support
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {bonuses.map((bonus, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200">{bonus}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/#newsletter"
                className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Join Free Newsletter
              </Link>
              <p className="text-sm text-gray-400 mt-4">
                Join 500+ students improving their essays weekly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Helps Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Why Students Love Our Resources
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Real feedback from students who used our free resources
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-4xl font-black text-[#002445] mb-2">Step-by-Step</div>
              <p className="text-gray-600">
                Clear, actionable guidance you can implement immediately
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-4xl font-black text-[#002445] mb-2">Real Examples</div>
              <p className="text-gray-600">
                Actual essays from students admitted to top schools
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-4xl font-black text-[#002445] mb-2">No Fluff</div>
              <p className="text-gray-600">
                Only practical tips you won&apos;t find anywhere else
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Ready for More Personal Guidance?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join our structured programs for 1-on-1 coaching and expert feedback
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/writing-program"
              className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 inline-flex items-center justify-center"
            >
              View Programs
            </Link>
            <Link
              href="/#contact"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 inline-flex items-center justify-center"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}