import * as vscode from "vscode";

import { Injector } from "../helpers/injector";
import { ProjectStorageService } from "../storage/project-storage.service";
import { Message } from "../types/message";
import { Project, ProjectActionType } from "../types/project";
import { Response } from "../types/response";

export class ProjectEventHandler {
	private panel: vscode.WebviewPanel;
	private projectStorageService: ProjectStorageService;

	constructor(panel: vscode.WebviewPanel) {
		this.panel = panel;
		this.projectStorageService = Injector.getProjectStorageService();
	}

    handle(message: Message<any>) {
        switch (message.command) {
            case ProjectActionType.LOAD_PROJECTS_REQUEST:
                this.listProjects();
                break;
            case ProjectActionType.ADD_PROJECT:
                this.createProject(message.data.project);
                break;
        }
    }

	private listProjects(): void {
		const response = this.projectStorageService.getProjects();
		this.sendResponse(response);
	}

    private createProject(project: Omit<Project, "uuid">): void {
        const response = this.projectStorageService.saveProject(project);
        this.sendResponse(response);
    }

	private sendResponse(response: Response<Project[]>): void {
		const { data, success, error } = response;
		if (success) {
			const message = { command: ProjectActionType.LOAD_PROJECTS_RESPONSE, projects: data };
			this.panel.webview.postMessage(message);
		} else {
			const message = { command: ProjectActionType.LOAD_PROJECTS_ERROR, error: error };
			this.panel.webview.postMessage(message);
		}
	}
}
