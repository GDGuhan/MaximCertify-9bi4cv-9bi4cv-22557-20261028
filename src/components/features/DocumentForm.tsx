import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Award, FileText, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DOMAINS } from '@/constants/skills';
import { generateCertificateId, getCurrentDate } from '@/lib/certificateUtils';
import { InternshipData } from '@/types';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  domain: z.string().min(1, 'Please select a domain'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  internship: z.string().min(2, 'Internship/Course name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function DocumentForm() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [domainOpen, setDomainOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: '',
    },
  });

  const selectedDomain = watch('domain');

  const onSubmit = (values: FormValues) => {
    setIsGenerating(true);
    const certId = generateCertificateId();
    const issueDate = getCurrentDate();

    const data: InternshipData = {
      ...values,
      certificateId: certId,
      issueDate,
    };

    setTimeout(() => {
      localStorage.setItem('mc_certificate_data', JSON.stringify(data));
      navigate('/certificate');
    }, 1200);
  };

  const fields = [
    { id: 'name', label: 'Full Name', placeholder: 'e.g., Arjun Sharma', icon: '👤' },
    { id: 'role', label: 'Internship Role / Designation', placeholder: 'e.g., Frontend Developer Intern', icon: '💼' },
    { id: 'internship', label: 'Internship / Course Name', placeholder: 'e.g., Full Stack Web Development', icon: '📋' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#e8d5a3]">
        {/* Form Header */}
        <div className="bg-[#0d1b3e] px-8 py-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-full bg-[#c8971c] flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-white font-cinzel text-lg font-semibold tracking-wide">Certificate Generator</h2>
          </div>
          <p className="text-[#c8971c] text-sm font-medium opacity-90 ml-11">Fill in the details to generate your certificate</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          {/* Text fields */}
          {fields.map((field) => (
            <div key={field.id}>
              <Label htmlFor={field.id} className="text-[#0d1b3e] font-semibold text-sm mb-1.5 block">
                {field.icon} {field.label}
              </Label>
              <Input
                id={field.id}
                {...register(field.id as keyof FormValues)}
                placeholder={field.placeholder}
                className={cn(
                  'border-[#c8971c]/30 focus:border-[#c8971c] focus:ring-[#c8971c]/20 h-11 text-[#0d1b3e] placeholder:text-gray-400',
                  errors[field.id as keyof FormValues] && 'border-red-400'
                )}
              />
              {errors[field.id as keyof FormValues] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.id as keyof FormValues]?.message}</p>
              )}
            </div>
          ))}

          {/* Domain selector */}
          <div>
            <Label className="text-[#0d1b3e] font-semibold text-sm mb-1.5 block">🎯 Domain / Technology</Label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDomainOpen(!domainOpen)}
                className={cn(
                  'w-full h-11 px-3 border rounded-md text-left flex items-center justify-between transition-colors',
                  'border-[#c8971c]/30 focus:border-[#c8971c] focus:ring-[#c8971c]/20 bg-white hover:border-[#c8971c]/60',
                  selectedDomain ? 'text-[#0d1b3e]' : 'text-gray-400',
                  errors.domain && 'border-red-400'
                )}
              >
                <span className="text-sm">{selectedDomain || 'Select domain...'}</span>
                <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', domainOpen && 'rotate-180')} />
              </button>
              {domainOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-[#c8971c]/30 rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {DOMAINS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setValue('domain', d, { shouldValidate: true });
                        setDomainOpen(false);
                      }}
                      className={cn(
                        'w-full px-3 py-2.5 text-left text-sm hover:bg-[#0d1b3e]/5 transition-colors',
                        selectedDomain === d && 'bg-[#0d1b3e]/10 font-medium text-[#0d1b3e]'
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.domain && <p className="text-red-500 text-xs mt-1">{errors.domain.message}</p>}
          </div>

          {/* Date row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate" className="text-[#0d1b3e] font-semibold text-sm mb-1.5 block">📅 Start Date</Label>
              <Input
                id="startDate"
                type="date"
                {...register('startDate')}
                className={cn(
                  'border-[#c8971c]/30 focus:border-[#c8971c] h-11 text-[#0d1b3e]',
                  errors.startDate && 'border-red-400'
                )}
              />
              {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
            </div>
            <div>
              <Label htmlFor="endDate" className="text-[#0d1b3e] font-semibold text-sm mb-1.5 block">📅 End Date</Label>
              <Input
                id="endDate"
                type="date"
                {...register('endDate')}
                className={cn(
                  'border-[#c8971c]/30 focus:border-[#c8971c] h-11 text-[#0d1b3e]',
                  errors.endDate && 'border-red-400'
                )}
              />
              {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isGenerating}
            className="w-full h-12 bg-[#c8971c] hover:bg-[#a67c15] text-white font-semibold text-base rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl mt-2"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                Generating Certificate...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Generate Certificate
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
