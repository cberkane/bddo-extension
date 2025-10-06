import * as vscode from "vscode";

import { initExtension } from "./app/init";
import { open } from "./app/comands/open";

export function activate(context: vscode.ExtensionContext) {
	initExtension(context);
	const disposable = vscode.commands.registerCommand("bddo.open", () => open(context));
	context.subscriptions.push(disposable);
}