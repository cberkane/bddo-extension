import { FeatureActionType, type Feature } from "@extension/types/features.type";

export const addFeature = (data: Partial<Feature>) => {
	window.vscode.postMessage({
		command: FeatureActionType.ADD_FEATURE,
		data: { feature: { ...data } },
	});
};

export const updateFeature = (uuid: string, updatedFeature: Partial<Feature>) => {
	window.vscode.postMessage({
		command: FeatureActionType.UPDATE_FEATURE,
		data: { uuid, updatedFeature },
	});
};

export const deleteFeature = (uuid: string) => {
	window.vscode.postMessage({
		command: FeatureActionType.DELETE_FEATURE,
		data: { uuid },
	});
};
