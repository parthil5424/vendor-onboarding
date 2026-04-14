import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { updateStep2, setCurrentStep } from "@/redux/onboardingSlice";
import FileUpload from "../ui/FileUpload";
import { saveFile } from "@/services/indexedDB";
import { step2Schema } from "@/schema/step2";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-3 mt-6 first:mt-0 pb-2 border-b border-gray-100">
        {children}
    </p>
);

const Field = ({ label, error, className, children }: { label: string; error?: any; className?: string; children: React.ReactNode }) => (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
        <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">{label}</label>
        {children}
        {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
);

const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-300";

const Step2 = () => {
    const dispatch = useDispatch();
    const step2Data = useSelector((state: RootState) => state.onboarding.step2);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(step2Schema),
        defaultValues: step2Data,
    });

    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [filteredStates, setFilteredStates] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const [countryRes, stateRes] = await Promise.all([
                fetch("/mocks/countries.json"),
                fetch("/mocks/states.json"),
            ]);
            setCountries(await countryRes.json());
            setStates(await stateRes.json());
        };
        fetchData();
    }, []);

    const selectedCountry = watch("country");

    useEffect(() => {
        setFilteredStates(
            selectedCountry ? states.filter((s) => s.countryCode === selectedCountry) : []
        );
    }, [selectedCountry, states]);

    const handleFile = async (file: File | null) => {
        if (!file) return;
        const id = crypto.randomUUID();
        await saveFile(id, file);
        dispatch(updateStep2({ bankProof: { id, name: file.name, size: file.size, type: file.type } }));
    };

    const onSubmit = (data: any) => {
        dispatch(updateStep2({ ...data, bankProof: step2Data.bankProof }));
        dispatch(setCurrentStep(3));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle>Business address</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
                <Field label="Street address" error={errors.address} className="col-span-2">
                    <input {...register("address")} className={inputClass} placeholder="Building, street, area" />
                </Field>

                <Field label="Country" error={errors.country}>
                    <select {...register("country")} className={inputClass}>
                        <option value="">Select country</option>
                        {countries.map((c) => (
                            <option key={c.code} value={c.code}>{c.name}</option>
                        ))}
                    </select>
                </Field>

                <Field label="State / Province" error={errors.state}>
                    <select {...register("state")} disabled={!selectedCountry} className={inputClass}>
                        <option value="">{selectedCountry ? "Select state" : "Select country first"}</option>
                        {filteredStates.map((s) => (
                            <option key={s.code} value={s.code}>{s.name}</option>
                        ))}
                    </select>
                </Field>

                <Field label="ZIP / PIN code" error={errors.zipCode}>
                    <input
                        {...register("zipCode", { valueAsNumber: true })}
                        type="number"
                        className={inputClass}
                        placeholder="380001"
                    />
                </Field>
            </div>

            <SectionTitle>Bank details</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
                <Field label="Bank name" error={errors.bankName}>
                    <input {...register("bankName")} className={inputClass} placeholder="e.g. HDFC Bank" />
                </Field>

                <Field label="IFSC code" error={errors.ifsc}>
                    <input {...register("ifsc")} className={inputClass} placeholder="HDFC0001234" />
                </Field>

                <Field label="Account number" error={errors.accountNumber} className="col-span-2">
                    <input {...register("accountNumber")} className={inputClass} placeholder="Enter account number" />
                </Field>
            </div>

            <SectionTitle>Bank proof document</SectionTitle>
            <FileUpload label="" onChange={handleFile} existingFile={step2Data.bankProof} />

            <div className="flex justify-between mt-6 pt-5 border-t border-gray-100">
                <button type="button" onClick={() => dispatch(setCurrentStep(1))}
                    className="px-5 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    ← Back
                </button>
                <button type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                    Continue →
                </button>
            </div>
        </form>
    );
};

export default Step2;