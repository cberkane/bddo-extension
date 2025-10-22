import { useState, useEffect } from "react";

import { type Scenario, ScenarioActionType } from "@extension/types/scenario.type";

const useScenarioLoad = () => {
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        window.vscode.postMessage({ command: ScenarioActionType.LOAD_SCENARIOS_REQUEST });
        const handleMessage = (event: MessageEvent) => {
            if (event.data.command === ScenarioActionType.LOAD_SCENARIOS_RESPONSE)
                setScenarios(event.data.scenarios);
            if (event.data.command === ScenarioActionType.LOAD_SCENARIOS_ERROR)
                setError(event.data.error);
            setLoading(false);
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return { scenarios, loading, error };
}

export default useScenarioLoad;