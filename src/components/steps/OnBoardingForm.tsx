import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FinalScreen from "../page/FinalScreen";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const OnboardingForm = () => {
    const currentStep = useSelector(
        (state: RootState) => state.onboarding.currentStep
    );
    const [finalData, setFinalData] = useState<any>(null);

    const handleRestart = () => {
        setFinalData(null);
    };

    const steps = [
        { id: 1, label: "Company" },
        { id: 2, label: "Address & Bank" },
        { id: 3, label: "Services" },
    ];

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1 />;
            case 2: return <Step2 />;
            case 3: return <Step3 setFinalData={setFinalData} />;
            default: return <Step1 />;
        }
    };


    if (finalData) {
        return (
            <FinalScreen
                data={finalData}
                onRestart={handleRestart}
            />
        );
    }


    return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-start justify-center py-10 px-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

                {/* Hero Header */}
                <div className="bg-[#1a1a2e] px-8 py-6 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full border-[40px] border-white/[0.04]" />
                    <div className="absolute -bottom-14 left-8 w-36 h-36 rounded-full border-[30px] border-white/[0.03]" />

                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 9h6M9 12h6M9 15h4" />
                            </svg>
                        </div>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-400/20 text-indigo-300">
                            Vendor onboarding
                        </span>
                    </div>

                    <h1 className="text-white text-xl font-medium mb-1">Company Registration</h1>
                    <p className="text-white/50 text-sm">Complete all three steps to register your company.</p>

                    {/* Step Indicators */}
                    <div className="flex items-center mt-6">
                        {steps.map((step, idx) => (
                            <div key={step.id} className="flex items-center flex-1">
                                <div className="flex items-center gap-2">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 transition-all
                                        ${currentStep > step.id ? "bg-green-400 text-green-900"
                                            : currentStep === step.id ? "bg-indigo-400 text-indigo-900"
                                                : "bg-white/10 text-white/40"}`}
                                    >
                                        {currentStep > step.id ? (
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        ) : step.id}
                                    </div>
                                    <span className={`text-xs font-medium transition-all
                                        ${currentStep === step.id ? "text-white"
                                            : currentStep > step.id ? "text-white/70"
                                                : "text-white/40"}`}>
                                        {step.label}
                                    </span>
                                </div>
                                {idx < steps.length - 1 && (
                                    <div className="flex-1 h-px bg-white/15 mx-3" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default OnboardingForm;