import 'npm:bridge.net'
import 'npm:@kusto/language-service-next';
import ast from 'npm:@pgsql/utils'
import { deparse } from 'npm:pgsql-deparser';

import { TextLineStream } from "jsr:@std/streams@0.223.0/text-line-stream";


//import readline from 'node:readline';
//import { stdin as input, stdout as output, stdin, stdout } from 'node:process';

import * as assert from "node:assert";

import K = Kusto.Language 
import KustoType = K.Syntax.SyntaxKind
import { exit, stdout } from "node:process";

const selectStarTargetList = [
    ast.default.resTarget({
        val: ast.default.columnRef({
        fields: [ast.default.aStar()]
        })
    })
];

const syntaxNames: string[] = [];
for(const n in K.Syntax.SyntaxKind) {
    if(typeof K.Syntax.SyntaxKind[n] === 'number') syntaxNames.push(n);
}


function printKustoTree(root: K.Syntax.SyntaxNode) {
    let spacing = ""
    const parent: (K.Syntax.SyntaxNode | null)[] = [null] 
    K.Syntax.SyntaxElement.WalkNodes(root, (node) => {
        if(node.Parent != parent[parent.length - 1]) {
            if(node.Parent == null || node.Parent?.Parent === parent[parent.length - 1]) { // stepped into child
                parent.push(node.Parent)
                spacing += "  "
            } else {
                do {
                    parent.pop()
                    spacing = spacing.substring(0, spacing.length-2)
                }  while(parent.length != 1 && node.Parent != parent[parent.length-1]); 
            }
        }
        console.log(spacing, syntaxNames[node.Kind], node.ChildCount, node.NameInParent, ":",  node.toString())
    })
}

type ParseError = {
    msg: string
}

function transformQueryRoot(query: K.Syntax.QueryBlock): ast.Node {
    const stmtList = query.GetChild(0)
    assert.equal(stmtList?.Kind, KustoType.List, "Query Block first child is not a List")
    assert.equal(query.ChildCount, 3, `QueryBlock does not have 3 children List, Empty, EndOfQuery. Count: ${query.ChildCount}`)
    // assert other 2 elements
    
    if(stmtList?.ChildCount != 1) {
        throw { msg: 'Only single statement queries are currently supported' } as ParseError
    }

    // Second element is end marker
    assert.equal(stmtList.GetChild(0)?.Kind, KustoType.SeparatedElement)
    assert.equal(stmtList.GetChild(0)?.ChildCount, 2)

    return transformKustoToSql(stmtList.GetChild(0)?.GetChild(0) as K.Syntax.SyntaxNode);
}

function transformQueryStatement(query: K.Syntax.ExpressionStatement): ast.Node {
    assert.equal(query.ChildCount, 1, "Query Statement expected to be pass through i.e. have only 1 child")
    return transformKustoToSql(query.GetChild(0) as K.Syntax.SyntaxNode)
}

function transformPipeExpression(expression: K.Syntax.PipeExpression): ast.Node {
    assert.equal(expression.ChildCount, 3, "PipeExpresion expected to have 3 children: lhs, |, rhs")

    const lhsKnode = expression.GetChild(0)!
    const rhsKnode = expression.GetChild(2)!

    const lhs = transformKustoToSql(lhsKnode)
    const rhs = transformKustoToSql(rhsKnode)

    if (rhsKnode.Kind === KustoType.JoinOperator ) {
        const joinExpresion = rhs as ast.JoinExpr
        joinExpresion.JoinExpr.larg = lhs
        
        return joinExpresion
    } else if (rhsKnode.Kind === KustoType.FilterKeyword || rhsKnode.Kind === KustoType.FilterOperator) {
        return ast.default.selectStmt({
            targetList: selectStarTargetList,
            fromClause: [ast.default.rangeSubselect({subquery: lhs})],
            whereClause: rhs,
            op: 'SETOP_NONE'
        })
    } else {
        assert.equal(rhsKnode.Kind, KustoType.ProjectOperator, `Expect pipeline expression rhs to be Join, Filters, or Projections:w ${syntaxNames[rhsKnode.Kind]}`)

        return ast.default.selectStmt({
            targetList: [rhs],
            fromClause: [ ast.default.rangeSubselect({subquery: lhs, alias: ast.default.alias({aliasname: 'a'})})],
            op: 'SETOP_NONE'
        })
    }
}

function transformTableReference(ref: K.Syntax.NameReference): ast.Node {
    
    assert.equal(ref.ChildCount, 1, "NameReference aka TableReference should only have 1 child of type TokenName")
    assert.equal(ref.GetChild(0)?.Kind, KustoType.TokenName, "NameReference aka TableReference child node expected to be of kind TokenName")
    
    const tokenName = ref.GetChild(0) as K.Syntax.TokenName
    return ast.default.rangeVar({
        relname: tokenName.SimpleName!,
        inh: true,
        relpersistence: 'p'
    })
}

function transformSelectExpression(node: K.Syntax.SyntaxElement) {
    if(node.Kind === KustoType.NameReference) {
        const columnReference = node as K.Syntax.NameReference 
        
        return ast.default.columnRef({
            fields: [
            ast.default.string({
                str: columnReference.Name?.SimpleName!
            })
            ]
        })
    } else if(node.Kind === KustoType.RealLiteralExpression) {
        const constRef = node as K.Syntax.LiteralExpression
        return ast.default.aConst({
            val: ast.default.float({str: constRef.ConstantValue})
        })
    }

    throw {msg: `Translation only supports name reference in select. Kind: ${syntaxNames[node.Kind]}`}
    

}

function transformExpression(expr: K.Syntax.Expression): ast.Node {
    if(expr.ChildCount != 3) {
        throw { msg: 'NotImplemented: Only support binary expressions'} as ParseError
    }

    const lhsKnode = expr.GetChild(0)!
    const rhsKnode = expr.GetChild(2)!
    const op = expr.GetChild(1)

    const lhs = transformSelectExpression(lhsKnode)
    const rhs = transformSelectExpression(rhsKnode)
    
    if(op?.Kind === KustoType.PlusToken) {
        return ast.default.opExpr({
            opno: 5,
            args: [lhs, rhs]
        })
    }

    throw {msg: `Not Implmented: Operator ${syntaxNames[op?.Kind!]}`} as ParseError
}

function transformNamedExpression(expr:  K.Syntax.SimpleNamedExpression): ast.Node {
    const alias = expr.Name?.SimpleName!
    const expresssion = transformExpression(expr.Expression!)

    return  ast.default.resTarget({
        name: alias,
        val: expresssion
    })
}

function transformProjectOperator(projectOperator: K.Syntax.ProjectOperator): ast.Node {
    const statementCount = projectOperator.Expressions?.Count!
    if(statementCount != 1) {
        throw {msg: 'Only single statement project operators are currently supported'} as ParseError
    }

    return transformKustoToSql(projectOperator.Expressions?.getItem$1(0).Element$1!)
}

function transformJoin(op: K.Syntax.JoinOperator): ast.Node {
    const joinParameter: K.Syntax.NamedParameter = op.Parameters?.getItem$1(0)!

    //assert.equal(joinParameter?.Name, 'kind', `Unsupported join parameter: ${joinParameter?.Name}`)

    if(joinParameter.Expression?.ConstantValue !== 'inner') {
        throw {msg: `Only inner joins are supported by transliteration. Kind ${joinParameter.Expression?.ConstantValue}`} as ParseError
    }


    const subquery = op.Expression as K.Syntax.ParenthesizedExpression

    if(subquery.Expression?.Kind !== KustoType.NameReference) {
        throw {msg: `Only direct table reference are allowed as subquery in a join. Kind: ${subquery.Expression?.Kind }`} as ParseError
    }

    const rhs = transformTableReference(subquery.Expression as K.Syntax.NameReference)

    assert.equal( op.ConditionClause?.GetChild(1)?.Kind, KustoType.List, `Join on clause is not of type list. Kind ${op.ConditionClause?.GetChild(1)?.Kind}`)

    const conditions = op.ConditionClause?.GetChild(1) as K.Syntax.SyntaxList
    const sqlConditions = []

    for(let i = 0; i < conditions.Count; ++i) {
        const element = conditions.getItem(i) as K.Syntax.SeparatedElement
        sqlConditions.push(transformSelectExpression(element.GetChild(0)!))
    }

    return ast.default.joinExpr({
        jointype: 'JOIN_INNER',
        rarg: rhs,
        usingClause: sqlConditions
    })
}

function transformFilter(filter: K.Syntax.FilterOperator): ast.Node  {
    if(filter.Condition?.Kind === KustoType.GreaterThanExpression) {
        const lexpr = transformSelectExpression(filter.Condition.GetChild(0)!)
        const rexpr = transformSelectExpression(filter.Condition.GetChild(2)!)

        const op = ast.default.string({str:">"})

        return ast.default.aExpr({
            kind: 'AEXPR_OP',
            name: [op],
            lexpr,
            rexpr
        })
    } 
    
    throw {msg: `Filter of type ${syntaxNames[filter.Condition?.Kind!]} is not supported yet`} as ParseError
}
 
function transformKustoToSql(knode: K.Syntax.SyntaxNode | K.Syntax.SyntaxElement): ast.Node {
    if(knode.Kind === KustoType.QueryBlock) {
        return transformQueryRoot(knode as K.Syntax.QueryBlock)
    } else if(knode.Kind === KustoType.ExpressionStatement) {
        return transformQueryStatement(knode as K.Syntax.ExpressionStatement)
    } else if(knode.Kind === KustoType.PipeExpression) {
        return transformPipeExpression(knode as K.Syntax.PipeExpression)
    } else if(knode.Kind === KustoType.NameReference) {
        return ast.default.selectStmt({
            targetList: selectStarTargetList,
            fromClause: [transformTableReference(knode as K.Syntax.NameReference)],
            op: 'SETOP_NONE'
        })
    } else if(knode.Kind === KustoType.SimpleNamedExpression) {
        return transformNamedExpression(knode as K.Syntax.SimpleNamedExpression)
    } else if(knode.Kind === KustoType.ProjectOperator) {
        return transformProjectOperator(knode as K.Syntax.ProjectOperator)
    } else if(knode.Kind === KustoType.JoinOperator) {
        return transformJoin(knode as K.Syntax.JoinOperator)
    } else if(knode.Kind === KustoType.FilterOperator) {
        return transformFilter(knode as K.Syntax.FilterOperator)
    }

    throw {msg: `Not Implemented. Node Kind ${syntaxNames[knode.Kind]}`} as ParseError
}

class ReadLineStream extends TransformStream<string, string> {
    lines: string[] = [""]
    static readonly MAX_HISTORY = 1000

    constructor() {
        super({
            start: () => {},
            transform: (chars, controller) => {
                let currentLine = this.lines[this.lines.length-1]
                let newLineOffset = 0

                for(let i = 0; i < chars.length; ++i) {
                    if(chars.charAt(i) == '\n') {
                        newLineOffset = i + 1
                        const completeLine = currentLine + chars.slice(0, i)
                        this.lines.push(completeLine)
                        currentLine = ""

                        controller.enqueue(completeLine)
                    }
                }

                this.lines[this.lines.length] = currentLine + chars.slice(newLineOffset)
            },
            flush: () => {}
        })
    }

    
}

// Iterator
async function *nextLine() {
    const enc = (s: string) => new TextEncoder().encode(s);

    Deno.stdout.write(enc("query> "))
    
    yield (await Deno.stdin.readable.pipeThrough(new TextDecoderStream()).pipeThrough(new ReadLineStream()).getReader().read()).value!
}

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

Deno.stdin.setRaw(true)


const encoder = new TextEncoder();
const PROMPT = encoder.encode("PROMPT>")

const currentLine = new Uint8Array(10240)
const ctrlLetters = new Uint8Array(10)
ctrlLetters[0] = 13
ctrlLetters[1] = 10

const CARRIAGE_RETURN = ctrlLetters.slice(0,1)
const NEW_LINE = ctrlLetters.slice(0,2)

ctrlLetters[2] = 27
ctrlLetters[3] = 91
ctrlLetters[4] = 68

const CNTRL_LEFT_KEY = ctrlLetters.slice(2,5)

ctrlLetters[5] = 32
const SPACE = ctrlLetters.slice(5,6)


const LEFT_SEQUENCE = [27,91,68]
const UP_SEQUENCE = [27, 91, 65]
const RIGHT_SEQUENCE = [27, 91, 67]

let currentPosition = 0;
let leftSequencePostion = 0; 
let upSequencePostion = 0; 
let rightSequencePostion = 0; 

const history: Uint8Array[] = []
let historicalLine = 0

const transform = new TransformStream({
    
    transform: (chunk: Uint8Array, controller) => {
        let cntrl = false

        for(const unit of chunk) {
            if(unit === 3) {
                exit(-1)
            }

            if(unit === LEFT_SEQUENCE[leftSequencePostion]) {
                ++leftSequencePostion
                cntrl = true
            } else {
                leftSequencePostion = 0
            }
 
            if(unit === UP_SEQUENCE[upSequencePostion]) {
                ++upSequencePostion
                cntrl = true
            } else {
                upSequencePostion = 0
            }

            if(unit === RIGHT_SEQUENCE[rightSequencePostion]) {
                ++rightSequencePostion
                cntrl = true
            } else {
                rightSequencePostion = 0
            }

            if(leftSequencePostion === 3 || unit === 127 /* DEL */) {
                cntrl = true // in case of DEL
                leftSequencePostion = 0
                if(currentPosition > 0) {
                    currentPosition -= 1
                    controller.enqueue(CNTRL_LEFT_KEY)
                    controller.enqueue(SPACE)
                    controller.enqueue(CARRIAGE_RETURN)
                    controller.enqueue(PROMPT)
                    const lineEncoded = currentLine.slice(0, currentPosition)
                    controller.enqueue(lineEncoded)
                }
            }

            if(upSequencePostion == 3) {
                --historicalLine
                
                controller.enqueue(CARRIAGE_RETURN)
                for(let i=0; i < PROMPT.length+currentPosition; ++i) {
                    controller.enqueue(SPACE)
                }
                controller.enqueue(CARRIAGE_RETURN)
                controller.enqueue(PROMPT)

                if(history.length+historicalLine >= 0) {
                    currentLine.set(history[history.length+historicalLine])
                    
                    currentPosition = history[history.length+historicalLine].length

                    controller.enqueue(currentLine.slice(0, currentPosition))
                } else {
                    currentPosition = 0
                }

                upSequencePostion = 0
            }

            if(cntrl) {
                cntrl = false
                continue
            }
            
            if (unit === 13 ) {
                controller.enqueue(NEW_LINE)

                const lineEncoded = currentLine.slice(0, currentPosition)
                historicalLine=0
                history.push(lineEncoded)

                const decoder = new TextDecoder();
                const line = decoder.decode(lineEncoded)
                currentPosition = 0

                const output = processLine(line)
                const outputEncoded = encoder.encode(output)
                
                controller.enqueue(outputEncoded)
                controller.enqueue(NEW_LINE)
                controller.enqueue(PROMPT)

                continue
            } else {
                currentLine.set(chunk, currentPosition)
                currentPosition += chunk.length
            }

            controller.enqueue(chunk)
        }        
    }
})

Deno.stdout.write(PROMPT)
Deno.stdin.readable.pipeThrough(transform).pipeTo(Deno.stdout.writable)
