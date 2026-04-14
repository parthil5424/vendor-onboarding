import { Input } from "@/components/ui/input"
import { FieldError } from "react-hook-form";
import { Label } from "./label";

interface Props {
    label: string;
    name: string;
    register: any;
    error?: FieldError;
    type?: string;
}

const FormInput = ({
    label,
    name,
    register,
    error,
    type = "text",
}: Props) => {
    return (
        <div className="space-y-1">
            <Label htmlFor={name} className="text-sm font-medium">
                {label}
            </Label>
            <Input id={name} type={type} {...register(name)} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500" />
            {error && (
                <p className="text-sm text-red-500">{error.message}</p>
            )}
        </div>
    );
};

export default FormInput;