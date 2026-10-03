import * as vscode from 'vscode';

let lastUri: string | null = null;

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage('Auto Typst Preview is active!');
    const disposable = vscode.window.onDidChangeActiveTextEditor(async editor => {
        if (!editor) return;

        const doc = editor.document;
        const currentUri = doc.uri.toString();

        if ((doc.languageId === 'typst' || doc.fileName.endsWith('.typ')) && currentUri !== lastUri) {
            lastUri = currentUri;
            
            await vscode.commands.executeCommand('tinymist.pinMain', doc.uri.fsPath);

        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}