import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand("bddo.helloWorld", () => {
		const panel = vscode.window.createWebviewPanel(
			"BDD Todo", 
			"BDD Features", 
			vscode.ViewColumn.One, 
			{ enableScripts: true }
		);

		const htmlPath = path.join(context.extensionPath, "out", "webview", "index.html");
		const webviewRoot = vscode.Uri.file(path.join(context.extensionPath, "out", "webview"));
		const baseUri = panel.webview.asWebviewUri(webviewRoot);
		
		const html = fs.readFileSync(htmlPath, "utf8");
		panel.webview.html = html.replace(/"(\/assets\/[^"]+)"/g, (_, src) => `"${baseUri}${src}"`);;
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
