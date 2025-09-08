import { v4 as uuid } from "uuid";
import * as vscode from "vscode";

import { StorageService } from "./storage.service";
import { environment } from "../environment";
import { Project } from "../types/project";
import { Response } from "../types/response";
import { ProjectFile } from "../types/project";

export class ProjectStorageService extends StorageService {
	private fileName = environment.projectsFilename;

	loadProjects(): Response<Project[]> {
		try {
			const file = this.readJsonData<ProjectFile>(this.fileName);
			return {
				data: file.projects ?? [],
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

	saveProject(project: Omit<Project, "uuid">): Response<Project[]> {
		try {
			const addedProject = {
				...project,
				uuid: uuid(),
			};
			const file = this.readJsonData<ProjectFile>(this.fileName);
			const projects = [addedProject, ...file.projects];
			const updatedFile: ProjectFile = { ...file, projects };
			this.saveJsonData<ProjectFile>(this.fileName, updatedFile);
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

	updateProject(uuid: string, updatedProject: Project): Response<Project[]> {
		try {
			const file = this.readJsonData<ProjectFile>(this.fileName);
			const index = file.projects.findIndex((p) => p.uuid === uuid);
			if (index !== -1) {
				file.projects[index] = { ...file.projects[index], ...updatedProject };
				const updatedFile: ProjectFile = { ...file };
				this.saveJsonData<ProjectFile>(this.fileName, updatedFile);
				return {
					data: updatedFile.projects,
					success: true,
				};
			}
			return {
				success: false,
				error: "Project not found",
			};
		} catch (error) {
			vscode.window.showErrorMessage("Failed to update project");
			return {
				success: false,
				error: "Failed to update the project",
			};
		}
	}

	loadCurrentProject(): Response<Project | null> {
		try {
			const file = this.readJsonData<ProjectFile>(this.fileName);
			const currentProject =
				file?.projects.find((project) => project.uuid === file.currentProject) || null;
			return {
				data: currentProject,
				success: true,
			};
		} catch (error) {
			vscode.window.showErrorMessage("Failed to load current project");
			return {
				success: false,
				error: "Failed to load the current project",
			};
		}
	}
}
