import * as vscode from "vscode";

import { Inject } from "@app/inject";
import { FeaturesService } from "@app/services/features.service";
import { ScenariosService } from "@app/services/scenarios.service";
import { Feature } from "@app/types/features.type";
import { Scenario } from "@app/types/scenario.type";
import { ActivityBarItem } from "./activity-bar.type";

export class ActivityBarService {
	private featuresService: FeaturesService;
	private scenariosService: ScenariosService;

	constructor() {
		this.featuresService = Inject.getFeaturesService();
		this.scenariosService = Inject.getScenariosService();
	}

	private getFeatures(): Feature[] {
		const { data, success, error } = this.featuresService.loadFeatures();
		if (!success) {
			vscode.window.showErrorMessage(error!);
			return [];
		}
		return data;
	}

	private getScenarios(): Scenario[] {
		const { data, success, error } = this.scenariosService.loadScenarios();
		if (!success) {
			vscode.window.showErrorMessage(error!);
			return [];
		}
		return data;
	}

	getTreeData(): ActivityBarItem[] {
		const features = this.getFeatures();
		const scenarios = this.getScenarios();
		return features.map((f) => {
			const filteredScenarios = scenarios.filter((s) => s.featureUuid === f.uuid);
			return {
				label: f.title,
				children: filteredScenarios.map((s) => ({
					label: s.title,
					completed: s.completed,
				})),
			};
		});
	}

	processFeatureItem(item: ActivityBarItem): vscode.TreeItem {
		const treeItem = new vscode.TreeItem(item.label);
		treeItem.id = item.label;
		if (item.children.length > 0) {
			treeItem.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
		}
		treeItem.command = {
			command: "bddo.open",
			title: "Feature Clicked",
			arguments: [item.label],
		};
		return treeItem;
	}

	processScenarioItem(item: { label: string; completed: boolean }): vscode.TreeItem {
		const treeItem = new vscode.TreeItem(item.label, vscode.TreeItemCollapsibleState.None);
		treeItem.id = item.label;
		if (item.completed) {
			treeItem.iconPath = new vscode.ThemeIcon("check", new vscode.ThemeColor("charts.green"));
		} else {
			treeItem.iconPath = new vscode.ThemeIcon("circle-outline");
		}
		return treeItem;
	}
}
