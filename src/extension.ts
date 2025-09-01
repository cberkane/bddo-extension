import * as vscode from "vscode";

import { openCommand } from "./comands/open-command";
import { init } from "./init";

export function activate(context: vscode.ExtensionContext) {
	init(context);
	
	const disposable = vscode.commands.registerCommand("bddo.open", () =>
		openCommand(context)
	);
	context.subscriptions.push(disposable);
}

export function deactivate() {}
