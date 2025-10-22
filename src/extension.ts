import * as vscode from "vscode";

import { initExtension } from "./app/init";
import { open } from "./app/comands/open";
import { ActivityBarProvider } from "treeview-ui/activity-bar";

export function activate(context: vscode.ExtensionContext): void {
	initExtension(context);
	const disposable = vscode.commands.registerCommand("bddo.open", () => open(context));
	context.subscriptions.push(disposable);

	const activityBarProviderInstance = new ActivityBarProvider();
	const refreshTreeViewCommand = vscode.commands.registerCommand("bddo.refreshTreeView", () => activityBarProviderInstance.refreshTree());
	context.subscriptions.push(refreshTreeViewCommand);

	const activityBarProvider = vscode.window.registerTreeDataProvider("bddo-view", activityBarProviderInstance);
	context.subscriptions.push(activityBarProvider);
}