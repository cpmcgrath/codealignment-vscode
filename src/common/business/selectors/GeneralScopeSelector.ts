export class GeneralScopeSelector implements IScopeSelector
{
    ScopeSelectorRegex : string;
    Start              : number; //nullable
    End                : number; //nullable

    GetLinesToAlign(view: IDocument) : ILine[]
    {
        var start = this.Start || view.StartSelectionLineNumber;
        var end   = this.End   || view.EndSelectionLineNumber;

        if (start == end)
        {
            start = this.GetStart(view, start);
            end   = this.GetEnd(view, end);
        }

        var result : ILine[] = [];
        for (var i = start; i <= end; i++)
            result.push(view.GetLineFromLineNumber(i));

        return result;
    }

    private GetStart(view: IDocument, start: number) : number
    {
        for (var i = start; i >= 0; i--)
            if (this.IsLineBlank(view, i))
                return i + 1;

        return 0;
    }

    private GetEnd(view: IDocument, end: number) : number
    {
        for (var i = end; i < view.LineCount; i++)
            if (this.IsLineBlank(view, i))
                return i - 1;

        return view.LineCount - 1;
    }

    private IsLineBlank(view: IDocument, lineNo: number) : boolean
    {
        //return Regex.IsMatch(view.GetLineFromLineNumber(lineNo).Text, this.ScopeSelectorRegex);
        return view.GetLineFromLineNumber(lineNo).Text.match(this.ScopeSelectorRegex).index >= 0;
    }
}