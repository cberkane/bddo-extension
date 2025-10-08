import { type Scenario, ScenarioActionType  } from "@/app/types/scenario";

export const addScenario = (scenario: Partial<Scenario>) => {
    window.vscode.postMessage({
        command: ScenarioActionType.ADD_SCENARIO,
        data: { scenario },
    });
}

export const updateScenario = (uuid: string, updatedScenario: Partial<Scenario>) => {
    window.vscode.postMessage({
        command: ScenarioActionType.UPDATE_SCENARIO,
        data: { uuid, updatedScenario },
    });
}

export const deleteScenario = (uuid: string) => {
    window.vscode.postMessage({
        command: ScenarioActionType.DELETE_SCENARIO,
        data: { uuid },
    });
}
