import { InternshipData } from '@/types';

export const generateCertificateId = (): string => {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `MC-${year}-${num}`;
};

export const getCurrentDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const getVerificationUrl = (certId: string): string => {
  return `https://maximcode.in/verify/${certId}`;
};

export const generateCertificateDescription = (data: InternshipData): string => {
  return `has successfully completed the ${data.internship} internship in the domain of ${data.domain} at Maxim Code, from ${formatDisplayDate(data.startDate)} to ${formatDisplayDate(data.endDate)}. Throughout the internship, ${data.name.split(' ')[0]} demonstrated exceptional dedication, technical excellence, and professional growth, consistently delivering high-quality work and showcasing strong commitment to innovation and learning.`;
};
