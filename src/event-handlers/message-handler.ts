import * as vscode from "vscode";

import { Task, TasksCommands } from "../models/task.model";
import { TaskStorageService } from "../storage/task-storage.service";
import { Injector } from "../injector";


// Could be divided into multiple message handlers (e.g. TaskMessageHandler)
export class MessageHandler {
	private panel: vscode.WebviewPanel;
	private taskStorageService: TaskStorageService;

	constructor(panel: vscode.WebviewPanel) {
		this.panel = panel;
		this.taskStorageService = Injector.getTaskStorageService();
	}

	handle(message: any): void { // TODO: type messages better
		switch (message.command) {
			case TasksCommands.LOAD_TASKS:
				this.listTasks();
				break;
			case TasksCommands.ADD_TASK:
				this.createTask(message.data);
				break;

			case TasksCommands.UPDATE_TASK:
				this.updateTask(message.data.uuid, message.data.updatedData);
				break;
			case TasksCommands.DELETE_TASK:
				this.deleteTask(message.data);
				break;
		}
	}

	private listTasks(): void {
		const tasks = this.taskStorageService.loadTasks();
		const response = { command: TasksCommands.LOAD_TASKS_SUCCESS, data: tasks };
		this.panel.webview.postMessage(response);
	}

	private createTask(task: Task): void {
		const tasks = this.taskStorageService.saveTask(task);
		const response = { command: TasksCommands.LOAD_TASKS_SUCCESS, data: tasks };
		this.panel.webview.postMessage(response);
	}

	private updateTask(uuid: string, updatedData: Partial<Task>): void {
		const tasks = this.taskStorageService.updateTask(uuid, updatedData);
		const response = { command: TasksCommands.LOAD_TASKS_SUCCESS, data: tasks };
		this.panel.webview.postMessage(response);
	}

	private deleteTask(uuid: string): void {
		const tasks = this.taskStorageService.deleteTask(uuid);
		const response = { command: TasksCommands.LOAD_TASKS_SUCCESS, data: tasks };
		this.panel.webview.postMessage(response);
	}
}