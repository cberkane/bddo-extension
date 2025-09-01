import * as vscode from "vscode";
import { v4 as uuid } from "uuid";

import { StorageService } from "./storage.service";
import { Task } from "../models/task.model";

export class TaskStorageService extends StorageService {
	loadTasks(): Task[] {
		try {
			const tasks = this.readJsonData<Task[]>();
			return tasks ?? [];
		} catch (error) {
			vscode.window.showErrorMessage("Failed to load tasks");
		}
		return [];
	}

	saveTask(task: Task): Task[] {
		try {
			task.uuid = uuid();
			const tasks = this.readJsonData<Task[]>();
			const newTasks = tasks ? [task, ...tasks] : [task];
			this.saveJsonData<Task[]>(newTasks);
			return newTasks;
		} catch (error) {
			vscode.window.showErrorMessage("Failed to save task");
		}
		return [];
	}

	updateTask(uuid: string, updatedData: Partial<Task>): Task[] {
		const tasks = this.readJsonData<Task[]>() ?? [];
		const taskIndex = tasks.findIndex((task) => task.uuid === uuid);
		if (taskIndex !== -1) {
			tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };
			this.saveJsonData<Task[]>(tasks);
			return tasks;
		}
		return [];
	}

	deleteTask(uuid: string): Task[] {
		try {
			const tasks = this.readJsonData<Task[]>();
			const newTasks = tasks ? tasks.filter((task) => task.uuid !== uuid) : [];
			this.saveJsonData<Task[]>(newTasks);
			return newTasks;
		} catch (error) {
			vscode.window.showErrorMessage("Failed to delete task");
		}
		return [];
	}
}
