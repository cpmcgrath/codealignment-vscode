'use strict';

import * as vscode from 'vscode';
import { Line                 } from './implementation/Line'
import { Document             } from './implementation/Document'
import { Alignment            } from './common/business/Alignment'
import { GeneralScopeSelector } from './common/business/selectors/GeneralScopeSelector';
import { RegexDelimiterFinder } from './common/business/delimiterFinders/RegexDelimiterFinder';
import { Options              } from './common/business/Options';

function doAlignment(delimiter: string, useRegex: boolean = false, fromCaret: boolean = false)
{
    let alignment      = new Alignment();
    alignment.View     = new Document(vscode.window.activeTextEditor);
    let selector       = new GeneralScopeSelector();
    selector.ScopeSelectorRegex = new Options().ScopeSelectorRegex;
    alignment.Selector = selector;

    if (useRegex)
        alignment.Finder = new RegexDelimiterFinder();

    let startIndex = 0;
    if (fromCaret)
    {
        let position = vscode.window.activeTextEditor.selection.active;
        startIndex   = position.character;
    }

    alignment.PerformAlignment(delimiter, startIndex, false);
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
    subscribeCommand(context, 'codealignment.alignbystring', AlignByString);
    subscribeCommand(context, 'codealignment.alignbyregex',  AlignByRegex);

    subscribeCommand(context, 'codealignment.alignbyequals',          () => doAlignment(' ='));
    subscribeCommand(context, 'codealignment.alignbyequalsfromcaret', () => doAlignment(' =', false, true));
    subscribeCommand(context, 'codealignment.alignbyperiod',          () => doAlignment('.', false, true));
    subscribeCommand(context, 'codealignment.alignbyquote',           () => doAlignment('"'));
    subscribeCommand(context, 'codealignment.alignbyquotefromcaret',  () => doAlignment('"', false, true));
    subscribeCommand(context, 'codealignment.alignbyspace',           () => doAlignment("\\s[^\\s]", true, true));
}

function subscribeCommand(context: vscode.ExtensionContext, key: string, callback: (...args: any[]) => any)
{
    context.subscriptions.push(vscode.commands.registerCommand(key, callback));
}

export function deactivate()
{
}