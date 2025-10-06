import * as vscode from "vscode";

import { Injector } from "@app/injector";

export function initExtension(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration("bddo");
	const featuresFilename = config.get<string>("featuresFilename")!;
	const projectsFilename = config.get<string>("projectsFilename")!;

	Injector.setContext(context);
	const storageService = Injector.getStorageService();
	storageService.initStorage(featuresFilename, {
		features: [],
	});
	storageService.initStorage(projectsFilename, {
		projects: [],
		currentProject: null,
	});
}
