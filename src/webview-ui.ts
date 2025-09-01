import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export class WebviewUI {
	panel: vscode.WebviewPanel | undefined;

	/**
	 * Get the HTML entry file for the webview.
	 */
	private getHtmlEntryFile(
		context: vscode.ExtensionContext,
		webview: vscode.Webview
	): string {
		const htmlPath = path.join(context.extensionPath, "out", "webview", "index.html");
		console.log("htmlPath", htmlPath);
		
		const webviewRoot = vscode.Uri.file(
			path.join(context.extensionPath, "out", "webview")
		);
		const baseUri = webview.asWebviewUri(webviewRoot);

		const html = fs.readFileSync(htmlPath, "utf8");
		return html.replace(/"(\/assets\/[^"]+)"/g, (_, src) => `"${baseUri}${src}"`);
	}

	/**
	 * Initialize or open the webview panel.
	 */
	initOrOpen(context: vscode.ExtensionContext): vscode.WebviewPanel {
		if (this.panel !== undefined) {
			this.panel.reveal();
			return this.panel;
		}

		this.panel = vscode.window.createWebviewPanel(
			"BDDo Todos",
			"BDDo page",
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);
		this.panel.webview.html = this.getHtmlEntryFile(context, this.panel.webview);
		this.panel.onDidDispose(() => this.panel = undefined);
		return this.panel;
	}
}
