import { ExtensionContext } from "vscode";

import { FeaturesController } from "../controllers/features.controller";
import { ProjectsController } from "../controllers/projects.controller";
import { Injector } from "../injector";

export const open = (context: ExtensionContext) => {
	const webviewUIService = Injector.getWebviewUIService();
	const panel = webviewUIService.initOrOpen(context);

	panel.webview.onDidReceiveMessage(async (message) => {
		const featuresController = new FeaturesController(panel);
		featuresController.handle(message);
		
		const projectsController = new ProjectsController(panel);
		projectsController.handle(message);
	});
};
