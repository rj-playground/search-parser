import 'npm:bridge.net'
import 'npm:@kusto/language-service-next';

import ast from 'npm:@pgsql/utils'

import * as assert from "node:assert";

import K = Kusto.Language 
import KustoType = K.Syntax.SyntaxKind

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
 
export function transformKustoToSql(knode: K.Syntax.SyntaxNode | K.Syntax.SyntaxElement): ast.Node {
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