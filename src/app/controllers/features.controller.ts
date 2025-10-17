import * as vscode from "vscode";

import { Inject } from "@app/inject";
import { FeaturesService } from "@app/services/features.service";
import { Feature, FeatureActionType } from "@app/types/features.type";
import { Message } from "@app/types/message.type";
import { Response } from "@app/types/response.type";
import { ScenariosService } from "@app/services/scenarios.service";

export class FeaturesController {
	private panel: vscode.WebviewPanel;
	private featuresService: FeaturesService;
	private scenariosService: ScenariosService;

	constructor(panel: vscode.WebviewPanel) {
		this.panel = panel;
		this.featuresService = Inject.getFeaturesService();
		this.scenariosService = Inject.getScenariosService();
	}

	handle(message: Message<any>): void {
		switch (message.command) {
			case FeatureActionType.LOAD_FEATURES_REQUEST:
				this.listFeatures();
				break;
			case FeatureActionType.ADD_FEATURE:
				this.createFeature(message.data.feature);
				break;
			case FeatureActionType.UPDATE_FEATURE:
				this.updateFeature(message.data.uuid, message.data.updatedFeature);
				break;
			case FeatureActionType.DELETE_FEATURE:
				this.deleteFeature(message.data.uuid);
				break;
		}
	}

	private listFeatures(): void {
		const response = this.featuresService.loadFeatures();
		this.sendResponse(response);
	}

	private createFeature(feature: Omit<Feature, "uuid">): void {
		const response = this.featuresService.saveFeature(feature);
		this.sendResponse(response);
	}

	private updateFeature(uuid: string, updatedData: Partial<Feature>): void {
		const response = this.featuresService.updateFeature(uuid, updatedData);
		this.sendResponse(response);
	}

	private deleteFeature(uuid: string): void {
		try {
			const response = this.featuresService.deleteFeature(uuid);
			this.scenariosService.handleFeatureDeletion(uuid);
			this.sendResponse(response);
		} catch (error) {
			if (error instanceof Error) {
				this.sendResponse({
					success: false,
					error: error.message,
				});
			}
		}
	}

	private sendResponse(response: Response<Feature[]>): void {
		const { data, success, error } = response;
		if (success) {
			const message = { command: FeatureActionType.LOAD_FEATURES_RESPONSE, features: data };
			this.panel.webview.postMessage(message);
		} else {
			const message = { command: FeatureActionType.LOAD_FEATURES_ERROR, error: error };
			this.panel.webview.postMessage(message);
		}
	}
}
