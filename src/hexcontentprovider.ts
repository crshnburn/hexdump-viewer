import * as vscode from "vscode";
import { hexyz } from "@crshnburn/hexyz";

export default class HexContentProvider implements vscode.TextDocumentContentProvider {

    private header: string = "  Offset: 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F\t\n";
    private _onDidChange = new vscode.EventEmitter<vscode.Uri>();
    private ascii: boolean = true;
    
    provideTextDocumentContent(uri: vscode.Uri): string | Thenable<string> {
        let origBytes = uri.query;
        let byteTokens = origBytes.split(/\s/);
        let completeStr = byteTokens.reduce((acc, token) => acc.concat(token), "");
        let bytes = completeStr.match(/.{1,2}/g);
        if(bytes !== null){
            return this.header.concat(hexyz(bytes.map(s => parseInt(s, 16)), {format: 'twos', caps: "upper", annotate: "ascii_ebcdic"}));
        }
        return origBytes;
    }

    get onDidChange(): vscode.Event<vscode.Uri> {
        return this._onDidChange.event;
    }

    public switchEncoding(){
        this.ascii = !this.ascii;
        // this._onDidChange.fire();
    }
}