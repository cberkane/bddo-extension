export type Scenario = {
    uuid: string;
    featureUuid: string;
    type: ScenarioType;
    title: string;
    given: string;
    expected: string;
    completed: boolean;
}

export enum ScenarioType {
    HAPPY_PATH = "Happy Path",
    EDGE_CASE = "Edge Case",
    ERROR = "Error",
}

export type ScenarioFile = {
    scenarios: Scenario[];
}

export type ScenarioData = Omit<Scenario, "uuid">;

export enum ScenarioActionType {
	LOAD_SCENARIOS_REQUEST = "load_scenarios_request",
	LOAD_SCENARIOS_RESPONSE = "load_scenarios_response",
	LOAD_SCENARIOS_ERROR = "load_scenarios_error",

	ADD_SCENARIO = "add_scenario",
	UPDATE_SCENARIO = "update_scenario",
	DELETE_SCENARIO = "delete_scenario",
}
