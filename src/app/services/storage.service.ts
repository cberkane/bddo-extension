import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export class StorageService {
	private context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}

	initStorage<T>(fileName: string, fileStructure: T): void {
		const storageDir = this.context.globalStorageUri.fsPath;
		const filePath = this.getStorageFilePath(fileName);

		if (!fs.existsSync(filePath)) {
			const structure = JSON.stringify(fileStructure, null, 2);
			fs.mkdirSync(storageDir, { recursive: true });
			fs.writeFileSync(filePath, structure, "utf8");
		}
	}

	private getStorageFilePath(fileName: string): string {
		const base = this.context.storageUri ?? this.context.globalStorageUri;
		return path.join(base.fsPath, fileName);
	}

	protected readJsonData<T>(fileName: string): T {
		try {
			const filePath = this.getStorageFilePath(fileName);
			const data = fs.readFileSync(filePath, "utf8");
			return JSON.parse(data) as T;
		} catch (error) {
			throw new Error("Error reading local data");
		}
	}

	protected saveJsonData<T>(fileName: string, data: T): void {
		try {
			const oldFile = this.readJsonData<T>(fileName);
			const newFile = { ...oldFile, ...data };

			const filePath = this.getStorageFilePath(fileName);
			fs.writeFileSync(filePath, JSON.stringify(newFile, null, 2), "utf8");
		} catch (error) {
			throw new Error("Error saving local data");
		}
	}
}
