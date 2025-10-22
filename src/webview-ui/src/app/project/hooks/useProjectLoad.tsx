import { useState, useEffect } from "react";

import { type Project, ProjectActionType } from "@extension/types/project.type";

const useProjectLoad = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        window.vscode.postMessage({ command: ProjectActionType.LOAD_PROJECTS_REQUEST });
        const handleMessage = (event: MessageEvent) => {
            if (event.data.command === ProjectActionType.LOAD_PROJECTS_RESPONSE)
                setProjects(event.data.projects);
            if (event.data.command === ProjectActionType.LOAD_PROJECTS_ERROR)
                setError(event.data.error);
            setLoading(false);
        };
        
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return { projects, loading, error };
}

export default useProjectLoad;