import { ExtensionContext } from "vscode";

import { StorageService } from "./services/storage.service";
import { WebviewUIService } from "./services/webview-ui.service";
import { FeaturesService } from "./services/features.service";
import { ProjectsService } from "./services/projects.service";
import { ScenariosService } from "./services/scenarios.service";

export class Inject {
	private static context: ExtensionContext;

	private static webviewUIService: WebviewUIService;
	private static storageService: StorageService;
	private static featuresService: FeaturesService;
	private static projectsService: ProjectsService;
	private static scenariosService: ScenariosService;

	static setContext(context: ExtensionContext): void {
		Inject.context = context;
	}

	static getWebviewUIService(): WebviewUIService {
		if (!Inject.webviewUIService) {
			Inject.webviewUIService = new WebviewUIService();
		}
		return Inject.webviewUIService;
	}

	static getStorageService(): StorageService {
		if (!Inject.storageService) {
			Inject.storageService = new StorageService(Inject.context);
		}
		return Inject.storageService;
	}

	static getFeaturesService(): FeaturesService {
		if (!Inject.featuresService) {
			Inject.featuresService = new FeaturesService(Inject.context);
		}
		return Inject.featuresService;
	}

	static getProjectsService(): ProjectsService {
		if (!Inject.projectsService) {
			Inject.projectsService = new ProjectsService(Inject.context);
		}
		return Inject.projectsService;
	}

	static getScenariosService(): ScenariosService {
		if (!Inject.scenariosService) {
			Inject.scenariosService = new ScenariosService(Inject.context);
		}
		return Inject.scenariosService;
	}
}
