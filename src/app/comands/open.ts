import { ExtensionContext } from "vscode";

import { FeaturesController } from "@app/controllers/features.controller";
import { ProjectsController } from "@app/controllers/projects.controller";
import { Inject } from "@app/inject";

export const open = (context: ExtensionContext) => {
	const webviewUIService = Inject.getWebviewUIService();
	const panel = webviewUIService.initOrOpen(context);

	panel.webview.onDidReceiveMessage(async (message) => {
		// TODO: maybe check recipient before forwarding the message
		const featuresController = new FeaturesController(panel);
		featuresController.handle(message);
		
		const projectsController = new ProjectsController(panel);
		projectsController.handle(message);
	});
};
