
import { printKustoTree, transformKustoToSql } from "./modules/kusto.ts";
import { ReadLine } from "./modules/readline.ts";
//import { PGlite } from "npm:@electric-sql/pglite";

import { deparse } from 'npm:pgsql-deparser';

import 'npm:bridge.net'
import 'npm:@kusto/language-service-next';

import K = Kusto.Language
import { toProtoBinary } from "./modules/kusto/proto.ts";

//const query = "T |  join kind=inner (Z) on a | join kind=inner (Y) on z | where a > 10.0"

let t1 = Kusto.Language.Symbols.TableSymbol.From("(a: real, b: real)")
t1 = t1?.WithName("T")!

let t2 = Kusto.Language.Symbols.TableSymbol.From("(a: real, b: real)")
t2 = t2?.WithName("Z")!

const _db = new Kusto.Language.Symbols.DatabaseSymbol.$ctor2("db", null, [t1, t2]);

const globalState = Kusto.Language.GlobalState.Default?.WithDatabase(_db);

/* 
const pgdb = new PGlite();
await pgdb.exec(`
    create table Z(a: string, b: string);
    insert into Z VALUES ('test','123'), ('bcd', '456')`
)

await pgdb.exec(`
    create table Y(a: string, b: string);
    insert into Y VALUES ('test','123'), ('bcd', '456')`
)
*/

const ffi = Deno.dlopen('db/target/debug/libdb.so',
    {
        "query": {parameters: ["buffer", "u32"], result: "void"}
    }
);

async function queryPg(query: string): Promise<string> {
    /* disable till can debug pg_lite
        error: Uncaught (in promise) error: syntax error at or near ":"
        at ye.Ce (file:///root/.cache/deno/npm/registry.npmjs.org/@electric-sql/pglite/0.2.10/dist/chunk-AOCDFDRO.js:1:12465)
        at ye.je (file:///root/.cache/deno/npm/registry.npmjs.org/@electric-sql/pglite/0.2.10/dist/chunk-AOCDFDRO.js:1:9851)
        at ye.parse (file:///root/.cache/deno/npm/registry.npmjs.org/@electric-sql/pglite/0.2.10/dist/chunk-AOCDFDRO.js:1:8603)
        at H.execProtocol (file:///root/.cache/deno/npm/registry.npmjs.org/@electric-sql/pglite/0.2.10/dist/index.js:1:6241)
        at eventLoopTick (ext:core/01_core.js:175:7)
        at async H.o (file:///root/.cache/deno/npm/registry.npmjs.org/@electric-sql/pglite/0.2.10/dist/chunk-PKPYJS5H.js:8:1263)
        at async file:///root/.cache/deno/npm/registry.npmjs.org/@electric-sql/pglite/0.2.10/dist/chunk-PKPYJS5H.js:8:2229
    */

        /*
         const result = await pgdb.query(query);
        return `output: ${result.rows}`
        */

    return ""
}

async function processLine(line: string): Promise<string> {
    const [keyword, ...queryParts] = line.split(" ")
    const query = queryParts.join(" ")

    if(keyword === "exit" || keyword === "x") {
        ffi.close()
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
            if(ex.message !== undefined) {
                return ex.toString() 
            } else {
                return JSON.stringify(ex)
            }
        }
    } else if (keyword === "parse" || keyword === "p") {
        const parsed = K.KustoCode.ParseAndAnalyze(query, globalState)

        if(parsed?.GetDiagnostics()?.Count! > 0) {
            return `errors: ${parsed?.GetDiagnostics()?.getItem(0).Message}`

        }

        printKustoTree(parsed?.Syntax!)
    } else if (keyword === "query" || keyword === "q") {
        try {
            const parsed = K.KustoCode.ParseAndAnalyze(query, globalState)

            if(parsed?.GetDiagnostics()?.Count! > 0) {
                //console.log("errors:", parsed?.GetDiagnostics()?.getItem(0).Message)
            }

            const sqlTree = transformKustoToSql(parsed?.Syntax!)

            const serialized = toProtoBinary(sqlTree)

            console.log(deparse(sqlTree, {}), "\n")

            ffi.symbols.query(serialized, serialized.length)
            
            return ""

           //return await queryPg(deparse(sqlTree, {}))

        } catch(ex) {
            if(ex.message !== undefined) {
                return ex.toString() 
            } else {
                return JSON.stringify(ex)
            }
        }
    } else if (keyword == "query_sql" || keyword === "qs") {
        return await queryPg(query)
    }

    return ""
}

const readLine = new ReadLine(processLine, "PROMPT> ")

Deno.stdout.write(readLine.PROMPT)
Deno.stdin.readable.pipeThrough(readLine).pipeTo(Deno.stdout.writable)
