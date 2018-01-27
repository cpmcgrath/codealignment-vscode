interface IScopeSelector
{
    //Was IEnumerable
    GetLinesToAlign(view: IDocument) : ILine[];
}