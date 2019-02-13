import * as vscode from "vscode"

export interface ICodeAlignmentConfig
{
    stopregexes: string[]
}

export class Config implements ICodeAlignmentConfig
{
    stopregexes: string[];
    
    public static GetConfig(): ICodeAlignmentConfig
    {
        let config =  vscode.workspace.getConfiguration("codealignment");
        return {
            stopregexes: config.get<string[]>("stopregexes")
        }
    }
}