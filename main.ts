
import { printKustoTree, transformKustoToSql } from "./modules/kusto.ts";
import { ReadLine } from "./modules/readline.ts";

import { deparse } from 'npm:pgsql-deparser';

import 'npm:bridge.net'
import 'npm:@kusto/language-service-next';

import K = Kusto.Language

//const query = "T |  join kind=inner (Z) on a | join kind=inner (Y) on z | where a > 10.0"

let t1 = Kusto.Language.Symbols.TableSymbol.From("(a: real, b: real)")
t1 = t1?.WithName("T")!

let t2 = Kusto.Language.Symbols.TableSymbol.From("(a: real, b: real)")
t2 = t2?.WithName("Z")!

const db = new Kusto.Language.Symbols.DatabaseSymbol.$ctor2("db", null, [t1, t2]);

const globalState = Kusto.Language.GlobalState.Default?.WithDatabase(db);

function processLine(line: string): string {
    const [keyword, ...queryParts] = line.split(" ")
    const query = queryParts.join(" ")

    if(keyword === "quit" || keyword === "q") {
        Deno.exit(0)
    } else if(keyword === "translate" || keyword === "t") {
        try {
            const parsed = K.KustoCode.ParseAndAnalyze(query, globalState)

            if(parsed?.GetDiagnostics()?.Count! > 0) {
                //console.log("errors:", parsed?.GetDiagnostics()?.getItem(0).Message)
            }
    
            const sqlTree = transformKustoToSql(parsed?.Syntax!)
    
            return `output: ${deparse(sqlTree, {})}`    
        } catch(ex) {
            return JSON.stringify(ex)
        }
    } else if (keyword === "parse" || keyword === "p") {
        const parsed = K.KustoCode.ParseAndAnalyze(query, globalState)

        if(parsed?.GetDiagnostics()?.Count! > 0) {
            return `errors: ${parsed?.GetDiagnostics()?.getItem(0).Message}`

        }

        printKustoTree(parsed?.Syntax!)
    }

    return ""
}

const readLine = new ReadLine(processLine, "PROMPT> ")

Deno.stdout.write(readLine.PROMPT)
Deno.stdin.readable.pipeThrough(readLine).pipeTo(Deno.stdout.writable)
