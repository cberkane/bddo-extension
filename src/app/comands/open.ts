import { ExtensionContext } from "vscode";

import { FeaturesController } from "@app/controllers/features.controller";
import { ProjectsController } from "@app/controllers/projects.controller";
import { ScenariosController } from "@app/controllers/scenarios.controller";
import { Inject } from "@app/inject";

export const open = (context: ExtensionContext) => {
	const webviewUIService = Inject.getWebviewUIService();
	const panel = webviewUIService.initOrOpen(context);

	// TODO: Refactor to redirect to the appropriate controller based on message.command or type
	panel.webview.onDidReceiveMessage(async (message) => {
		const featuresController = new FeaturesController(panel);
		featuresController.handle(message);
		
		const projectsController = new ProjectsController(panel);
		projectsController.handle(message);

		const scenariosController = new ScenariosController(panel);
		scenariosController.handle(message);
	});
};
