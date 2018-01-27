import { DelimiterResult  } from "./DelimiterResult";
import { IDelimiterFinder } from "../interfaces/IDelimiterFinder";

export class NormalDelimiterFinder implements IDelimiterFinder
{
    //virtual
    GetIndex(source: string, delimiter: string, minIndex: number, tabSize: number) : DelimiterResult
    {
        minIndex = this.TabbifyIndex(source, minIndex, tabSize);

        var result = source.length >= minIndex ? source.indexOf(delimiter, minIndex) : -1;
        return DelimiterResult.Create(result);
    }

    TabbifyIndex(source: string, minIndex: number, tabSize: number) : number
    {
        var adjustment = 0;
        var index      = source.indexOf('\t');

        while (index >= 0 && index < minIndex)
        {
            var padding = tabSize - ((index + adjustment) % tabSize);
            if (index + padding - 1 <= minIndex)
                adjustment += padding - 1;

            index  = source.indexOf('\t', index + 1);
        }

        return minIndex - adjustment;
    }
}