import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AppHeader from '@/components/layout/AppHeader';
import CertificateDocument from '@/components/features/CertificateDocument';
import DownloadButtons from '@/components/features/DownloadButtons';
import { InternshipData } from '@/types';
import { getVerificationUrl } from '@/lib/certificateUtils';

export default function CertificatePage() {
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<InternshipData | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem('mc_certificate_data');
    if (!raw) {
      toast.error('No certificate data found. Please fill the form first.');
      navigate('/');
      return;
    }
    setData(JSON.parse(raw));
  }, [navigate]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (!data) return null;

  // Scale certificate to fit container
  const CERT_W = 1123;
  const scale = containerWidth > 0 ? Math.min(1, (containerWidth - 32) / CERT_W) : 1;

  const verifyUrl = getVerificationUrl(data.certificateId);

  const copyLink = async () => {
    await navigator.clipboard.writeText(verifyUrl);
    toast.success('Verification link copied!');
  };

  return (
    <div className="min-h-screen bg-[#f0f4fb] flex flex-col">
      <AppHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-[#0d1b3e] text-[#0d1b3e] hover:bg-[#0d1b3e] hover:text-white h-10 px-4 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Form
            </Button>
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-700 text-sm font-semibold">Certificate Generated</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#c8971c]/30 rounded-xl px-4 py-2">
            <span className="text-xs text-gray-500 font-medium">ID:</span>
            <span className="text-[#0d1b3e] text-sm font-bold tracking-wider">{data.certificateId}</span>
            <button
              onClick={copyLink}
              className="ml-1 text-[#c8971c] hover:text-[#a67c15] transition-colors"
              title="Copy verification link"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Certificate Preview */}
        <div
          ref={containerRef}
          className="bg-white rounded-2xl shadow-xl border border-[#e8d5a3] overflow-hidden mb-6 p-4"
        >
          <div className="text-center text-xs text-gray-400 font-medium tracking-wider uppercase mb-3">
            Certificate Preview — A4 Landscape
          </div>
          <div
            style={{
              width: '100%',
              height: `${794 * scale}px`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <CertificateDocument ref={certificateRef} data={data} scale={scale} />
          </div>
        </div>

        {/* Download Buttons */}
        <div className="bg-white rounded-2xl border border-[#e8d5a3] shadow-md p-6 mb-6">
          <div className="text-center mb-5">
            <h3 className="font-cinzel font-bold text-[#0d1b3e] text-lg">Download Your Certificate</h3>
            <p className="text-gray-500 text-sm mt-1">Choose your preferred format to save or share</p>
          </div>
          <DownloadButtons certificateRef={certificateRef} data={data} />
        </div>

        {/* Certificate Details */}
        <div className="bg-white rounded-2xl border border-[#e8d5a3] shadow-md p-6">
          <h3 className="font-semibold text-[#0d1b3e] text-base mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#c8971c]" /> Certificate Details
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Recipient', value: data.name },
              { label: 'Role', value: data.role },
              { label: 'Domain', value: data.domain },
              { label: 'Internship', value: data.internship },
              { label: 'Start Date', value: data.startDate },
              { label: 'End Date', value: data.endDate },
              { label: 'Issue Date', value: data.issueDate },
              { label: 'Certificate ID', value: data.certificateId },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#f8f4ec] rounded-xl p-3 border border-[#e8d5a3]">
                <div className="text-[10px] text-[#c8971c] font-bold uppercase tracking-wider mb-1">{label}</div>
                <div className="text-[#0d1b3e] text-sm font-semibold truncate" title={value}>{value}</div>
              </div>
            ))}
          </div>

          {/* Verification URL */}
          <div className="mt-4 flex items-center gap-3 bg-[#0d1b3e]/5 rounded-xl p-3 border border-[#0d1b3e]/10">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Verification URL</div>
              <a
                href={verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0d1b3e] text-sm font-medium hover:text-[#c8971c] transition-colors truncate block"
              >
                {verifyUrl}
              </a>
            </div>
            <button
              onClick={copyLink}
              className="flex-shrink-0 bg-[#c8971c] text-white rounded-lg px-3 py-2 text-xs font-semibold hover:bg-[#a67c15] transition-colors flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0d1b3e] border-t-2 border-[#c8971c]/30 py-5 mt-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/50 text-xs">
          © 2024 <span className="text-[#c8971c]">Maxim Code</span> — Building Future Innovators
        </div>
      </footer>
    </div>
  );
}
