import * as vscode from "vscode";

import { Injector } from "../helpers/injector";
import { FeatureStorageService } from "../storage/feature-storage.service";
import { Feature, FeatureActionType } from "../types/feature";
import { Message } from "../types/message";
import { Response } from "../types/response";
	
export class FeatureEventHandler {
	private panel: vscode.WebviewPanel;
	private featureStorageService: FeatureStorageService;

	constructor(panel: vscode.WebviewPanel) {
		this.panel = panel;
		this.featureStorageService = Injector.getFeatureStorageService();
	}

	handle(message: Message<any>) {
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
		const response = this.featureStorageService.loadFeatures();
		this.sendResponse(response);
	}

	private createFeature(feature: Omit<Feature, "uuid">): void {
		const response = this.featureStorageService.saveFeature(feature);
		this.sendResponse(response);
	}

	private updateFeature(uuid: string, updatedData: Partial<Feature>): void {
		const response = this.featureStorageService.updateFeature(uuid, updatedData);
		this.sendResponse(response);
	}

	private deleteFeature(uuid: string): void {
		const response = this.featureStorageService.deleteFeature(uuid);
		this.sendResponse(response);
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
