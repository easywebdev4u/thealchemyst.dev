export interface Role {
  company: string;
  title: string;
  period: string;
  location: string;
  highlights: string[];
  tech?: string[];
}

export interface Skill {
  name: string;
  level: string;
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export interface NavLink {
  href: string;
  label: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}

export interface SectionHeadingProps {
  label: string;
  title: string;
}
