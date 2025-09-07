export type Feature = {
    uuid: string;
    title: string;
    createdAt: string;
    updatedAt?: string;
    completed: boolean;
    project?: string;
}

export enum FeatureState {
    LOAD_FEATURES_REQUEST = "load_features_request",
    LOAD_FEATURES_RESPONSE = "load_features_response",
    LOAD_FEATURES_ERROR = "load_features_error",

    ADD_FEATURE = "add_feature",
    UPDATE_FEATURE = "update_feature",
    DELETE_FEATURE = "delete_feature",
}
