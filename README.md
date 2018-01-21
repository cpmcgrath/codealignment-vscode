# Code Alignment for Visual Studio Code

Port of the C# Code base to TypeScript

This is Version 1. The plan is to release early and release often, so it is missing many of the best features but the plan is for them to be added in time.

Main code alignment repository: https://github.com/cpmcgrath/codealignment
Build Server: https://ci.appveyor.com/project/cpmcgrath/codealignment-vscode

## How to use

This is still in development. It is currently only exposed through a single test command.

To use:
* Open a file with some lines
* Select the lines which you want to align (Or use Auto scope selection)
* Press F1 and type 'Code Alignment' to bring up options.

### Future features
- [ ] Remember history
- [ ] Allow Alignments from Caret Position
- [ ] Allow Alignments to use Complex Regex
- [ ] Expose Align by Space - This is the biggest missing feature from Version 1 as it's the alignment I use 90% of the time. However, it needs complex regexes to work, otherwise I'd have to fill the code base with hacks.
- [ ] Allow Alignments to be chained
- [ ] Introduce the XML Automatic scope selection for XML-like content type
- [ ] Expose Options (including Shortcut functions) - In terms of scope for version 1, once I realised I didn't have to deliver this, it clarified exactly what the scope for version 1 was

## Atom
Before a lot of the Future Features are implemented, I'd like to get the extension working for the Atom editor as well. The primary reason is I don't think I've got the repository structure correct yet, and having the 2 different plugins will make sure I've got it correct.
