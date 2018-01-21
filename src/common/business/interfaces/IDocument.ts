interface IDocument
{
    LineCount                : number;
    StartSelectionLineNumber : number;
    EndSelectionLineNumber   : number;
    CaretColumn              : number;
    ConvertTabsToSpaces      : boolean;
    TabSize                  : number;
    FileType                 : string;

    GetLineFromLineNumber(lineNo: number) : ILine;
    StartEdit() : IEdit;
    Refresh()   : void;
}