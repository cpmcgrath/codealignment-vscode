export interface IOptions //: INotifyPropertyChanged
{
    Shortcuts          : KeyShortcut[];
    XmlTypes           : string[];
    ScopeSelectorRegex : string;
}

//     get ScopeSelectorRegex() : string
//     {
//         var values = this.ToOrRegex(this.ScopeSelectorLineValues, "^\\s*({0}|)\\s*$");
//         var ends   = this.ToOrRegex(this.ScopeSelectorLineEnds,   "({0})\\s*$");

//         return ends == null ? values : `(${values}|${ends})`;
//     }

//     ScopeSelectorLineValues : string;
//     ScopeSelectorLineEnds   : string;
//     UseIdeTabSettings       : boolean;

//     get XmlTypesString() : string
//     {
//         return ArrayFunctions.Aggregate(this.XmlTypes, "\r\n");
//     }
//     set XmlTypesString(value: string)
//     {
//         this.XmlTypes = value.split('\n')
//                             .map(x => x.trim().toLowerCase());
//     }

//     GetShortcut(key: Key, language: string = null) : KeyShortcut
//     {
//         var shortcuts = this.Shortcuts.filter(x => x.Value == key
//                                                 && (x.Language == null || x.Language == language));

//         if (shortcuts.length === 0)
//             return null;

//         return shortcuts.sort(x => x.Language === language ? 1 : 0)[0];
//     }

//     ResetShortcuts() : void
//     {
//         //this.Shortcuts =
//     }

//     ResetSelectorTypes() : void
//     {
//         //TODO: Load default values
//         //this.XmlTypes                =
//         //this.ScopeSelectorLineValues =
//         //this.ScopeSelectorLineEnds   =
//     }

//     Save() : void
//     {
//         //TODO: Save data
//     }

//     SaveAs(filename: string) : void
//     {
//         //TODO: Save data
//     }

//     LoadFrom(filename: string) : void
//     {
//         //TODO: Load data
//         this.Reload();
//     }
// }