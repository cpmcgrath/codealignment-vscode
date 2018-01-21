export class ArrayFunctions
{
    static MaxItemsBy<T>(source : T[], callbackfn: (value: T) => number) : T[]
    {
        var maxVal = -1;
        var items : T[] = [];
        for (var i in source)
        {
            var result = callbackfn(source[i]);
            if (result > maxVal)
            {
                maxVal = result;
                items = [];
            }
            if (result === maxVal)
                items.push(source[i]);
        }

        return items;
    }

    static Max<T>(source : T[], callbackfn: (value: T) => number) : number
    {
        var maxVal = -1;
        for (var i in source)
        {
            var result = callbackfn(source[i]);
            if (result > maxVal)
                maxVal = result;
        }

        return maxVal;
    }

    static Aggregate(instance: string[], join: string) : string
    {
        var isEmpty = true;
        var result  = "";

        for (var item in instance)
        {
            result += item;
            if (isEmpty)
                isEmpty = false;
            else
                result += join;
        }

        return result;
    }
}