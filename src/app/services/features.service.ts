import { v4 as uuid } from "uuid";
import * as vscode from "vscode";

import { StorageService } from "@app/services/storage.service";
import { Feature, FeatureData, FeatureFile } from "@app/types/features.type";
import { Response } from "@app/types/response.type";

// Important: Features are named "tasks" in the user interface
export class FeaturesService extends StorageService {
	private fileName: string;

	constructor(context: vscode.ExtensionContext) {
		super(context);
		this.initFilename();
	}

	private initFilename(): void {
		const config = vscode.workspace.getConfiguration("bddo");
		const featuresFilename = config.get<string>("featuresFilename")!;
		this.fileName = featuresFilename;
	}

	loadFeatures(): Response<Feature[]> {
		try {
			const file = this.readJsonData<FeatureFile>(this.fileName);
			const features = file.features;
			return {
				success: true,
				data: features,
			};
		} catch (error) {
			vscode.window.showErrorMessage("An error occurred while retrieving tasks");
			return {
				success: false,
				error: "Failed to load the tasks",
			};
		}
	}

	saveFeature(data: FeatureData): Response<Feature[]> {
		try {
			const file = this.readJsonData<FeatureFile>(this.fileName);
			const features = file.features;
			const newFeature = { uuid: uuid(), ...data };
			
			file.features = [newFeature, ...features];
			this.saveJsonData(this.fileName, file);
			return {
				success: true,
				data: file.features,
			};
		} catch (error) {
			vscode.window.showErrorMessage("An error occurred while saving the task");
			return {
				success: false,
				error: "Failed to save the new task",
			};
		}
	}

	updateFeature(uuid: string, data: Partial<Feature>): Response<Feature[]> {
		try {
			const file = this.readJsonData<FeatureFile>(this.fileName);
			const index = file.features.findIndex((feature) => feature.uuid === uuid);
			if (index === -1) {
				return {
					success: false,
					error: `Task with uuid ${uuid} not found`,
				};
			}

			file.features[index] = { ...file.features[index], ...data };
			this.saveJsonData(this.fileName, file);
			return {
				success: true,
				data: file.features,
			};
		} catch (error) {
			vscode.window.showErrorMessage("Failed to update the task");
			return {
				success: false,
				error: "Failed to update the task",
			};
		}
	}

	deleteFeature(uuid: string): Response<Feature[]> {
		try {
			const file = this.readJsonData<FeatureFile>(this.fileName);
			const newFeatures = file.features.filter((feature) => feature.uuid !== uuid);
			file.features = newFeatures;
			this.saveJsonData<FeatureFile>(this.fileName, file);
			return {
				data: newFeatures,
				success: true,
			};
		} catch (error) {
			vscode.window.showErrorMessage("Failed to delete the task");
			return {
				success: false,
				error: "Failed to delete the task",
			};
		}
	}

	handleProjectDeletion(projectUuid: string): void {
		try {
			const file = this.readJsonData<FeatureFile>(this.fileName);
			file.features.forEach(f => {
				if (f.projectUuid === projectUuid) {
					f.projectUuid = "";
				}
			});
			this.saveJsonData<FeatureFile>(this.fileName, file);
		} catch (error) {
			vscode.window.showErrorMessage("Failed to update tasks after folder deletion");
			throw new Error("Failed to update tasks after folder deletion");
		}
	}
}
