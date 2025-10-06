import { v4 as uuid } from "uuid";
import * as vscode from "vscode";

import { StorageService } from "@app/services/storage.service";
import { Feature, FeatureData, FeatureFile } from "@app/types/features.type";
import { Response } from "@app/types/response.type";

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
			vscode.window.showErrorMessage("An error occurred while retrieving features");
			return {
				success: false,
				error: "Failed to load the features",
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
			vscode.window.showErrorMessage("An error occurred while saving the feature");
			return {
				success: false,
				error: "Failed to save the new feature",
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
					error: `Feature with uuid ${uuid} not found`,
				};
			}

			file.features[index] = { ...file.features[index], ...data };
			this.saveJsonData(this.fileName, file);
			return {
				success: true,
				data: file.features,
			};
		} catch (error) {
			vscode.window.showErrorMessage("Failed to update feature");
			return {
				success: false,
				error: "Failed to update the feature",
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
			vscode.window.showErrorMessage("Failed to delete feature");
			return {
				success: false,
				error: "Failed to delete the feature",
			};
		}
	}
}
