import { useState, useEffect } from "react";
import { FeatureState, type Feature } from "../models/feature.model";

const useFeatureLoad = () => {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        window.vscode.postMessage({ command: FeatureState.LOAD_FEATURES_REQUEST });
        const handleMessage = (event: MessageEvent) => {
            if (event.data.command === FeatureState.LOAD_FEATURES_RESPONSE)
                setFeatures(event.data.features);
            if (event.data.command === FeatureState.LOAD_FEATURES_ERROR)
                setError(event.data.error);
        }
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return { features, error };
};

export default useFeatureLoad;
