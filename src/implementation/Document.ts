import * as vscode from 'vscode';
import { Line } from './line'
import { Edit } from './edit'

export class Document implements IDocument
{
    m_editor : vscode.TextEditor;

    constructor(editor:vscode.TextEditor)
    {
        this.m_editor = editor;
    }

    public get LineCount() : number
    {
        return this.m_editor.document.lineCount;
    }

    public get StartSelectionLineNumber() : number
    {
        return Math.min(...this.m_editor.selections.map(x => x.start.line));
    }

    public get EndSelectionLineNumber() : number
    {
        return Math.max(...this.m_editor.selections.map(x => x.end.line));
    }

    public get CaretColumn() : number
    {
        var caret = this.m_editor.selection.active;

        return this.m_editor.document.lineAt(caret.line).range.start.compareTo(caret) ;
    }

    public get ConvertTabsToSpaces() : boolean
    {
        return true;
    }

    public get TabSize() : number
    {
        return <number>this.m_editor.options.tabSize;
    }

    public get FileType() : string
    {
        return ".cs";
    }

    public GetLineFromLineNumber(lineNo: number) : ILine
    {
        return new Line(this.m_editor.document, this.m_editor.document.lineAt(lineNo));
    }

    public StartEdit() : IEdit
    {
        return new Edit(this.m_editor);
    }

    public Refresh()
    {
    }
}