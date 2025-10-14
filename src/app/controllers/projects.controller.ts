import * as vscode from "vscode";

import { Inject } from "@app/inject";
import { ProjectsService } from "@app/services/projects.service";
import { Message } from "@app/types/message.type";
import { Project, ProjectActionType } from "@app/types/project.type";
import { Response } from "@app/types/response.type";

export class ProjectsController {
	private panel: vscode.WebviewPanel;
	private projectsService: ProjectsService;

	constructor(panel: vscode.WebviewPanel) {
		this.panel = panel;
		this.projectsService = Inject.getProjectsService();
	}

    handle(message: Message<any>): void {
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
		const response = this.projectsService.getProjects();
		this.sendResponse(response);
	}

    private createProject(project: Omit<Project, "uuid">): void {
        const response = this.projectsService.addProject(project);
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
