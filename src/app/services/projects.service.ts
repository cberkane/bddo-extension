import { v4 as uuid } from "uuid";
import * as vscode from "vscode";

import { StorageService } from "@app/services/storage.service";
import { ProjectFile, Project, ProjectData } from "@app/types/project.type";
import { Response } from "@app/types/response.type";

export class ProjectsService extends StorageService {
	
	private fileName: string;

	constructor(context: vscode.ExtensionContext) {
		super(context);
		this.initFilename();
	}

	private initFilename(): void {
		const config = vscode.workspace.getConfiguration("bddo");
		const projectsFilename = config.get<string>("projectsFilename")!;
		this.fileName = projectsFilename;
	}

	getProjects(): Response<Project[]> {
		try {
			const file = this.readJsonData<ProjectFile>(this.fileName);
			return {
				data: file.projects,
				success: true,
			};
		} catch (error) {
			vscode.window.showErrorMessage("Failed to load projects");
			return {
				success: false,
				error: "Failed to load the projects",
			};
		}
	}

	addProject(data: ProjectData): Response<Project[]> {
		try {
			const file = this.readJsonData<ProjectFile>(this.fileName);
			const projectExists = file.projects.find((p) => p.name === data.name);
			if (projectExists) {
				vscode.window.showErrorMessage("Project with the same name already exists");
				return {
					success: false,
					error: "Project with the same name already exists",
				};
			}

			const created = { uuid: uuid(), ...data };
			const projects = [created, ...file.projects];
			file.projects = projects;
			this.saveJsonData<ProjectFile>(this.fileName, file);
			return {
				data: projects,
				success: true,
			};
		} catch (error) {
			vscode.window.showErrorMessage("Failed to save project");
			return {
				success: false,
				error: "Failed to save the new project",
			};
		}
	}

	removeProject(projectId: string): Response<Project[]> {
		try {
			const file = this.readJsonData<ProjectFile>(this.fileName);
			const projects = file.projects.filter((p) => p.uuid !== projectId);
			file.projects = projects;
			this.saveJsonData<ProjectFile>(this.fileName, file);
			return {
				data: projects,
				success: true,
			};
		} catch (error) {
			vscode.window.showErrorMessage("Failed to remove project");
			return {
				success: false,
				error: "Failed to remove the project",
			};
		}
	}
}
