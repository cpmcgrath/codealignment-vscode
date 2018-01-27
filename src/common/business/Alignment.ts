import { NormalDelimiterFinder } from "./delimiterFinders/NormalDelimiterFinder";
import { LineDetails           } from "./lineDetails";
import { StringFunctions       } from "./tools/StringFunctions";
import { IDelimiterFinder      } from "./interfaces/IDelimiterFinder";
import { ArrayFunctions        } from "./tools/ArrayFunctions";

export class Alignment
{
    View              : IDocument;
    Selector          : IScopeSelector;
    Finder            : IDelimiterFinder;
    UseIdeTabSettings : boolean;

    constructor()
    {
        this.Finder = new NormalDelimiterFinder();
    }

    PerformAlignment(delimiter: string, minIndex : number = 0, addSpace : boolean = false): number
    {
        var lines = this.Selector.GetLinesToAlign(this.View);
        var data  = lines.map(x => new LineDetails(x, this.Finder, delimiter, minIndex, this.View.TabSize))
                            .filter(y => y.Index >= 0);

        if (data.length <= 0)
            return -1;

        var maxItems       = ArrayFunctions.MaxItemsBy(data, y => y.Position);
        var targetPosition = ArrayFunctions.Max(maxItems, x => x.GetPositionToAlignTo(addSpace, this.View.TabSize));

        this.CommitChanges(data, targetPosition);
        return targetPosition;
    }

    private CommitChanges(data: LineDetails[], targetPosition: number) : void
    {
        var edit = this.View.StartEdit();
        try
        {
            for (let change of data)
            {
                var spaces = this.GetSpacesToInsert(change.Position, targetPosition)
                if (!edit.Insert(change.Line, change.Index, spaces))
                    return;
            }

            edit.Commit();
        }
        finally
        {
            edit.Dispose();
        }
    }

    private GetSpacesToInsert(startIndex: number, endIndex: number) : string
    {
        var useSpaces = this.View.ConvertTabsToSpaces;
        if (useSpaces || !this.UseIdeTabSettings)
            return StringFunctions.GetSpaces(endIndex - startIndex);

        var spaces = endIndex % this.View.TabSize;
        var tabs   = Math.ceil((endIndex - spaces - startIndex) / this.View.TabSize);

        return (tabs == 0) ? StringFunctions.GetSpaces(endIndex - startIndex)
                           : StringFunctions.GetSpaces(tabs, '\t') + StringFunctions.GetSpaces(spaces);
    }
}