import { Config } from '../../Config';
import * as vscode from 'vscode';

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
            if (this.IsLineBlank(view, i) || this.StopRexexMatches(view, i))
                return i + 1;

        return 0;
    }

    private GetEnd(view: IDocument, end: number) : number
    {
        for (var i = end; i < view.LineCount; i++)
            if (this.IsLineBlank(view, i) || this.StopRexexMatches(view, i))
                return i - 1;

        return view.LineCount - 1;
    }

    private StopRexexMatches(view: IDocument, lineNo: number): boolean
    {
        let line = view.GetLineFromLineNumber(lineNo);
        let config = Config.GetConfig();
        for(let pattern of config.stopregexes)
        {
            try
            {
                let regex = new RegExp(pattern);
                if(regex.test(line.Text) == true)
                    return true;
            }
            catch(error)
            {
                vscode.window.showErrorMessage(`Could not test regex with pattern ${pattern}, maybe it is invalid (you have to double escape \\)? Exception: ${error}`)
            }
        }
    }

    private IsLineBlank(view: IDocument, lineNo: number) : boolean
    {
        //return Regex.IsMatch(view.GetLineFromLineNumber(lineNo).Text, this.ScopeSelectorRegex);
        var line = view.GetLineFromLineNumber(lineNo);
        return line.Text.match(this.ScopeSelectorRegex) !== null;
    }
}