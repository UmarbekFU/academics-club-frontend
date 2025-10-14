'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="bg-gray-900 rounded-3xl p-12 sm:p-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Join Our Newsletter
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Get actionable college admissions tips and writing advice delivered to your inbox weekly. Free forever.
            </p>

            {status === 'success' ? (
              <div className="flex items-center justify-center gap-2 text-emerald-400 bg-emerald-400/10 rounded-lg py-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Successfully subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-sm text-gray-400 mt-6">
              Join 500+ students already subscribed. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;


