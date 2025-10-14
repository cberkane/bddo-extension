import * as vscode from "vscode";

import { Inject } from "@app/inject";
import { Message } from "@app/types/message.type";
import { Scenario, ScenarioActionType, ScenarioData } from "@app/types/scenario.type";
import { ScenariosService } from "@app/services/scenarios.service";
import { Response } from "@app/types/response.type";

export class ScenariosController {
	private panel: vscode.WebviewPanel;
	private scenariosService: ScenariosService;

	constructor(panel: vscode.WebviewPanel) {
		this.panel = panel;
		this.scenariosService = Inject.getScenariosService();
	}

	handle(message: Message<any>): void {
		switch (message.command) {
			case ScenarioActionType.LOAD_SCENARIOS_REQUEST:
				this.listScenarios();
				break;
			case ScenarioActionType.ADD_SCENARIO:
				this.createScenario(message.data.scenario);
				break;
			case ScenarioActionType.UPDATE_SCENARIO:
				this.updateScenario(message.data.uuid, message.data.updatedScenario);
				break;
			case ScenarioActionType.DELETE_SCENARIO:
				this.deleteScenario(message.data.uuid);
				break;
		}
	}

	private listScenarios(): void {
		const response = this.scenariosService.loadScenarios();
		this.sendResponse(response);
	}

	private createScenario(scenario: ScenarioData): void {
		const response = this.scenariosService.addScenario(scenario);
		this.sendResponse(response);
	}

	private updateScenario(uuid: string, updatedScenario: Partial<Scenario>): void {
		const response = this.scenariosService.updateScenario(uuid, updatedScenario);
		this.sendResponse(response);
	}

	private deleteScenario(uuid: string): void {
		const response = this.scenariosService.deleteScenario(uuid);
		this.sendResponse(response);
	}

	private sendResponse(response: Response<Scenario[]>): void {
		const { data, success, error } = response;
		if (success) {
			const message = { 
				command: ScenarioActionType.LOAD_SCENARIOS_RESPONSE, 
				scenarios: data 
			};
			this.panel.webview.postMessage(message);
		} else {
			const message = { 
				command: ScenarioActionType.LOAD_SCENARIOS_ERROR, 
				error: error
			};
			this.panel.webview.postMessage(message);
		}
	}
}
