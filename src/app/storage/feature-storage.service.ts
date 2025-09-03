import * as vscode from "vscode";
import { v4 as uuid } from "uuid";

import { StorageService } from "./storage.service";
import { Response } from "../types/response";
import { Feature } from "../types/feature";

export class FeatureStorageService extends StorageService {
	private fileName = "bddo-data.json";

	loadFeatures(): Response<Feature[]> {
		try {
			const features = this.readJsonData<Feature[]>(this.fileName) ?? [];
			return {
				data: features,
				success: true,
			};
		} catch (error) {
			vscode.window.showErrorMessage("Failed to load features");
			return {
				success: false,
				error: "Failed to load the features",
			};
		}
	}

	saveFeature(feature: Omit<Feature, "uuid">): Response<Feature[]> {
		try {
			const features = this.readJsonData<Feature[]>(this.fileName) ?? [];
			const newFeature = { uuid: uuid(), ...feature };
			const updatedFeatures = [newFeature, ...features];
			this.saveJsonData<Feature[]>(this.fileName, updatedFeatures);
			return {
				data: updatedFeatures,
				success: true,
			};
		} catch (error) {
			vscode.window.showErrorMessage("Failed to save feature");
			return {
				success: false,
				error: "Failed to save the new feature",
			};
		}
	}

	updateFeature(uuid: string, updatedData: Partial<Feature>): Response<Feature[]> {
		try {
			const features = this.readJsonData<Feature[]>(this.fileName) ?? [];
			const index = features.findIndex((feature) => feature.uuid === uuid);
			if (index !== -1) {
				features[index] = { ...features[index], ...updatedData };
				this.saveJsonData<Feature[]>(this.fileName, features);
				return {
					data: features,
					success: true,
				};
			}
			return {
				success: false,
				error: `Feature with uuid ${uuid} not found`,
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
			const features = this.readJsonData<Feature[]>(this.fileName);
			const newFeatures = features ? features.filter((feature) => feature.uuid !== uuid) : [];
			this.saveJsonData<Feature[]>(this.fileName, newFeatures);
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
