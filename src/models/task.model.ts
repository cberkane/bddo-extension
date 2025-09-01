export type Task = {
    uuid: string;
    title: string;
    githubLink: string;
}

export enum TasksCommands {
    LOAD_TASKS = "load_tasks",
    LOAD_TASKS_SUCCESS = "load_tasks_success",
    LOAD_TASKS_ERROR = "load_tasks_error",
    ADD_TASK = "add_task",
    UPDATE_TASK = "update_task",
    DELETE_TASK = "delete_task",
}
