'use strict';

import * as vscode from 'vscode';
import { Line                 } from './implementation/line'
import { Document             } from './implementation/document'
import { Alignment            } from './common/business/Alignment'
import { GeneralScopeSelector } from './common/business/selectors/GeneralScopeSelector';
import { Options              } from './common/business/Options';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext)
{
    let disposable = vscode.commands.registerCommand('extension.codealignment.test', () =>
    {
        var alignment      = new Alignment();
        alignment.View     = new Document(vscode.window.activeTextEditor);
        var selector       = new GeneralScopeSelector();
        //selector.ScopeSelectorRegex = new Options().ScopeSelectorRegex;
        alignment.Selector = selector;
        alignment.PerformAlignment("=", 0, false);
    });

    context.subscriptions.push(disposable);
}

export function deactivate()
{
}