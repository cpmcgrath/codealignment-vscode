export class DelimiterResult
{
    CompareIndex : number;
    InsertIndex  : number;

    static Create(index: number): DelimiterResult
    {
        var result = new DelimiterResult();
        result.CompareIndex = index,
        result.InsertIndex  = index
        return result;
    }
}
