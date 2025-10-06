import { ExtensionContext } from "vscode";

import { StorageService } from "./services/storage.service";
import { WebviewUIService } from "./services/webview-ui.service";
import { FeaturesService } from "./services/features.service";
import { ProjectsService } from "./services/projects.service";

export class Injector {
	private static context: ExtensionContext;

	private static webviewUIService: WebviewUIService;
	private static storageService: StorageService;
	private static featuresService: FeaturesService;
	private static projectsService: ProjectsService;

	static setContext(context: ExtensionContext) {
		Injector.context = context;
	}

	static getWebviewUIService(): WebviewUIService {
		if (!Injector.webviewUIService) {
			Injector.webviewUIService = new WebviewUIService();
		}
		return Injector.webviewUIService;
	}

	static getStorageService(): StorageService {
		if (!Injector.storageService) {
			Injector.storageService = new StorageService(Injector.context);
		}
		return Injector.storageService;
	}

	static getFeaturesService(): FeaturesService {
		if (!Injector.featuresService) {
			Injector.featuresService = new FeaturesService(Injector.context);
		}
		return Injector.featuresService;
	}

	static getProjectsService(): ProjectsService {
		if (!Injector.projectsService) {
			Injector.projectsService = new ProjectsService(Injector.context);
		}
		return Injector.projectsService;
	}
}
