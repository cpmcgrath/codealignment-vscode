import { StringFunctions } from "../tools/StringFunctions";

class XmlScopeSelector implements IScopeSelector
{
    Start : number; //Nullable
    End   : number; //Nullable

    GetLinesToAlign(view: IDocument) : ILine[]
    {
        var start = this.Start || view.StartSelectionLineNumber;
        var end   = this.End   || view.EndSelectionLineNumber;

        if (start == end)
        {
            var line    = StringFunctions.ReplaceTabs(view.GetLineFromLineNumber(start).Text, view.TabSize);
            var isMulti = this.IsMultiLineTag(view, line);
            start       = this.GetStart(view, start, line, isMulti);
            end         = this.GetStart(view, end,   line, isMulti);
        }

        var result : ILine[] = [];
        for (var i = start; i <= end; i++)
            result.push(view.GetLineFromLineNumber(i));

        return result;
    }

    private GetStart(view: IDocument, start: number, line:string, isMulti: boolean) : number
    {
        if (isMulti)
            for (var i = start; i >= 0; i--)
            {
                if (this.IsMultiLineStart(view, i))
                    return i;
            }
        else
            for (var i = start + 1; i >= 1; i--)
            {
                if (this.IsNotSameScope(view, i - 1, line))
                    return i;
            }

        return 0;
    }

    private GetEnd(view: IDocument, end: number, line:string, isMulti: boolean) : number
    {
        if (isMulti)
            for (var i = end; i < view.LineCount; i++)
            {
                if (this.IsMultiLineStart(view, i))
                    return i + 1;
            }
        else
            for (var i = end - 1; i < view.LineCount - 1; i++)
            {
                if (this.IsNotSameScope(view, i + 1, line))
                    return i + 1;
            }

        return 0;
    }

    private IsMultiLineTag(view: IDocument, line: string) : boolean
    {
        line = line.trim();
        return line === "" || line[0] !== "<" || line.indexOf(">") < 0;
    }

    private IsMultiLineStart(view: IDocument, lineNo: number) : boolean
    {
        var line = view.GetLineFromLineNumber(lineNo).Text.trim();
        return line === "" || line[0] === "<";
    }

    private IsMultiLineEnd(view: IDocument, lineNo: number) : boolean
    {
        var line = view.GetLineFromLineNumber(lineNo).Text.trim();
        return line == "" || line.indexOf(">") >= 0;
    }

    private IsNotSameScope(view: IDocument, lineNo: number, original: string) : boolean
    {
        var line           = StringFunctions.ReplaceTabs(view.GetLineFromLineNumber(lineNo).Text, view.TabSize);
        var lineIndent     = StringFunctions.SpacesAtStart(line);
        var originalIndent = StringFunctions.SpacesAtStart(original);

        return line.trim() === "" || lineIndent != originalIndent;
    }
}