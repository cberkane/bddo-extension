import { type Project, ProjectActionType  } from "@extension/types/project.type";

export const addProject = (project: Partial<Project>) => {
    window.vscode.postMessage({
        command: ProjectActionType.ADD_PROJECT,
        data: { project: { ...project } },
    });
}

export const updateProject = (uuid: string, updatedProject: Partial<Project>) => {
    window.vscode.postMessage({
        command: ProjectActionType.UPDATE_PROJECT,
        data: { uuid, updatedProject },
    });
}

export const deleteProject = (uuid: string) => {
    window.vscode.postMessage({
        command: ProjectActionType.DELETE_PROJECT,
        data: { uuid },
    });
}
