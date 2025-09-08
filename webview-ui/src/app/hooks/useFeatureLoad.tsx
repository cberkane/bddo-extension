import { useState, useEffect } from "react";

import { FeatureActionType, type Feature } from "@/app/types/feature";

const useFeatureLoad = () => {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        window.vscode.postMessage({ command: FeatureActionType.LOAD_FEATURES_REQUEST });
        const handleMessage = (event: MessageEvent) => {
            if (event.data.command === FeatureActionType.LOAD_FEATURES_RESPONSE)
                setFeatures(event.data.features);
            if (event.data.command === FeatureActionType.LOAD_FEATURES_ERROR)
                setError(event.data.error);
        }
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return { features, error };
};

export default useFeatureLoad;
