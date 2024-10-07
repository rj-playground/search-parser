import { A_ConstSchema, A_Expr, A_Expr_Kind, ColumnRefSchema, JsonObjectAggSchema, LimitOption, NodeJson, NodeSchema, Node as ProtobufNode, } from './pg_query_pb.ts'

import ast from 'npm:@pgsql/utils'

import { createFromTypeName, KustASTTypeGuards } from "./typechecks.ts";
import { toJsonString, create } from "npm:@bufbuild/protobuf";
import { ColumnRef } from "./pg_query_pb.ts";
import { toBinary } from "npm:@bufbuild/protobuf";

import * as base64 from "jsr:@std/encoding/base64";
import { A_Const } from "./pg_query_pb.ts";
import { SetOperation } from "./pg_query_pb.ts";
import assert  from "node:assert";


function checkTypeProgrammatically(obj: any): string {
    if(typeof obj !== 'object') {
        return 'Unknown'
    }

    for (const key in KustASTTypeGuards) {
      if (KustASTTypeGuards[key](obj)) {
        return key;
      }
    }
    return 'Unknown';
}


function lowerFirstChar(str: string): string {
    if (str.length === 0) return str 
    return (str.charAt(0).toLowerCase() + str.slice(1).replaceAll('_', '')) 
}


function toProtoJson(obj: ast.Node): NodeJson | undefined {
    const astType = checkTypeProgrammatically(obj)
    if(astType === 'unknown') {
        return undefined
    }

    if(astType === 'String') {
        return {node: { case: 'string', value: {sval: (obj as ast.String).String.str } }}
    }

    if(astType === 'A_Const') {
        const val = (obj as ast.A_Const).A_Const.val!
        const cType = checkTypeProgrammatically(val)
        
        if ( cType === 'String') {
            return {node: { case: 'aConst', value: {val: { case: 'sval', value: {sval: (val as ast.String).String.str } }} } }
        } else if (cType === 'Float' ) {
            return {node: { case: 'aConst', value: {val: { case: 'fval', value: { fval: (val as ast.Float).Float.str } }}} }
        } else {
            console.log(cType)
        }
        
    }

    if(astType === 'A_Expr') {
        const expr = (obj as ast.A_Expr).A_Expr

        assert.equal(expr.kind, 'AEXPR_OP', "Only aexpr op is supported currently for A_EXPR kind")

        return { 
            node: 
            {
                case: 'aExpr',
                value: {
                    kind: A_Expr_Kind.AEXPR_OP,
                    lexpr: toProtoJson(expr.lexpr!),
                    name: [toProtoJson(expr.name![0])],
                    rexpr: toProtoJson(expr.rexpr!)
                } as A_Expr
            }
        }
    }

    const result: any = {}

    for(const k in obj) {
        //Single Nested
        for(const l in obj[k]) {            
            if(Array.isArray(obj[k][l]) && checkTypeProgrammatically(obj[k][l][0]) !== 'Unknown') {
                const astType = checkTypeProgrammatically(obj[k][l][0])
                result[l] = obj[k][l].map((t) => {
                    return toProtoJson(t)
                })

                continue;
            }

            const astType = checkTypeProgrammatically(obj[k][l])
            if(astType !== 'Unknown') {
                result[l] =  toProtoJson(obj[k][l]) 
                continue;
            }

            result[l] = obj[k][l]    
        }
    }

    if(astType === 'SelectStmt') {
        result['op'] = SetOperation.SETOP_NONE //Todo: fix
    }

    return {node: {case: lowerFirstChar(astType), value: result}}
}

export function toProtoBinary(query: ast.Node): Uint8Array {
    const astType = checkTypeProgrammatically(query)
    if(astType === 'unknown') {
        throw "Unable to convert pg ast to binary proto. Unknown type."
    }

    const tree = toProtoJson(query)


    const q = create(NodeSchema, tree)
    console.log(JSON.stringify(q))

    const bin = toBinary(NodeSchema, q)

    console.log("ok")

    if(bin === undefined) {
        throw "Unable to convert pg ast to binary proto"
    }

    return bin
}







Deno.test("Converting between pg typescript class and protobuf classes", () => {
    const t = ast.default.selectStmt({
        targetList: [ast.default.columnRef({
            fields: [
                ast.default.string({
                    str: 'aasdad'
                })
            ]
        })],
        fromClause: [ast.default.aConst({
            val: 
            ast.default.string({
                str: 's'
            })
        })]
    }) 

    const x = toProtoJson(t) 
    const s = create(NodeSchema, x)

    const bin = toProtoBinary(t)

    console.log(base64.encodeBase64(bin))
    
    console.log(s)
})