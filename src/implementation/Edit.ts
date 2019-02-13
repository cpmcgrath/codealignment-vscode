import * as vscode from 'vscode';
import { Line } from './Line'

type ChangeData = { position: vscode.Position; text: string }

export class Edit implements IEdit
{
    m_editor  : vscode.TextEditor;
    m_changes : ChangeData[];

    constructor(editor:vscode.TextEditor)
    {
        this.m_editor = editor;
        this.m_changes = [];
    }

    public Insert(line: ILine, position: number, text: string) : boolean
    {
        var pos = this.m_editor.document.positionAt(line.Position + position);
        this.m_changes.push({ position : pos, text : text });
        return true;
    }

    public Commit() : void
    {
        this.m_editor.edit(x =>
        {
            while (this.m_changes.length > 0)
            {
                var item = this.m_changes.pop();
                x.insert(item.position, item.text);
            }
        } );
    }

    public Dispose() : void
    {
    }
}