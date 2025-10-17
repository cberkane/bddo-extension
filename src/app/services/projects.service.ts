import { v4 as uuid } from "uuid";
import * as vscode from "vscode";

import { StorageService } from "@app/services/storage.service";
import { ProjectFile, Project, ProjectData } from "@app/types/project.type";
import { Response } from "@app/types/response.type";

// Important: Projects are named "folders" in the user interface
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
			vscode.window.showErrorMessage("Failed to load folders");
			return {
				success: false,
				error: "Failed to load the folders",
			};
		}
	}

	addProject(data: ProjectData): Response<Project[]> {
		try {
			const file = this.readJsonData<ProjectFile>(this.fileName);
			const projectExists = file.projects.find((p) => p.name === data.name);
			if (projectExists) {
				vscode.window.showErrorMessage("Folder with the same name already exists");
				return {
					success: false,
					error: "Folder with the same name already exists",
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
			vscode.window.showErrorMessage("Failed to save folder");
			return {
				success: false,
				error: "Failed to save the new folder",
			};
		}
	}

	removeProject(uuid: string): Response<Project[]> {
		try {
			const file = this.readJsonData<ProjectFile>(this.fileName);
			const projects = file.projects.filter((p) => p.uuid !== uuid);
			file.projects = projects;
			this.saveJsonData<ProjectFile>(this.fileName, file);
			return {
				data: projects,
				success: true,
			};
		} catch (error) {
			vscode.window.showErrorMessage("Failed to remove folder");
			return {
				success: false,
				error: "Failed to remove the folder",
			};
		}
	}
}
