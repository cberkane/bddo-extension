import { useState, useEffect } from "react";

import { type Scenario, ScenarioActionType } from "@/app/types/scenario";

const useScenarioLoad = () => {
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        window.vscode.postMessage({ command: ScenarioActionType.LOAD_SCENARIOS_REQUEST });
        const handleMessage = (event: MessageEvent) => {
            if (event.data.command === ScenarioActionType.LOAD_SCENARIOS_RESPONSE)
                setScenarios(event.data.scenarios);
            if (event.data.command === ScenarioActionType.LOAD_SCENARIOS_ERROR)
                setError(event.data.error);
        }
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return { scenarios, error };
}

export default useScenarioLoad;