import { useState } from 'react';
import { Download, Image, FileImage, Printer, Share2, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { InternshipData } from '@/types';

interface DownloadButtonsProps {
  certificateRef: React.RefObject<HTMLDivElement>;
  data: InternshipData;
}

type DownloadType = 'pdf' | 'png' | 'jpg' | 'print' | 'share' | null;

export default function DownloadButtons({ certificateRef, data }: DownloadButtonsProps) {
  const [loading, setLoading] = useState<DownloadType>(null);

  const captureCanvas = async (): Promise<HTMLCanvasElement> => {
    if (!certificateRef.current) throw new Error('Certificate not found');
    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 1123,
      height: 794,
      logging: false,
    });
    return canvas;
  };

  const downloadPDF = async () => {
    setLoading('pdf');
    try {
      const canvas = await captureCanvas();
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
      pdf.save(`MaximCode-Certificate-${data.certificateId}.pdf`);
      toast.success('PDF downloaded successfully!');
    } catch (err) {
      console.error('PDF error:', err);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const downloadPNG = async () => {
    setLoading('png');
    try {
      const canvas = await captureCanvas();
      const link = document.createElement('a');
      link.download = `MaximCode-Certificate-${data.certificateId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('PNG downloaded successfully!');
    } catch (err) {
      console.error('PNG error:', err);
      toast.error('Failed to generate PNG. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const downloadJPG = async () => {
    setLoading('jpg');
    try {
      const canvas = await captureCanvas();
      const link = document.createElement('a');
      link.download = `MaximCode-Certificate-${data.certificateId}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
      toast.success('JPG downloaded successfully!');
    } catch (err) {
      console.error('JPG error:', err);
      toast.error('Failed to generate JPG. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const handlePrint = () => {
    setLoading('print');
    window.print();
    setTimeout(() => {
      setLoading(null);
      toast.success('Print dialog opened!');
    }, 500);
  };

  const handleShare = async () => {
    setLoading('share');
    try {
      const url = `https://maximcode.in/verify/${data.certificateId}`;
      if (navigator.share) {
        await navigator.share({
          title: `${data.name} - Internship Certificate`,
          text: `View my Internship Completion Certificate from Maxim Code`,
          url,
        });
        toast.success('Shared successfully!');
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Verification link copied to clipboard!');
      }
    } catch (err) {
      console.error('Share error:', err);
      toast.info('Share cancelled.');
    } finally {
      setLoading(null);
    }
  };

  const buttons = [
    {
      id: 'pdf' as DownloadType,
      label: 'Download PDF',
      icon: Download,
      onClick: downloadPDF,
      primary: true,
      className: 'bg-[#0d1b3e] hover:bg-[#1a3575] text-white',
    },
    {
      id: 'png' as DownloadType,
      label: 'Download PNG',
      icon: Image,
      onClick: downloadPNG,
      primary: false,
      className: 'bg-[#c8971c] hover:bg-[#a67c15] text-white',
    },
    {
      id: 'jpg' as DownloadType,
      label: 'Download JPG',
      icon: FileImage,
      onClick: downloadJPG,
      primary: false,
      className: 'bg-[#c8971c]/80 hover:bg-[#c8971c] text-white',
    },
    {
      id: 'print' as DownloadType,
      label: 'Print',
      icon: Printer,
      onClick: handlePrint,
      primary: false,
      className: 'bg-white hover:bg-gray-50 text-[#0d1b3e] border-2 border-[#0d1b3e]',
    },
    {
      id: 'share' as DownloadType,
      label: 'Share / Copy Link',
      icon: Share2,
      onClick: handleShare,
      primary: false,
      className: 'bg-white hover:bg-gray-50 text-[#c8971c] border-2 border-[#c8971c]',
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {buttons.map((btn) => {
        const Icon = btn.icon;
        const isLoading = loading === btn.id;
        return (
          <Button
            key={btn.id}
            onClick={btn.onClick}
            disabled={loading !== null}
            className={`h-11 px-5 font-semibold rounded-xl flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg ${btn.className}`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Icon className="w-4 h-4" />
            )}
            {btn.label}
          </Button>
        );
      })}
    </div>
  );
}
