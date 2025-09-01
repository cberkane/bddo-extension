import * as vscode from "vscode";
import { Injector } from "./injector";

export function init(context: vscode.ExtensionContext) {
	Injector.setContext(context);
	const storageService = Injector.getStorageService();
	storageService.initJsonFile();
}