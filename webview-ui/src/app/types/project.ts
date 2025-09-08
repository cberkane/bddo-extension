export type Project = {
	uuid: string;
	name: string;
	createdAt: Date;
};

export type ProjectFile = {
	projects: Project[];
	currentProject: string | null;
};

export enum ProjectActionType {
	LOAD_PROJECTS_REQUEST = "load_projects_request",
	LOAD_PROJECTS_RESPONSE = "load_projects_response",
	LOAD_PROJECTS_ERROR = "load_projects_error",

	ADD_PROJECT = "add_project",
	UPDATE_PROJECT = "update_project",
	DELETE_PROJECT = "delete_project",
}
