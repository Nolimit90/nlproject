import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-1 text-4xl md:text-5xl lg:text-6xl mb-6 text-[#0A0F1C]">
              Privacy Policy
            </h1>
          </div>

          <div className="bg-white rounded-[16px] shadow-sm p-8 border border-[#E6F2FF]">
            <div className="prose prose-lg max-w-none">
              <p className="text-[#2E3A4A] mb-6">
                This privacy policy describes how NL Project collects, uses, and protects your information when you use our services.
              </p>
              
              <h2 className="heading-3 text-xl text-[#0A0F1C] mb-4">Information We Collect</h2>
              <p className="text-[#2E3A4A] mb-6">
                We collect information you provide directly to us, such as when you fill out our contact form or communicate with us.
              </p>
              
              <h2 className="heading-3 text-xl text-[#0A0F1C] mb-4">How We Use Your Information</h2>
              <p className="text-[#2E3A4A] mb-6">
                We use the information we collect to provide, maintain, and improve our services, and to communicate with you.
              </p>
              
              <h2 className="heading-3 text-xl text-[#0A0F1C] mb-4">Contact Us</h2>
              <p className="text-[#2E3A4A]">
                If you have any questions about this privacy policy, please contact us at{' '}
                <a href="mailto:hello@nlproject.dev" className="text-[#0FA47A] hover:text-[#0D8A66]">
                  hello@nlproject.dev
                </a>
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/"
              className="text-[#0FA47A] hover:text-[#0D8A66] transition-colors font-medium"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}








