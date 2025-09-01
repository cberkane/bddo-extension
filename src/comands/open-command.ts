import { ExtensionContext } from "vscode";

import { MessageHandler } from "../event-handlers/message-handler";
import { WebviewUI } from "../webview-ui";

export const openCommand = (context: ExtensionContext) => {
	const webviewService = new WebviewUI();
	const panel = webviewService.initOrOpen(context);

	panel.webview.onDidReceiveMessage(async (message) => {
		const messageHandler = new MessageHandler(panel);
		messageHandler.handle(message);
	});
};
