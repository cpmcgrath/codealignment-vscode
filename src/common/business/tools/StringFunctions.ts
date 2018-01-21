export class StringFunctions
{
    static SpacesAtStart(str: string) : number
    {
        var result = 0;
        var length = str.length;
        while (result < length && str[result] === ' ')
            ++result;

        return result;
    }

    static StartsWith(str: string, prefix: string) : boolean
    {
        var length = prefix.length;

        if (length > str.length)
            return false;

        for (var i = 0; i < length; i++)
        {
            if (str[i] !== prefix[i])
                return false;
        }

        return true;
    }

    static GetSpaces(spaces: number, paddingChar: string = ' ') : string
    {
        var result = "";
        for (var i = 0; i < spaces; i++)
            result += paddingChar;

        return result;
    }

    static ReplaceTabs(value: string, tabSize: number) : string
    {
        var result = "";
        var length = value.length;
        for (var i = 0; i < length; i++)
        {
            if (value[i] != '\t')
                result += value[i];
            else
            {
                var spaces = tabSize - (i % tabSize);
                result += StringFunctions.GetSpaces(spaces);
            }
        }

        return result;
    }

    static IsNullOrEmpty(value: string) : boolean
    {
        if (value === null)
            return true;

        return value.length === 0;
    }

    static IsNullOrWhitespace(value: string) : boolean
    {
        return this.IsNullOrEmpty(value)
            || value.trim() === "";
    }

    static RegexEscape(value: string) : string
    {
        return value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
}