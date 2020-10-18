// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import HexContentProvider from './hexcontentprovider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hexdump-viewer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('hexcontent.viewHex', async () => {
		let editor = vscode.window.activeTextEditor;
		if (editor !== undefined) {
			var text = "";
			for(const selection of editor.selections) {
				text = text.concat(editor.document.getText(selection)).concat("\n");
			}
			let path = editor.document.uri.fsPath;
			let uri = vscode.Uri.parse(`hexcontent:${path.substring(path.lastIndexOf('/') + 1)}.hexcontent?${text}`);
			const document = await vscode.workspace.openTextDocument(uri);
			await vscode.window.showTextDocument(document);
		}
	});

	context.subscriptions.push(disposable);

	let provider = new HexContentProvider();
	vscode.workspace.registerTextDocumentContentProvider('hexcontent', provider);
}

// this method is called when your extension is deactivated
export function deactivate() {}
