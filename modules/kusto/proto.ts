import { ColumnRefSchema, NodeSchema, Node as ProtobufNode, } from './pg_query_pb.ts'

import ast from 'npm:@pgsql/utils'

import { createFromTypeName, KustASTTypeGuards } from "./typechecks.ts";
import { toJsonString, create } from "npm:@bufbuild/protobuf";
import { ColumnRef } from "./pg_query_pb.ts";
import { toBinary } from "npm:@bufbuild/protobuf";

import * as base64 from "jsr:@std/encoding/base64";


function checkTypeProgrammatically(obj: any): string {
    for (const key in KustASTTypeGuards) {
      if (KustASTTypeGuards[key](obj)) {
        return key;
      }
    }
    return 'Unknown';
}


function lowerFirstChar(str: string): string {
    if (str.length === 0) return str 
    return (str.charAt(0).toLowerCase() + str.slice(1)) 
}

export function toProto<T>(obj: T): ProtobufNode | undefined {
    const astType = checkTypeProgrammatically(obj)
    if(astType === 'unknown') {
        return undefined
    }

    const result: any = {}

    for(const k in obj) {
        //Single Nested
        for(const l in obj[k]) {            
            if(Array.isArray(obj[k][l]) && checkTypeProgrammatically(obj[k][l][0]) !== 'Unknown') {
                const astType = checkTypeProgrammatically(obj[k][l][0])
                result[l] = obj[k][l].map((t) => {
                    return { node : { case: lowerFirstChar(astType),  value: createFromTypeName(astType, toProto(t)) } };
                })
                continue;
            }

            const astType = checkTypeProgrammatically([obj[k][l]])
            if(astType !== 'Unknown') {
                result[l] =  { node : { case: lowerFirstChar(astType),  value: createFromTypeName(astType, toProto(obj[k][l])) } }
            }

            result[l] = obj[k][l]
        }
    }

    return createFromTypeName(astType,result)
}

const s = toProto(
    ast.default.columnRef({
        fields: [
            ast.default.string({
                str: 'aasdad'
            })
        ]
    })
)


const bin = toBinary(NodeSchema, create(NodeSchema, {node: {case: 'columnRef', value: s as ColumnRef}}))

console.log(base64.encodeBase64(bin))

console.log(s)



Deno.test("Converting between pg typescript class and protobuf classes", () => {
    const s = toProto(
        ast.default.columnRef({
            fields: [
                ast.default.string({
                    str: 'aasdad'
                })
            ]
        })
    )

    console.log(JSON.stringify(s))
})