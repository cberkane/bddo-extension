import { useState, useEffect } from "react";

import { type Project, ProjectActionType } from "@/app/types/project";

const useProjectLoad = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        window.vscode.postMessage({ command: ProjectActionType.LOAD_PROJECTS_REQUEST });
        const handleMessage = (event: MessageEvent) => {
            if (event.data.command === ProjectActionType.LOAD_PROJECTS_RESPONSE)
                setProjects(event.data.projects);
            if (event.data.command === ProjectActionType.LOAD_PROJECTS_ERROR)
                setError(event.data.error);
        }
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return { projects, error };
}

export default useProjectLoad;