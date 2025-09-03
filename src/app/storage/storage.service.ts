import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

import { environment } from "../environment";

export class StorageService {
	private context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}

	initJsonFile(): void {
		const storageDir = this.context.globalStorageUri.fsPath;
		const filePath = this.getStorageFilePath(environment.mainFileName); 

		if (!fs.existsSync(filePath)) {
			const structure = JSON.stringify([], null, 2);
			fs.mkdirSync(storageDir, { recursive: true });
			fs.writeFileSync(filePath, structure, "utf8");
		}
	}

	private getStorageFilePath(fileName: string): string {
		const storageDir = this.context.globalStorageUri.fsPath;
		return path.join(storageDir, fileName);
	}

	protected readJsonData<T>(fileName: string): T | undefined {
		try {
			const filePath = this.getStorageFilePath(fileName);
			const data = fs.readFileSync(filePath, "utf8");
			return JSON.parse(data) as T;
		} catch (error) {
			vscode.window.showErrorMessage("Error reading JSON data");
		}
	}

	protected saveJsonData<T>(fileName: string, data: T): void {
		try {
			const filePath = this.getStorageFilePath(fileName);
			fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
		} catch (error) {
			vscode.window.showErrorMessage("Error saving JSON data");
		}
	}
}
