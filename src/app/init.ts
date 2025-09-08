import * as vscode from "vscode";
import { Injector } from "./helpers/injector";
import { environment } from "./environment";

export function init(context: vscode.ExtensionContext) {
	Injector.setContext(context);
	const storageService = Injector.getStorageService();
	storageService.initJsonFile(environment.featuresFilename, []);
	storageService.initJsonFile(environment.projectsFilename, {
		projects: [],
		currentProject: null,
	});
}
