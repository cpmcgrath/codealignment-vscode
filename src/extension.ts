'use strict';

import * as vscode from 'vscode';
import { Line                 } from './implementation/line'
import { Document             } from './implementation/document'
import { Alignment            } from './common/business/Alignment'
import { GeneralScopeSelector } from './common/business/selectors/GeneralScopeSelector';
import { RegexDelimiterFinder } from './common/business/delimiterFinders/RegexDelimiterFinder';
import { Options              } from './common/business/Options';

function doAlignment(delimiter: string, useRegex: boolean = false)
{
    var alignment      = new Alignment();
    alignment.View     = new Document(vscode.window.activeTextEditor);
    var selector       = new GeneralScopeSelector();
    selector.ScopeSelectorRegex = new Options().ScopeSelectorRegex;
    alignment.Selector = selector;

    if (useRegex)
        alignment.Finder = new RegexDelimiterFinder();

    alignment.PerformAlignment(delimiter, 0, false);
}

function AlignByString()
{
    let options: vscode.InputBoxOptions = {
        prompt: "Enter String to align: ",
        placeHolder: "(delimiter)",
    }

    vscode.window.showInputBox(options).then(value => {
        if (value)
            doAlignment(value);
    });
}

function AlignByRegex()
{
    let options: vscode.InputBoxOptions = {
        prompt: "Enter Regex to align: ",
        placeHolder: "(delimiter)",
    }

    vscode.window.showInputBox(options).then(value => {
        if (value)
            doAlignment(value, true);
    });
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext)
{
    context.subscriptions.push(vscode.commands.registerCommand('codealignment.alignbystring', AlignByString         ));
    context.subscriptions.push(vscode.commands.registerCommand('codealignment.alignbyequals', () => doAlignment('=')));
    context.subscriptions.push(vscode.commands.registerCommand('codealignment.alignbyperiod', () => doAlignment('.')));
    context.subscriptions.push(vscode.commands.registerCommand('codealignment.alignbyquote',  () => doAlignment('"')));
    context.subscriptions.push(vscode.commands.registerCommand('codealignment.alignbyregex',  AlignByRegex          ));
}

export function deactivate()
{
}