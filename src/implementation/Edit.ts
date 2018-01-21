import * as vscode from 'vscode';
import { Line } from './line'

export class Edit implements IEdit
{
    m_editor : vscode.TextEditor;

    constructor(editor:vscode.TextEditor)
    {
        this.m_editor = editor;
    }

    public Insert(line: ILine, position: number, text: string) : boolean
    {
        var pos = this.m_editor.document.positionAt(line.Position + position);
        this.m_editor.edit(x => x.insert(pos, text));
        return true;
    }

    public Commit() : void
    {
    }

    public Dispose() : void
    {
    }
}