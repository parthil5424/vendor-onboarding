export interface FileMetadata {
  id: string; // IndexedDB key
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface Step1Data {
  companyName: string;
  companyType: string;
  registrationNumber?: string;
  establishedDate?: string;
  employeeCount?: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyLogo?: FileMetadata | null;
}

export interface Step2Data {
  address: string;
  country: string;
  state?: string;
  zipCode: number;
  bankName: string;
  accountNumber: string;
  ifsc?: string;
  bankProof?: FileMetadata | null;
}

export interface Step3Data {
  services: string[];
  pricingModel: "Subscription" | "One-time" | "Pay-per-use";
  currency: string;
  declaration: boolean;
  notes?: string;
  finalDoc?: FileMetadata | null;
}

export interface OnboardingState {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  currentStep: number;
}
