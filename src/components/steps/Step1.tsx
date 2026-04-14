import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { updateStep1, setCurrentStep } from "@/redux/onboardingSlice";
import { useEffect, useState } from "react";
import FileUpload from "../ui/FileUpload";
import { step1Schema } from "@/schema/step1";
import { saveFile } from "@/services/indexedDB";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-3 mt-6 first:mt-0 pb-2 border-b border-gray-100">
        {children}
    </p>
);

const Field = ({ label, error, children }: { label: string; error?: any; children: React.ReactNode }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">{label}</label>
        {children}
        {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
);

const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-300";

const Step1 = () => {
    const dispatch = useDispatch();
    const step1Data = useSelector((state: RootState) => state.onboarding.step1);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(step1Schema),
        defaultValues: step1Data,
    });

    const [companyTypes, setCompanyTypes] = useState<{ label: string; value: string }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTypes = async () => {
            setLoading(true);
            try {
                const res = await fetch("/mocks/companyTypes.json");
                const data = await res.json();
                setCompanyTypes(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTypes();
    }, []);

    const handleFile = async (file: File | null) => {
        if (!file) return;
        const id = crypto.randomUUID();
        await saveFile(id, file);
        dispatch(updateStep1({ companyLogo: { id, name: file.name, size: file.size, type: file.type } }));
    };

    const onSubmit = (data: any) => {
        dispatch(updateStep1({ ...data, companyLogo: step1Data.companyLogo }));
        dispatch(setCurrentStep(2));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <SectionTitle>Company details</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
                <Field label="Company name" error={errors.companyName}>
                    <input {...register("companyName")} className={inputClass} placeholder="Acme Corp" />
                </Field>

                <Field label="Company type" error={errors.companyType}>
                    {loading ? (
                        <div className="h-9 bg-gray-100 rounded-lg animate-pulse" />
                    ) : (
                        <select {...register("companyType")} className={inputClass}>
                            <option value="">Select type</option>
                            {companyTypes.map((t) => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                    )}
                </Field>

                <Field label="Registration number" error={errors.registrationNumber}>
                    <input {...register("registrationNumber")} className={inputClass} placeholder="CIN / Reg. no." />
                </Field>

                <Field label="Established date" error={errors.establishedDate}>
                    <input {...register("establishedDate")} type="date" className={inputClass} />
                </Field>

                <Field label="Employee count" error={errors.employeeCount}>
                    <input
                        {...register("employeeCount", { valueAsNumber: true })}
                        type="number"
                        className={inputClass}
                        placeholder="e.g. 50"
                    />
                </Field>
            </div>

            <SectionTitle>Primary contact</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
                <Field label="Contact name" error={errors.contactName}>
                    <input {...register("contactName")} className={`${inputClass} col-span-2`} placeholder="Full name" />
                </Field>

                <Field label="Email address" error={errors.contactEmail}>
                    <input {...register("contactEmail")} type="email" className={inputClass} placeholder="name@company.com" />
                </Field>

                <Field label="Phone number" error={errors.contactPhone}>
                    <input {...register("contactPhone")} className={inputClass} placeholder="+91 98765 43210" />
                </Field>
            </div>

            <SectionTitle>Company logo</SectionTitle>
            <FileUpload label="" onChange={handleFile} existingFile={step1Data.companyLogo} />

            <div className="flex justify-end mt-6 pt-5 border-t border-gray-100">
                <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                    Continue →
                </button>
            </div>
        </form>
    );
};

export default Step1;