import { StringFunctions  } from "./tools/StringFunctions";
import { IDelimiterFinder } from "./interfaces/IDelimiterFinder";

export class LineDetails
{
    constructor(line: ILine, finder: IDelimiterFinder, delimiter: string, minIndex: number, tabSize: number)
    {
        var withoutTabs = StringFunctions.ReplaceTabs(line.Text, tabSize);
        this.Line       = line;
        this.Index      = finder.GetIndex(line.Text,   delimiter, minIndex, tabSize).InsertIndex;
        this.Position   = finder.GetIndex(withoutTabs, delimiter, minIndex, tabSize).CompareIndex;
    }

    Line     : ILine;
    Index    : number;
    Position : number;

    GetPositionToAlignTo(addSpace: boolean, tabSize: number) : number
    {
        if (addSpace && this.Position > 0
        && StringFunctions.ReplaceTabs(this.Line.Text, tabSize)[this.Position - 1] != ' ')
            return this.Position + 1;

        return this.Position;
    }
}