class KeyShortcut
{
    Value          : Key;
    Alignment      : string;
    Language       : string;
    AlignFromCaret : boolean;
    UseRegex       : boolean;
    AddSpace       : boolean;

    static Get(xml: string) : KeyShortcut[]
    {
        //TODO: Get Shortcuts
        return null;
    }

    static Serialize(shortcuts: KeyShortcut[]) : string
    {
        //TODO: Serialise Logic
        return "";
    }
}