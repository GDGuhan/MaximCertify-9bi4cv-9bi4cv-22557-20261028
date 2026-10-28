import AppHeader from '@/components/layout/AppHeader';
import DocumentForm from '@/components/features/DocumentForm';
import { Shield, Download, QrCode, FileCheck, Star, Zap } from 'lucide-react';

const features = [
  { icon: FileCheck, title: 'Verified Certificates', desc: 'Unique ID + QR code on every certificate' },
  { icon: Download, title: 'Multiple Formats', desc: 'PDF, PNG, JPG & print-ready output' },
  { icon: QrCode, title: 'QR Verification', desc: 'Instant online verification system' },
  { icon: Shield, title: 'MSME Recognized', desc: 'Government-recognized organization' },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-[#f0f4fb] flex flex-col">
      <AppHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-[#0d1b3e] relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-[-80px] right-[-80px] w-[360px] h-[360px] rounded-full bg-[#c8971c]/10 pointer-events-none" />
          <div className="absolute bottom-[-60px] left-[-60px] w-[280px] h-[280px] rounded-full bg-[#c8971c]/6 pointer-events-none" />
          <div className="absolute top-[40%] left-[40%] w-[200px] h-[200px] rounded-full bg-white/3 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left: Hero text */}
              <div className="flex-1 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-[#c8971c]/15 border border-[#c8971c]/40 rounded-full px-4 py-1.5 mb-6">
                  <Zap className="w-3.5 h-3.5 text-[#c8971c]" />
                  <span className="text-[#c8971c] text-xs font-semibold tracking-wider uppercase">
                    Instant Certificate Generation
                  </span>
                </div>

                <h1 className="font-cinzel text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                  Professional<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #c8971c 0%, #f0d060 50%, #c8971c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Internship Certificates
                  </span>
                </h1>

                <p className="text-white/70 text-base lg:text-lg leading-relaxed max-w-md lg:max-w-none mb-8">
                  Generate corporate-quality, verification-ready internship completion certificates for Maxim Code with QR codes, unique IDs, and multi-format downloads.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {['A4 Landscape', 'PDF Export', 'QR Verified', 'Instant Download'].map((tag) => (
                    <span key={tag} className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
                      ✓ {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex gap-8 mt-8 justify-center lg:justify-start">
                  {[
                    { num: '500+', label: 'Certificates Issued' },
                    { num: '15+', label: 'Domains Covered' },
                    { num: '100%', label: 'Verification Ready' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl font-black text-[#c8971c]">{stat.num}</div>
                      <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Form */}
              <div className="w-full lg:w-auto lg:min-w-[520px]">
                <DocumentForm />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[#c8971c] text-xs font-bold tracking-widest uppercase mb-3">
              <Star className="w-3.5 h-3.5" /> Features
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-[#0d1b3e]">Why Choose Maxim Code Certificates?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 border border-[#e8d5a3] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0d1b3e] flex items-center justify-center mb-4 group-hover:bg-[#c8971c] transition-colors">
                  <Icon className="w-5 h-5 text-[#c8971c] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-[#0d1b3e] text-base mb-1.5">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0d1b3e] border-t-2 border-[#c8971c]/30 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white/60 text-sm">
            © 2024 <span className="text-[#c8971c] font-semibold">Maxim Code</span>. All rights reserved.
          </div>
          <div className="text-white/40 text-xs">
            B. Guhan — CEO & Founder &nbsp;|&nbsp; Building Future Innovators
          </div>
        </div>
      </footer>
    </div>
  );
}
