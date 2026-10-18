export type InstallationType = 'indoor' | 'outdoor';

export type FinishMethodId =
  | 'heat_cut'
  | 'eyelet_rope'
  | 'eyelet_suction'
  | 'wood_rope'
  | 'flat_band';

export interface FinishMethod {
  id: FinishMethodId;
  name: string;
  price: number;
  priceDisplay: string;
  description: string;
  isOutdoorAllowed: boolean;
  indoorSuitability: string;
  outdoorSuitability: string;
  badge?: string;
  imageAlt: string;
}

export type BannerStandType = 'none' | 'indoor' | 'outdoor_water';

export interface TemplateDesign {
  id: number;
  title: string;
  tag: string;
  category: 'classic' | 'garden' | 'modern' | 'photo' | 'romantic' | 'traditional';
  bgColor: string;
  accentColor: string;
  textColor: string;
  subTextColor: string;
  badge: string;
  defaultHeadline: string;
  defaultSubheadline: string;
}

export type DeliveryMethod = 'pickup' | 'parcel' | 'quick';

export interface QuoteFormState {
  // Step 1
  widthMm: number;
  heightMm: number;
  eventDate: string;
  eventTime: string;
  isUrgent: boolean;
  deliveryMethod: DeliveryMethod;

  // Step 2
  selectedTemplateId: number;
  groomName: string;
  brideName: string;
  weddingHall: string;
  installationType: InstallationType | null;
  finishMethod: FinishMethodId | null;

  // Step 3
  addBanner: boolean | null;
  bannerStandType: BannerStandType;
}

export interface QuoteCalculation {
  widthM: number;
  heightM: number;
  areaM2: number;
  rawBannerCost: number;
  bannerBasePrice: number; // rounded up to nearest 1,000
  finishCost: number;
  bannerPrintPrice: number;
  bannerStandPrice: number;
  bannerTotalAddon: number;
  deliveryCost: number;
  isQuickDelivery: boolean;
  totalPrice: number;
  hasSpecialInquiry: boolean;
}
