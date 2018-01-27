import { StringFunctions } from "./tools/StringFunctions";
import { ArrayFunctions  } from "./tools/ArrayFunctions";
import { IOptions        } from "./interfaces/IOptions";

export class Options implements IOptions //: INotifyPropertyChanged
{
    //private Settings m_settings = Settings.Default;
    constructor()
    {
        this.Reload();
    }

    private Reload() : void
    {
        //this.Shortcuts               = KeyShortcut.Get(m_settings.Shortcuts).ToList();
        //this.XmlTypes                = m_settings.XmlTypes.Cast<string>().ToArray();
        this.ScopeSelectorLineValues = " { } }; ( )"; //m_settings.ScopeSelectorLineValues;
        this.ScopeSelectorLineEnds   = ""; //m_settings.ScopeSelectorLineEnds;
        //this.UseIdeTabSettings       = m_settings.UseIdeTabSettings;
    }

    Shortcuts : KeyShortcut[];
    XmlTypes  : string[];

    get ScopeSelectorRegex() : string
    {
        var values = this.ToOrRegex(this.ScopeSelectorLineValues, "^\\s*({0}|)\\s*$");
        var ends   = this.ToOrRegex(this.ScopeSelectorLineEnds,   "({0})\\s*$");

        return ends == null ? values : `(${values}|${ends})`;
    }

    private ToOrRegex(input: string, format: string) : string
    {
        var items = input.split(" ")//, StringSplitOptions.RemoveEmptyEntries)
                            .filter(x => x.trim() != "")
                            .map(x => StringFunctions.RegexEscape(x));

        var str = ArrayFunctions.Aggregate(items, "|");
        return items.length > 0 ? format.replace("{0}", str) : null;
    }

    ScopeSelectorLineValues : string;
    ScopeSelectorLineEnds   : string;
    UseIdeTabSettings       : boolean;

    get XmlTypesString() : string
    {
        return ArrayFunctions.Aggregate(this.XmlTypes, "\r\n");
    }
    set XmlTypesString(value: string)
    {
        this.XmlTypes = value.split('\n')
                            .map(x => x.trim().toLowerCase());
    }

    GetShortcut(key: Key, language: string = null) : KeyShortcut
    {
        var shortcuts = this.Shortcuts.filter(x => x.Value == key
                                                && (x.Language == null || x.Language == language));

        if (shortcuts.length === 0)
            return null;

        return shortcuts.sort(x => x.Language === language ? 1 : 0)[0];
    }

    ResetShortcuts() : void
    {
        //this.Shortcuts =
    }

    ResetSelectorTypes() : void
    {
        //TODO: Load default values
        //this.XmlTypes                =
        //this.ScopeSelectorLineValues =
        //this.ScopeSelectorLineEnds   =
    }

    Save() : void
    {
        //TODO: Save data
    }

    SaveAs(filename: string) : void
    {
        //TODO: Save data
    }

    LoadFrom(filename: string) : void
    {
        //TODO: Load data
        this.Reload();
    }
}