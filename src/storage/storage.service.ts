import * as path from "path";
import * as vscode from "vscode";
import * as fs from "fs";

// TODO: refactor error messages
export class StorageService {
	private context: vscode.ExtensionContext;
	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}

	initJsonFile() {
		const storageDir = this.context.globalStorageUri.fsPath;
		const filePath = this.getStorageFilePath();

		if (!fs.existsSync(filePath)) {
			fs.mkdirSync(storageDir, { recursive: true });
			fs.writeFileSync(filePath, JSON.stringify([]), "utf8");
		}
	}

	// TODO: add fileName parameter
	protected getStorageFilePath(): string {
		const storageDir = this.context.globalStorageUri.fsPath;
		return path.join(storageDir, "bddo-data.json");
	}

	protected readJsonData<T>(): T | undefined {
		const filePath = this.getStorageFilePath();
		try {
			const data = fs.readFileSync(filePath, "utf8");
			return JSON.parse(data) as T;
		} catch (error) {
			vscode.window.showErrorMessage("");
		}
	}

	protected saveJsonData<T>(data: T): void {
		const filePath = this.getStorageFilePath();
		try {
			fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
		} catch (error) {
			console.error("Erreur lors de la sauvegarde du fichier JSON:", error);
		}
	}
}
