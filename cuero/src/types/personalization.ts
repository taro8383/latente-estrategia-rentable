export type Gender = 'male' | 'female';

export interface GenderInfo {
  gender: Gender;
  genderSpecificText: Record<string, string>;
}

export interface BrandInfo {
  name: string;
  industry: string;
  productType: string;
  targetAudience: string;
}

export interface ReaderInfo {
  name: string;
  company: string;
  position: string;
  location: string;
}

export interface CustomMessages {
  heroHeadline?: string;
  customOffer?: string;
  urgencyMessage?: string;
}

export interface ExpirationInfo {
  createdAt: string;
  expiresAt: string;
  uniqueCode: string;
}

export interface PersonalizationData {
  brandInfo?: BrandInfo;
  readerInfo?: ReaderInfo;
  industryKeywords?: string[];
  customMessages?: CustomMessages;
  expiration?: ExpirationInfo;
  companyLogo?: string;
  companyLogoId?: string;
  genderInfo?: GenderInfo;
}

export interface PersonalizationContextType {
  data: PersonalizationData;
  replacer: VariableReplacer;
  isPersonalized: boolean;
  isExpired: boolean;
  timeRemaining: string;
  isLoading: boolean;
  uniqueCode: string;
  gender?: Gender;
  isExpiringSoon: () => boolean;
  isVeryUrgent: () => boolean;
  getSecondsRemaining: () => number;
}

export interface VariableReplacer {
  replace(text: string): string;
  replaceIndustryKeywords(text: string): string;
  getAvailableVariables(): Record<string, string>;
}