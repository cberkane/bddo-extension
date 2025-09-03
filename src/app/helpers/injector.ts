import { ExtensionContext } from "vscode";

import { StorageService } from "../storage/storage.service";
import { WebviewUI } from "../webview-ui";
import { FeatureStorageService } from "../storage/feature-storage.service";

export class Injector {
	private static context: ExtensionContext;

	private static webviewUI: WebviewUI;
	private static storageService: StorageService;
	private static featureStorageService: FeatureStorageService;

	static setContext(context: ExtensionContext) {
		Injector.context = context;
	}

	static getWebviewUI(): WebviewUI {
		if (!Injector.webviewUI) {
			Injector.webviewUI = new WebviewUI();
		}
		return Injector.webviewUI;
	}

	static getStorageService(): StorageService {
		if (!Injector.storageService) {
			Injector.storageService = new StorageService(Injector.context);
		}
		return Injector.storageService;
	}

	static getFeatureStorageService(): FeatureStorageService {
		if (!Injector.featureStorageService) {
			Injector.featureStorageService = new FeatureStorageService(Injector.context);
		}
		return Injector.featureStorageService;
	}
}
