import * as vscode from "vscode";

import { Inject } from "@app/inject";

export function initExtension(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration("bddo");
	const featuresFilename = config.get<string>("featuresFilename")!;
	const projectsFilename = config.get<string>("projectsFilename")!;

	Inject.setContext(context);
	const storageService = Inject.getStorageService();
	storageService.initStorage(featuresFilename, {
		features: [],
	});
	storageService.initStorage(projectsFilename, {
		projects: [],
		currentProject: null,
	});
}
