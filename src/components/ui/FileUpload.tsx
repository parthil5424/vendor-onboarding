import { useEffect, useState } from "react";
import { getFile } from "@/services/indexedDB";
interface Props {
    label: string;
    onChange: (file: File | null) => void;
    existingFile?: {
        id: string;
        name: string;
    } | null;
}

const FileUpload = ({ label, onChange, existingFile }: Props) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            onChange(null);
            return;
        }

        setFileName(file.name);

        // create preview (only for images)
        if (file.type.startsWith("image/")) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        } else {
            setPreview(null);
        }

        onChange(file);
    };

    useEffect(() => {
        const loadFile = async () => {
            if (!existingFile?.id) return;

            const file = await getFile(existingFile.id);

            if (file) {
                setFileName(file.name);
                if (file.type.startsWith("image/")) {
                    const url = URL.createObjectURL(file);
                    setPreview(url);
                }
            }
        };

        loadFile();
    }, [existingFile]);

    // cleanup memory
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);




    return (
        <div className="space-y-2">
            <label className="font-medium">{label}</label>

            <input
                type="file"
                onChange={handleFileChange}
                className="w-full border rounded px-3 py-2"
            />

            {fileName && (
                <p className="text-sm text-gray-600">
                    Selected: {fileName}
                </p>
            )}

            {preview && (
                <img
                    src={preview}
                    alt="preview"
                    className="w-32 h-32 object-cover rounded border"
                />
            )}
        </div>
    );
};

export default FileUpload;