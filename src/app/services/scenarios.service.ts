import { v4 as uuid } from "uuid";
import * as vscode from "vscode";

import { Scenario, ScenarioData, ScenarioFile } from "@app/types/scenario.type";
import { StorageService } from "./storage.service";
import { Response } from "@app/types/response.type";

export class ScenariosService extends StorageService {
	private fileName: string;

	constructor(context: vscode.ExtensionContext) {
		super(context);
		this.initFilename();
	}

	private initFilename(): void {
		const config = vscode.workspace.getConfiguration("bddo");
		const scenariosFilename = config.get<string>("scenariosFilename")!;
		this.fileName = scenariosFilename;
	}

	loadScenarios(): Response<Scenario[]> {
		try {
			const file = this.readJsonData<ScenarioFile>(this.fileName);
			const scenarios = file.scenarios;
			return {
				success: true,
				data: scenarios,
			};
		} catch (error) {
			vscode.window.showErrorMessage("An error occurred while retrieving scenarios");
			return {
				success: false,
				error: "Failed to load the scenarios.",
			};
		}
	}

	addScenario(scenario: ScenarioData): Response<Scenario[]> {
		try {
			const file = this.readJsonData<ScenarioFile>(this.fileName);
			const scenarios = file.scenarios;
			const newScenario = { uuid: uuid(), ...scenario };

			file.scenarios = [...scenarios, newScenario];
			this.saveJsonData(this.fileName, file);
			return {
				success: true,
				data: file.scenarios,
			};
		} catch (error) {
			vscode.window.showErrorMessage("An error occurred while saving the scenario");
			return {
				success: false,
				error: "Failed to save the new scenario.",
			};
		}
	}

	updateScenario(uuid: string, data: Partial<Scenario>): Response<Scenario[]> {
		try {
			const file = this.readJsonData<ScenarioFile>(this.fileName);
			const index = file.scenarios.findIndex((scenario) => scenario.uuid === uuid);
			if (index === -1) {
				return {
					success: false,
					error: `Scenario with uuid ${uuid} not found.`,
				};
			}

			file.scenarios[index] = { ...file.scenarios[index], ...data };
			this.saveJsonData(this.fileName, file);
			return {
				success: true,
				data: file.scenarios,
			};
		} catch (error) {
			vscode.window.showErrorMessage("Failed to update scenario");
			return {
				success: false,
				error: "Failed to update the scenario.",
			};
		}
	}

	deleteScenario(uuid: string): Response<Scenario[]> {
		try {
			const file = this.readJsonData<ScenarioFile>(this.fileName);
			const newScenarios = file.scenarios.filter((scenario) => scenario.uuid !== uuid);
			file.scenarios = newScenarios;
			this.saveJsonData<ScenarioFile>(this.fileName, file);
			return {
				data: newScenarios,
				success: true,
			};
		} catch (error) {
			vscode.window.showErrorMessage("Failed to delete scenario");
			return {
				success: false,
				error: "Failed to delete the scenario.",
			};
		}
	}

	handleFeatureDeletion(uuid: string): void {
		try {
			const file = this.readJsonData<ScenarioFile>(this.fileName);
			const updatedScenarios = file.scenarios.filter(s => s.featureUuid !== uuid);
			file.scenarios = updatedScenarios;
			this.saveJsonData<ScenarioFile>(this.fileName, file);
		} catch (error) {
			vscode.window.showErrorMessage("Failed to handle task deletion");
			throw new Error("Failed to delete scenarios after task deletion");
		}
	}
}
