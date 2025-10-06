export type Feature = {
	uuid: string;
	title: string;
	createdAt: string;
	updatedAt?: string;
	completed: boolean;
	projectUuid?: string;
};

export type FeatureFile = {
	features: Feature[];
};

export type FeatureData = Omit<Feature, "uuid">;

export enum FeatureActionType {
	LOAD_FEATURES_REQUEST = "load_features_request",
	LOAD_FEATURES_RESPONSE = "load_features_response",
	LOAD_FEATURES_ERROR = "load_features_error",

	ADD_FEATURE = "add_feature",
	UPDATE_FEATURE = "update_feature",
	DELETE_FEATURE = "delete_feature",
}
