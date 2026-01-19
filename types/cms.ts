// D:\Website\SIFS2026\types\cms.ts

// --- COMMON TYPES ---
export interface CmsSectionProps<T> {
  data: T;
  updateData: (data: T) => void;
}

// --- HERO SECTION ---
export interface HeroSlide {
  id: string;
  type: 'image' | 'video';
  url: string;
}

export interface HeroSectionData {
  title: string;
  target_date: string;
  slides: HeroSlide[]; 
  use_carousel: boolean;
  background_image?: string; 
  background_video?: string; 
  use_video: boolean;
  overlay_opacity: number;
  title_color: string;
  text_color: 'white' | 'black';
  font_family: string;
  show_cta1: boolean;
  show_cta2: boolean;
  show_info_card: boolean;
  show_countdown: boolean;
  cta1_link?: string;
  cta2_link?: string;
  subtitle_vi: string; subtitle_en: string;
  tagline_vi: string; tagline_en: string;
  location_vi: string; location_en: string;
  date_text_vi: string; date_text_en: string;
  time_text_vi: string; time_text_en: string;
  cta1_vi: string; cta1_en: string;
  cta2_vi: string; cta2_en: string;
}

// --- PILLARS SECTION ---
export interface PillarItem {
  id: string;
  title_vi: string;
  title_en: string;
  description_vi: string;
  description_en: string;
  icon_name: string;
  image_url?: string;
}

export interface PillarsSectionData {
  title_vi: string;
  title_en: string;
  pillars: PillarItem[];
}

// --- USP SECTION ---
export interface ComparisonRow {
  id: string;
  aspect_vi: string;
  aspect_en: string;
  traditional_vi: string;
  traditional_en: string;
  sifs_vi: string;
  sifs_en: string;
}

export interface USPSectionData {
  title_vi: string;
  title_en: string;
  subtitle_vi: string;
  subtitle_en: string;
  comparison: ComparisonRow[];
}

// --- ADVISORS & PARTNERS ---
export interface AdvisorItem {
  id: string;
  name_vi: string;
  name_en: string;
  role_vi: string;
  role_en: string;
  image: string;
}

export interface AdvisorsSectionData {
  title_vi: string;
  title_en: string;
  subtitle_vi: string;
  subtitle_en: string;
  partners_title_vi: string;
  partners_title_en: string;
  advisors: AdvisorItem[];
  partners: { id: string; logo_url: string; name: string }[];
}

// --- AGENDA SECTION ---
export interface AgendaEvent {
  id: string;
  time: string;
  title_vi: string;
  title_en: string;
  desc_vi: string;
  desc_en: string;
}

export interface AgendaDay {
  id: string;
  date: string;
  events: AgendaEvent[];
}

export interface AgendaSectionData {
  title_vi: string;
  title_en: string;
  days: AgendaDay[];
}

// --- BOOTH MAP SECTION ---
export interface BoothArea {
  id: string;
  name_vi: string;
  name_en: string;
  description_vi: string;
  description_en: string;
  color_code: string;
}

export interface BoothMapSectionData {
  title_vi: string;
  title_en: string;
  subtitle_vi: string;
  subtitle_en: string;
  note_vi: string;
  note_en: string;
  use_image: boolean;
  map_image_url?: string;
  areas: BoothArea[];
}

// --- CONTACT SECTION ---
export interface ContactPerson {
  id: string;
  name: string;
  role_vi: string;
  role_en: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface ContactSectionData {
  title_vi: string;
  title_en: string;
  subtitle_vi: string;
  subtitle_en: string;
  desc_vi: string;
  desc_en: string;
  address_vi: string;
  address_en: string;
  banner_image: string;
  contacts: ContactPerson[];
}

// --- SITE DATA WRAPPER ---
export interface SiteData {
  hero: HeroSectionData;
  pillars: PillarsSectionData;
  usp: USPSectionData;
  advisors: AdvisorsSectionData;
  boothMap: BoothMapSectionData;
  agenda: AgendaSectionData;
  contact: ContactSectionData;
  footer: {
    copyright_vi: string;
    copyright_en: string;
    social_links: { platform: string; url: string }[];
  };
}