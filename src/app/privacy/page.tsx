import { Shield, Eye, Lock, Database, Mail, Phone } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - The Academics Club',
  description: 'Learn how The Academics Club protects your privacy and handles your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#002445] via-[#003d5c] to-[#00B4D8] text-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-semibold">Your Privacy Matters</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            We are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
              <p className="text-sm text-gray-600 mb-0">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Eye className="w-8 h-8 text-[#002445]" />
              Information We Collect
            </h2>
            
            <div className="space-y-6 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Academic information and goals</li>
                  <li>Essay drafts and feedback</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Website usage patterns and preferences</li>
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lock className="w-8 h-8 text-[#002445]" />
              How We Use Your Information
            </h2>
            
            <div className="space-y-6 mb-12">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Provide personalized writing coaching and feedback</li>
                <li>Communicate about programs, services, and updates</li>
                <li>Process payments and manage your account</li>
                <li>Improve our services and website functionality</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraud and unauthorized access</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Database className="w-8 h-8 text-[#002445]" />
              Information Sharing
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-gray-700">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements</li>
                <li>To protect our rights and prevent fraud</li>
                <li>With trusted service providers who assist in our operations</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Data Security
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-gray-700">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Encryption of sensitive data</li>
                <li>Secure data transmission (HTTPS)</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Staff training on data protection</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Your Rights
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-gray-700">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your information</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Cookies and Tracking
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-gray-700">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie preferences through your browser settings.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Changes to This Policy
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Mail className="w-8 h-8 text-[#002445]" />
              Contact Us
            </h2>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@theacademicsclub.com</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Address:</strong> San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
