import { NormalDelimiterFinder } from "./NormalDelimiterFinder";
import { DelimiterResult       } from "./DelimiterResult";

export class RegexDelimiterFinder extends NormalDelimiterFinder
{
    //override
    GetIndex(source: string, delimiter: string, minIndex: number, tabSize: number) : DelimiterResult
    {
        minIndex = this.TabbifyIndex(source, minIndex, tabSize);

        if (source.length < minIndex)
        {
            return DelimiterResult.Create(-1);
        }

        //var match = Regex.Match(source.substring(minIndex), delimiter);
        var match = source.substring(minIndex).match(delimiter);

        if (match === null)
        {
            return DelimiterResult.Create(-1);
        }

        var result = new DelimiterResult();
        result.CompareIndex = minIndex + this.GetGroupIndex(match, "compare", "x");
        result.InsertIndex  = minIndex + this.GetGroupIndex(match, "insert", "compare", "x");
        return result;
    }

    GetGroupIndex(match: RegExpMatchArray, ...keys: string[]) : number
    {
        //TODO: Groups
        //for (var key in keys)
        //{
        //    var group = match.Groups[key];
        //    if (group.Success)
        //        return group.Index;
        //}

        return match.index;
    }
}
