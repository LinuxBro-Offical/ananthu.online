import { useQuery } from "@tanstack/react-query";

import { PORTFOLIO_ENDPOINT, jsonFetcher } from "@/lib/api";

export type NavigationLink = {
  label: string;
  target: string;
  is_external: boolean;
  order: number;
};

export type SiteSettings = {
  brand_name: string;
  brand_subtitle: string;
  hero_heading: string;
  hero_highlight: string;
  hero_subheading: string;
  hero_description: string;
  primary_cta_label: string;
  primary_cta_action: "scroll" | "url" | "modal";
  primary_cta_target: string;
  secondary_cta_label: string;
  secondary_cta_action: "scroll" | "url" | "modal";
  secondary_cta_target: string;
  whatsapp_link: string;
  calendly_link: string;
  contact_email: string;
  contact_phone: string;
};

export type AboutHighlight = {
  title: string;
  description: string;
  icon_name: string;
  order: number;
};

export type AboutSection = {
  heading: string;
  subtitle: string;
  description: string;
  highlight_quote: string;
  highlight_caption: string;
  profile_image: string | null;
  highlights: AboutHighlight[];
};

export type SkillItem = {
  name: string;
  description: string;
  logo: string | null;
  logo_url: string;
  order: number;
};

export type SkillCategory = {
  title: string;
  subtitle: string;
  highlight: string;
  order: number;
  skills: SkillItem[];
};

export type ProjectTech = {
  name: string;
  order: number;
};

export type ProjectImage = {
  image: string;
  caption: string;
};

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  cover_image: string | null;
  gradient_start: string;
  gradient_end: string;
  live_url: string;
  code_url: string;
  order: number;
  tech: ProjectTech[];
  gallery: ProjectImage[];
};

export type Testimonial = {
  author_name: string;
  author_role: string;
  quote: string;
  order: number;
};

export type SocialLink = {
  label: string;
  url: string;
  icon_name: string;
  order: number;
};

export type Footer = {
  text: string;
  tagline: string;
};

export type Resume = {
  resume_type: "professional" | "ats";
  file: string;
};

export type PortfolioContent = {
  site: SiteSettings | null;
  navigation: NavigationLink[];
  about: AboutSection | null;
  skills: SkillCategory[];
  projects: Project[];
  testimonials: Testimonial[];
  social_links: SocialLink[];
  footer: Footer | null;
  resumes: Resume[];
};

export const usePortfolioContent = () =>
  useQuery<PortfolioContent>({
    queryKey: ["portfolio-content"],
    queryFn: () => jsonFetcher<PortfolioContent>(PORTFOLIO_ENDPOINT),
    staleTime: 1000 * 60 * 5,
  });

