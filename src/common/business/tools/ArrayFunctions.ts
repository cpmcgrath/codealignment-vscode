export class ArrayFunctions
{
    static MaxItemsBy<T>(source : T[], callbackfn: (value: T) => number) : T[]
    {
        var maxVal = -1;
        var items : T[] = [];
        for (let item of source)
        {
            var result = callbackfn(item);
            if (result > maxVal)
            {
                maxVal = result;
                items = [];
            }
            if (result === maxVal)
                items.push(item);
        }

        return items;
    }

    static Max<T>(source : T[], callbackfn: (value: T) => number) : number
    {
        var maxVal = -1;
        for (let item of source)
        {
            var result = callbackfn(item);
            if (result > maxVal)
                maxVal = result;
        }

        return maxVal;
    }

    static Aggregate(instance: string[], join: string) : string
    {
        var isEmpty = true;
        var result  = "";

        for (let item of instance)
        {
            if (isEmpty)
                isEmpty = false;
            else
                result += join;

            result += item;
        }

        return result;
    }
}