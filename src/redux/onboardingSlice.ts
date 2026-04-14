import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  OnboardingState,
  Step1Data,
  Step2Data,
  Step3Data,
} from "../types/onboarding";

const initialState: OnboardingState = {
  step1: {
    companyName: "",
    companyType: "",
    registrationNumber: "",
    establishedDate: "",
    employeeCount: undefined,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    companyLogo: null,
  },
  step2: {
    address: "",
    country: "",
    state: "",
    zipCode: 0,
    bankName: "",
    accountNumber: "",
    ifsc: "",
    bankProof: null,
  },
  step3: {
    services: [],
    pricingModel: "Subscription",
    currency: "INR",
    declaration: false,
    notes: "",
    finalDoc: null,
  },
  currentStep: 1,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    updateStep1: (state, action: PayloadAction<Partial<Step1Data>>) => {
      state.step1 = { ...state.step1, ...action.payload };
    },
    updateStep2: (state, action: PayloadAction<Partial<Step2Data>>) => {
      state.step2 = { ...state.step2, ...action.payload };
    },
    updateStep3: (state, action: PayloadAction<Partial<Step3Data>>) => {
      state.step3 = { ...state.step3, ...action.payload };
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    resetOnboarding: () => initialState,
  },
});

export const {
  updateStep1,
  updateStep2,
  updateStep3,
  setCurrentStep,
  resetOnboarding,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
