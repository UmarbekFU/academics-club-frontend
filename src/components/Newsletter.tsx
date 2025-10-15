'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Gift, Sparkles, ArrowRight } from 'lucide-react';
import { publicApi } from '@/lib/api';

const NewsletterNew = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMessage('');

    try {
      await publicApi.subscribeNewsletter(email);
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: unknown) {
      setStatus('error');
      let errorMsg = 'Failed to subscribe';
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMsg = axiosError.response?.data?.message || 'Failed to subscribe';
      }
      
      setErrorMessage(errorMsg);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#002445] to-[#003d5c] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 sm:p-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#E5C158] rounded-full mb-6 relative">
              <Mail className="w-10 h-10 text-white" />
              <div className="absolute -top-1 -right-1">
                <Gift className="w-6 h-6 text-[#FF6B6B]" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 flex items-center justify-center gap-2 flex-wrap">
              Join Our Newsletter
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            </h2>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-300 mb-4">
              Get actionable college admissions tips, writing strategies, 
              and program updates delivered to your inbox weekly.
            </p>

            {/* Benefit Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-sm text-white">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                Free Forever
              </span>
              <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-sm text-white">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                Weekly Tips
              </span>
              <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-sm text-white">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                No Spam
              </span>
            </div>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-lg py-8 px-6">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    You&apos;re In! 🎉
                  </h3>
                  <p className="text-emerald-100">
                    Check your email for a welcome message with your first essay tip!
                  </p>
                </div>
              </div>
            ) : status === 'error' ? (
              <div className="flex flex-col items-center justify-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg py-6 px-6 mb-4">
                <span className="font-semibold text-red-200">{errorMessage}</span>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm text-red-300 hover:text-red-100 underline"
                >
                  Try again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-6 py-4 rounded-lg bg-white text-gray-900 font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] border-2 border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#FF6B6B] to-[#ff5252] hover:from-[#ff5252] hover:to-[#ff3838] text-white px-8 py-4 rounded-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-sm text-gray-400">
                  <strong className="text-white">Free resources:</strong> Essay tips, templates, and success stories
                </p>
              </form>
            )}

            {/* Social Proof */}
            {status === 'idle' && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-[#002445] bg-gradient-to-br from-[#D4AF37] to-[#E5C158]"
                      />
                    ))}
                  </div>
                  <span>
                    Join <strong className="text-white font-bold">500+</strong> students already subscribed
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#00B4D8]/10 rounded-full blur-3xl" />
    </section>
  );
};

export default NewsletterNew;

