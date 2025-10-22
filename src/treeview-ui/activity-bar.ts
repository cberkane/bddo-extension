import * as vscode from "vscode";

import { ActivityBarService } from "./activity-bar.service";

export class ActivityBarProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
	private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter();
	readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

	private activityBarService: ActivityBarService;

	constructor() {
		this.activityBarService = new ActivityBarService();
	}

	refreshTree(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
		const data = this.activityBarService.getTreeData();
		if (!element) {
			return data.map((item) => this.activityBarService.processFeatureItem(item));
		}

		const parent = data.find((i) => i.label === element.label);
		if (parent && parent.children) {
			return parent.children.map((child) => this.activityBarService.processScenarioItem(child));
		}
	}
}
