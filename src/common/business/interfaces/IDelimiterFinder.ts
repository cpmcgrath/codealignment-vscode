import { DelimiterResult } from "../delimiterFinders/DelimiterResult";

export interface IDelimiterFinder
{
    GetIndex(source: string, delimiter: string, minIndex: number, tabSize: number) : DelimiterResult;
}