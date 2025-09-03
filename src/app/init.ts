import * as vscode from "vscode";
import { Injector } from "./helpers/injector";

export function init(context: vscode.ExtensionContext) {
	Injector.setContext(context);
	const storageService = Injector.getStorageService();
	storageService.initJsonFile();
}