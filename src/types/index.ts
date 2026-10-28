export interface InternshipData {
  name: string;
  domain: string;
  role: string;
  internship: string;
  startDate: string;
  endDate: string;
  certificateId: string;
  issueDate: string;
}

export type DomainType =
  | 'Web Development'
  | 'App Development'
  | 'Python'
  | 'Digital Marketing'
  | 'AI/ML'
  | 'Data Science'
  | 'UI/UX Design'
  | 'Cybersecurity'
  | 'Cloud Computing'
  | 'Other';
