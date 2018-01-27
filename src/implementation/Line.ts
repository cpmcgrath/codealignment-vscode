import * as vscode from 'vscode';

export class Line implements ILine
{
    m_line : vscode.TextLine;
    m_doc  : vscode.TextDocument;

    constructor(doc:vscode.TextDocument, line : vscode.TextLine)
    {
        this.m_doc  = doc;
        this.m_line = line;
    }

    public get Position() : number
    {
        return this.m_doc.offsetAt(this.m_line.range.start);
    }

    public get Text() : string
    {
        return this.m_line.text;
    }
}