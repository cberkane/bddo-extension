import { FeatureState, type Feature } from "../models/feature.model";

export const addFeature = (data: Partial<Feature>) => {
	window.vscode.postMessage({
		command: FeatureState.ADD_FEATURE,
		data: { feature: { ...data } },
	});
};

export const updateFeature = (uuid: string, updatedFeature: Partial<Feature>) => {
	window.vscode.postMessage({
		command: FeatureState.UPDATE_FEATURE,
		data: { uuid, updatedFeature },
	});
};

export const deleteFeature = (uuid: string) => {
	window.vscode.postMessage({
		command: FeatureState.DELETE_FEATURE,
		data: { uuid },
	});
};
