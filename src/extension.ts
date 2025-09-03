import * as vscode from "vscode";

import { openCommand } from "./app/comands/open-command";
import { init } from "./app/init";

export function activate(context: vscode.ExtensionContext) {
	init(context);
	const disposable = vscode.commands.registerCommand("bddo.open", () => openCommand(context));
	context.subscriptions.push(disposable);
}

export function deactivate() {
	// Implement me...
}
