import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { updateStep3, setCurrentStep } from "@/redux/onboardingSlice";
import FileUpload from "../ui/FileUpload";
import { saveFile } from "@/services/indexedDB";
import { step3Schema } from "@/schema/step3";
import { resetOnboarding } from "@/redux/onboardingSlice";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-3 mt-6 first:mt-0 pb-2 border-b border-gray-100">
        {children}
    </p>
);

const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all";

const services = ["Web Development", "Mobile App", "UI/UX", "SEO"];
const pricingModels = ["Subscription", "One-time", "Pay-per-use"];

const Step3 = ({ setFinalData }: { setFinalData: any }) => {
    const dispatch = useDispatch();
    const step3Data = useSelector((state: RootState) => state.onboarding.step3);
    const step1Data = useSelector((state: RootState) => state.onboarding.step1);
    const step2Data = useSelector((state: RootState) => state.onboarding.step2);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(step3Schema),
        defaultValues: step3Data,
    });

    const handleFile = async (file: File | null) => {
        if (!file) return;
        const id = crypto.randomUUID();
        await saveFile(id, file);
        dispatch(updateStep3({ finalDoc: { id, name: file.name, size: file.size, type: file.type } }));
    };

    const onSubmit = (data: any) => {
        const finalStep3 = {
            ...data,
            finalDoc: step3Data.finalDoc,
        };

        dispatch(updateStep3(finalStep3));

        const final = {
            step1: step1Data,
            step2: step2Data,
            step3: finalStep3,
        };

        setFinalData(final);

        dispatch(resetOnboarding());
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle>Services offered</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
                {services.map((service) => (
                    <label key={service}
                        className="flex items-center gap-2.5 px-3 py-2.5 border border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                        <input
                            type="checkbox"
                            value={service}
                            {...register("services")}
                            className="accent-indigo-600 w-3.5 h-3.5 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-700">{service}</span>
                    </label>
                ))}
            </div>
            {errors.services && <p className="text-xs text-red-500 mt-1">{errors.services.message}</p>}

            <SectionTitle>Pricing model</SectionTitle>
            <div className="grid grid-cols-3 gap-2">
                {pricingModels.map((item) => (
                    <label key={item}
                        className="flex items-center gap-2.5 px-3 py-2.5 border border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                        <input
                            type="radio"
                            value={item}
                            {...register("pricingModel")}
                            className="accent-indigo-600 w-3.5 h-3.5 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-700">{item}</span>
                    </label>
                ))}
            </div>
            {errors.pricingModel && <p className="text-xs text-red-500 mt-1">{errors.pricingModel.message}</p>}

            <SectionTitle>Billing currency</SectionTitle>
            <select {...register("currency")} className={`${inputClass} max-w-[200px]`}>
                <option value="">Select currency</option>
                <option value="INR">INR — Indian Rupee</option>
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
            </select>
            {errors.currency && <p className="text-xs text-red-500 mt-1">{errors.currency.message}</p>}

            <SectionTitle>Additional notes</SectionTitle>
            <textarea
                {...register("notes")}
                rows={3}
                className={inputClass}
                placeholder="Anything else you'd like us to know…"
                style={{ resize: "vertical" }}
            />

            <SectionTitle>Final document</SectionTitle>
            <FileUpload label="" onChange={handleFile} existingFile={step3Data.finalDoc} />

            <SectionTitle>Declaration</SectionTitle>
            <label className="flex items-start gap-3 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 cursor-pointer">
                <input
                    type="checkbox"
                    {...register("declaration")}
                    className="accent-indigo-600 w-4 h-4 mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-gray-600">
                    I confirm that the information provided is accurate and I agree to the{" "}
                    <a href="#" className="text-indigo-600 underline">terms & conditions</a>.
                </span>
            </label>
            {errors.declaration && <p className="text-xs text-red-500 mt-1">{errors.declaration.message}</p>}

            <div className="flex justify-between mt-6 pt-5 border-t border-gray-100">
                <button type="button" onClick={() => dispatch(setCurrentStep(2))}
                    className="px-5 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    ← Back
                </button>
                <button type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                    Submit application
                </button>
            </div>
        </form>
    );
};

export default Step3;