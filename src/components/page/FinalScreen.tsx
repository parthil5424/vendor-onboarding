import { useEffect } from "react";

interface Props {
    data: any;
    onRestart: () => void;
}

const FinalScreen = ({ data, onRestart }: Props) => {
    useEffect(() => {
        if (!data) {
            onRestart();
        }
    }, [data, onRestart]);

    if (!data) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-bold mb-4 text-green-600">
                    Submission Successful
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                    Here is your submitted data:
                </p>

                <div className="bg-gray-100 p-4 rounded max-h-[400px] overflow-auto text-sm">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onRestart}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Start Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinalScreen;