"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
let lastUri = null;
function activate(context) {
    vscode.window.showInformationMessage('Auto Typst Preview is active!');
    const disposable = vscode.window.onDidChangeActiveTextEditor(async (editor) => {
        if (!editor)
            return;
        const doc = editor.document;
        const currentUri = doc.uri.toString();
        if ((doc.languageId === 'typst' || doc.fileName.endsWith('.typ')) && currentUri !== lastUri) {
            lastUri = currentUri;
            await vscode.commands.executeCommand('tinymist.pinMain', doc.uri.fsPath);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
