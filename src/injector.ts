import { ExtensionContext } from "vscode";

import { StorageService } from "./storage/storage.service";
import { WebviewUI } from "./webview-ui";
import { TaskStorageService } from "./storage/task-storage.service";

export class Injector {
	private static context: ExtensionContext;

	static setContext(context: ExtensionContext) {
		Injector.context = context;
	}

	private static webviewUI: WebviewUI;
	private static storageService: StorageService;
	private static taskStorageService: TaskStorageService;

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

	static getTaskStorageService(): TaskStorageService {
		if (!Injector.taskStorageService) {
			Injector.taskStorageService = new TaskStorageService(Injector.context);
		}
		return Injector.taskStorageService;
	}
}
