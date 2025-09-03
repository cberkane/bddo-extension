interface VSCodeAPI {
	postMessage<T>(message: { command: string; [key: string]: T }): void;
}

interface Window {
	vscode: VSCodeAPI;
}
