interface IEdit
{
    Insert(line: ILine, position: number, text: string) : boolean;
    Commit()  : void;
    Dispose() : void;
}