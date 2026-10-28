export const DOMAIN_SKILLS: Record<string, string[]> = {
  'Web Development': ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'MongoDB'],
  'App Development': ['Flutter', 'Firebase', 'REST APIs', 'UI/UX Design', 'Dart', 'Android SDK'],
  'Python': ['Python', 'Automation', 'Data Handling', 'Pandas', 'NumPy', 'Scripting'],
  'Digital Marketing': ['SEO', 'Social Media Marketing', 'Google Analytics', 'Campaign Management', 'Content Strategy', 'Email Marketing'],
  'AI/ML': ['Python', 'Machine Learning', 'Data Analytics', 'TensorFlow', 'AI Tools', 'Model Training'],
  'Data Science': ['Python', 'Data Analysis', 'Visualization', 'Statistics', 'SQL', 'Pandas'],
  'UI/UX Design': ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Adobe XD', 'Design Systems'],
  'Cybersecurity': ['Network Security', 'Ethical Hacking', 'Vulnerability Assessment', 'Linux', 'Penetration Testing', 'OWASP'],
  'Cloud Computing': ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud Architecture'],
};

export const DOMAINS = Object.keys(DOMAIN_SKILLS);

export const DEFAULT_SKILLS = ['Problem Solving', 'Teamwork', 'Communication', 'Project Management', 'Technical Skills'];

export const getSkillsForDomain = (domain: string): string[] => {
  return DOMAIN_SKILLS[domain] || DEFAULT_SKILLS;
};
