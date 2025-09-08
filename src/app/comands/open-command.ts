import { ExtensionContext } from "vscode";

import { WebviewUI } from "../webview-ui";
import { FeatureEventHandler } from "../event-handlers/feature-event-handler";
import { ProjectEventHandler } from "../event-handlers/project-event-handler";

export const openCommand = (context: ExtensionContext) => {
	const webviewService = new WebviewUI();
	const panel = webviewService.initOrOpen(context);

	panel.webview.onDidReceiveMessage(async (message) => {
		const featuresHandler = new FeatureEventHandler(panel);
		const projectsHandler = new ProjectEventHandler(panel);

		featuresHandler.handle(message);
		projectsHandler.handle(message);
	});
};
