import { FileText, Scale, Users, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service - The Academics Club',
  description: 'Terms and conditions for using The Academics Club services and programs.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#002445] via-[#003d5c] to-[#00B4D8] text-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-semibold">Terms & Conditions</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
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
              <Scale className="w-8 h-8 text-[#002445]" />
              Acceptance of Terms
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-gray-700">
                By accessing and using The Academics Club website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-[#002445]" />
              Services Description
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-gray-700">
                The Academics Club provides educational services including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Writing program coaching and instruction</li>
                <li>College essay guidance and feedback</li>
                <li>Educational resources and materials</li>
                <li>One-on-one mentoring sessions</li>
                <li>Online courses and workshops</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              User Responsibilities
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-gray-700">As a user of our services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Provide accurate and complete information</li>
                <li>Use services only for lawful purposes</li>
                <li>Respect intellectual property rights</li>
                <li>Maintain confidentiality of account credentials</li>
                <li>Not share or redistribute course materials without permission</li>
                <li>Follow all program guidelines and instructions</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Payment Terms
            </h2>
            
            <div className="space-y-6 mb-12">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Fees are due before program commencement</li>
                <li>All payments are processed securely through third-party providers</li>
                <li>Refunds are subject to our refund policy (see below)</li>
                <li>Late payments may result in service suspension</li>
                <li>Prices are subject to change with notice</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-[#002445]" />
              Refund Policy
            </h2>
            
            <div className="space-y-6 mb-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Cancellation & Refunds</h3>
                <ul className="list-disc list-inside space-y-2 text-yellow-700">
                  <li>Full refund if cancelled within 48 hours of enrollment</li>
                  <li>50% refund if cancelled within first week of program</li>
                  <li>No refunds after first week of program</li>
                  <li>Refunds processed within 5-10 business days</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Intellectual Property
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-gray-700">
                All content, materials, and intellectual property provided through our services remain the property of The Academics Club. Users may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Copy, distribute, or reproduce materials without permission</li>
                <li>Use content for commercial purposes</li>
                <li>Reverse engineer or attempt to extract source materials</li>
                <li>Share login credentials or access with others</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#002445]" />
              Limitation of Liability
            </h2>
            
            <div className="space-y-6 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-700">
                  <strong>Important:</strong> The Academics Club provides educational guidance and support. We do not guarantee admission to any specific college or university. Our services are designed to improve writing skills and provide guidance, but admission decisions are made solely by educational institutions.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>We are not responsible for admission outcomes</li>
                <li>Services are provided "as is" without warranties</li>
                <li>Our liability is limited to the amount paid for services</li>
                <li>We are not liable for indirect or consequential damages</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Privacy and Data Protection
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-gray-700">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Termination
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-gray-700">
                We reserve the right to terminate or suspend your access to our services at any time, with or without notice, for any reason, including violation of these terms.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Changes to Terms
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-gray-700">
                We may update these Terms of Service from time to time. We will notify users of any material changes by email or through our website. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Governing Law
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-gray-700">
                These terms are governed by the laws of California, United States. Any disputes will be resolved in the courts of California.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-[#002445]" />
              Contact Information
            </h2>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> legal@theacademicsclub.com</p>
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
