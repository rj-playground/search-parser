import ast from 'npm:@pgsql/utils'
import { create } from "npm:@bufbuild/protobuf";

import * as ProtoType from './pg_query_pb.ts'

function isAParseResult(obj: any): obj is ast.ParseResult { return 'ParseResult' in obj }
function isAScanResult(obj: any): obj is ast.ScanResult { return 'ScanResult' in obj }
function isAInteger(obj: any): obj is ast.Integer { return 'Integer' in obj }
function isAFloat(obj: any): obj is ast.Float { return 'Float' in obj }
function isAString(obj: any): obj is ast.String { return 'String' in obj }
function isABitString(obj: any): obj is ast.BitString { return 'BitString' in obj }
function isANull(obj: any): obj is ast.Null { return 'Null' in obj }
function isAList(obj: any): obj is ast.List { return 'List' in obj }
function isAOidList(obj: any): obj is ast.OidList { return 'OidList' in obj }
function isAIntList(obj: any): obj is ast.IntList { return 'IntList' in obj }
function isAAlias(obj: any): obj is ast.Alias { return 'Alias' in obj }
function isARangeVar(obj: any): obj is ast.RangeVar { return 'RangeVar' in obj }
function isATableFunc(obj: any): obj is ast.TableFunc { return 'TableFunc' in obj }
function isAExpr(obj: any): obj is ast.Expr { return 'Expr' in obj }
function isAVar(obj: any): obj is ast.Var { return 'Var' in obj }
function isAParam(obj: any): obj is ast.Param { return 'Param' in obj }
function isAAggref(obj: any): obj is ast.Aggref { return 'Aggref' in obj }
function isAGroupingFunc(obj: any): obj is ast.GroupingFunc { return 'GroupingFunc' in obj }
function isAWindowFunc(obj: any): obj is ast.WindowFunc { return 'WindowFunc' in obj }
function isASubscriptingRef(obj: any): obj is ast.SubscriptingRef { return 'SubscriptingRef' in obj }
function isAFuncExpr(obj: any): obj is ast.FuncExpr { return 'FuncExpr' in obj }
function isANamedArgExpr(obj: any): obj is ast.NamedArgExpr { return 'NamedArgExpr' in obj }
function isAOpExpr(obj: any): obj is ast.OpExpr { return 'OpExpr' in obj }
function isADistinctExpr(obj: any): obj is ast.DistinctExpr { return 'DistinctExpr' in obj }
function isANullIfExpr(obj: any): obj is ast.NullIfExpr { return 'NullIfExpr' in obj }
function isAScalarArrayOpExpr(obj: any): obj is ast.ScalarArrayOpExpr { return 'ScalarArrayOpExpr' in obj }
function isABoolExpr(obj: any): obj is ast.BoolExpr { return 'BoolExpr' in obj }
function isASubLink(obj: any): obj is ast.SubLink { return 'SubLink' in obj }
function isASubPlan(obj: any): obj is ast.SubPlan { return 'SubPlan' in obj }
function isAAlternativeSubPlan(obj: any): obj is ast.AlternativeSubPlan { return 'AlternativeSubPlan' in obj }
function isAFieldSelect(obj: any): obj is ast.FieldSelect { return 'FieldSelect' in obj }
function isAFieldStore(obj: any): obj is ast.FieldStore { return 'FieldStore' in obj }
function isARelabelType(obj: any): obj is ast.RelabelType { return 'RelabelType' in obj }
function isACoerceViaIO(obj: any): obj is ast.CoerceViaIO { return 'CoerceViaIO' in obj }
function isAArrayCoerceExpr(obj: any): obj is ast.ArrayCoerceExpr { return 'ArrayCoerceExpr' in obj }
function isAConvertRowtypeExpr(obj: any): obj is ast.ConvertRowtypeExpr { return 'ConvertRowtypeExpr' in obj }
function isACollateExpr(obj: any): obj is ast.CollateExpr { return 'CollateExpr' in obj }
function isACaseExpr(obj: any): obj is ast.CaseExpr { return 'CaseExpr' in obj }
function isACaseWhen(obj: any): obj is ast.CaseWhen { return 'CaseWhen' in obj }
function isACaseTestExpr(obj: any): obj is ast.CaseTestExpr { return 'CaseTestExpr' in obj }
function isAArrayExpr(obj: any): obj is ast.ArrayExpr { return 'ArrayExpr' in obj }
function isARowExpr(obj: any): obj is ast.RowExpr { return 'RowExpr' in obj }
function isARowCompareExpr(obj: any): obj is ast.RowCompareExpr { return 'RowCompareExpr' in obj }
function isACoalesceExpr(obj: any): obj is ast.CoalesceExpr { return 'CoalesceExpr' in obj }
function isAMinMaxExpr(obj: any): obj is ast.MinMaxExpr { return 'MinMaxExpr' in obj }
function isASQLValueFunction(obj: any): obj is ast.SQLValueFunction { return 'SQLValueFunction' in obj }
function isAXmlExpr(obj: any): obj is ast.XmlExpr { return 'XmlExpr' in obj }
function isANullTest(obj: any): obj is ast.NullTest { return 'NullTest' in obj }
function isABooleanTest(obj: any): obj is ast.BooleanTest { return 'BooleanTest' in obj }
function isACoerceToDomain(obj: any): obj is ast.CoerceToDomain { return 'CoerceToDomain' in obj }
function isACoerceToDomainValue(obj: any): obj is ast.CoerceToDomainValue { return 'CoerceToDomainValue' in obj }
function isASetToDefault(obj: any): obj is ast.SetToDefault { return 'SetToDefault' in obj }
function isACurrentOfExpr(obj: any): obj is ast.CurrentOfExpr { return 'CurrentOfExpr' in obj }
function isANextValueExpr(obj: any): obj is ast.NextValueExpr { return 'NextValueExpr' in obj }
function isAInferenceElem(obj: any): obj is ast.InferenceElem { return 'InferenceElem' in obj }
function isATargetEntry(obj: any): obj is ast.TargetEntry { return 'TargetEntry' in obj }
function isARangeTblRef(obj: any): obj is ast.RangeTblRef { return 'RangeTblRef' in obj }
function isAJoinExpr(obj: any): obj is ast.JoinExpr { return 'JoinExpr' in obj }
function isAFromExpr(obj: any): obj is ast.FromExpr { return 'FromExpr' in obj }
function isAOnConflictExpr(obj: any): obj is ast.OnConflictExpr { return 'OnConflictExpr' in obj }
function isAIntoClause(obj: any): obj is ast.IntoClause { return 'IntoClause' in obj }
function isARawStmt(obj: any): obj is ast.RawStmt { return 'RawStmt' in obj }
function isAQuery(obj: any): obj is ast.Query { return 'Query' in obj }
function isAInsertStmt(obj: any): obj is ast.InsertStmt { return 'InsertStmt' in obj }
function isADeleteStmt(obj: any): obj is ast.DeleteStmt { return 'DeleteStmt' in obj }
function isAUpdateStmt(obj: any): obj is ast.UpdateStmt { return 'UpdateStmt' in obj }
function isASelectStmt(obj: any): obj is ast.SelectStmt { return 'SelectStmt' in obj }
function isAAlterTableStmt(obj: any): obj is ast.AlterTableStmt { return 'AlterTableStmt' in obj }
function isAAlterTableCmd(obj: any): obj is ast.AlterTableCmd { return 'AlterTableCmd' in obj }
function isAAlterDomainStmt(obj: any): obj is ast.AlterDomainStmt { return 'AlterDomainStmt' in obj }
function isASetOperationStmt(obj: any): obj is ast.SetOperationStmt { return 'SetOperationStmt' in obj }
function isAGrantStmt(obj: any): obj is ast.GrantStmt { return 'GrantStmt' in obj }
function isAGrantRoleStmt(obj: any): obj is ast.GrantRoleStmt { return 'GrantRoleStmt' in obj }
function isAAlterDefaultPrivilegesStmt(obj: any): obj is ast.AlterDefaultPrivilegesStmt { return 'AlterDefaultPrivilegesStmt' in obj }
function isAClosePortalStmt(obj: any): obj is ast.ClosePortalStmt { return 'ClosePortalStmt' in obj }
function isAClusterStmt(obj: any): obj is ast.ClusterStmt { return 'ClusterStmt' in obj }
function isACopyStmt(obj: any): obj is ast.CopyStmt { return 'CopyStmt' in obj }
function isACreateStmt(obj: any): obj is ast.CreateStmt { return 'CreateStmt' in obj }
function isADefineStmt(obj: any): obj is ast.DefineStmt { return 'DefineStmt' in obj }
function isADropStmt(obj: any): obj is ast.DropStmt { return 'DropStmt' in obj }
function isATruncateStmt(obj: any): obj is ast.TruncateStmt { return 'TruncateStmt' in obj }
function isACommentStmt(obj: any): obj is ast.CommentStmt { return 'CommentStmt' in obj }
function isAFetchStmt(obj: any): obj is ast.FetchStmt { return 'FetchStmt' in obj }
function isAIndexStmt(obj: any): obj is ast.IndexStmt { return 'IndexStmt' in obj }
function isACreateFunctionStmt(obj: any): obj is ast.CreateFunctionStmt { return 'CreateFunctionStmt' in obj }
function isAAlterFunctionStmt(obj: any): obj is ast.AlterFunctionStmt { return 'AlterFunctionStmt' in obj }
function isADoStmt(obj: any): obj is ast.DoStmt { return 'DoStmt' in obj }
function isARenameStmt(obj: any): obj is ast.RenameStmt { return 'RenameStmt' in obj }
function isARuleStmt(obj: any): obj is ast.RuleStmt { return 'RuleStmt' in obj }
function isANotifyStmt(obj: any): obj is ast.NotifyStmt { return 'NotifyStmt' in obj }
function isAListenStmt(obj: any): obj is ast.ListenStmt { return 'ListenStmt' in obj }
function isAUnlistenStmt(obj: any): obj is ast.UnlistenStmt { return 'UnlistenStmt' in obj }
function isATransactionStmt(obj: any): obj is ast.TransactionStmt { return 'TransactionStmt' in obj }
function isAViewStmt(obj: any): obj is ast.ViewStmt { return 'ViewStmt' in obj }
function isALoadStmt(obj: any): obj is ast.LoadStmt { return 'LoadStmt' in obj }
function isACreateDomainStmt(obj: any): obj is ast.CreateDomainStmt { return 'CreateDomainStmt' in obj }
function isACreatedbStmt(obj: any): obj is ast.CreatedbStmt { return 'CreatedbStmt' in obj }
function isADropdbStmt(obj: any): obj is ast.DropdbStmt { return 'DropdbStmt' in obj }
function isAVacuumStmt(obj: any): obj is ast.VacuumStmt { return 'VacuumStmt' in obj }
function isAExplainStmt(obj: any): obj is ast.ExplainStmt { return 'ExplainStmt' in obj }
function isACreateTableAsStmt(obj: any): obj is ast.CreateTableAsStmt { return 'CreateTableAsStmt' in obj }
function isACreateSeqStmt(obj: any): obj is ast.CreateSeqStmt { return 'CreateSeqStmt' in obj }
function isAAlterSeqStmt(obj: any): obj is ast.AlterSeqStmt { return 'AlterSeqStmt' in obj }
function isAVariableSetStmt(obj: any): obj is ast.VariableSetStmt { return 'VariableSetStmt' in obj }
function isAVariableShowStmt(obj: any): obj is ast.VariableShowStmt { return 'VariableShowStmt' in obj }
function isADiscardStmt(obj: any): obj is ast.DiscardStmt { return 'DiscardStmt' in obj }
function isACreateTrigStmt(obj: any): obj is ast.CreateTrigStmt { return 'CreateTrigStmt' in obj }
function isACreatePLangStmt(obj: any): obj is ast.CreatePLangStmt { return 'CreatePLangStmt' in obj }
function isACreateRoleStmt(obj: any): obj is ast.CreateRoleStmt { return 'CreateRoleStmt' in obj }
function isAAlterRoleStmt(obj: any): obj is ast.AlterRoleStmt { return 'AlterRoleStmt' in obj }
function isADropRoleStmt(obj: any): obj is ast.DropRoleStmt { return 'DropRoleStmt' in obj }
function isALockStmt(obj: any): obj is ast.LockStmt { return 'LockStmt' in obj }
function isAConstraintsSetStmt(obj: any): obj is ast.ConstraintsSetStmt { return 'ConstraintsSetStmt' in obj }
function isAReindexStmt(obj: any): obj is ast.ReindexStmt { return 'ReindexStmt' in obj }
function isACheckPointStmt(obj: any): obj is ast.CheckPointStmt { return 'CheckPointStmt' in obj }
function isACreateSchemaStmt(obj: any): obj is ast.CreateSchemaStmt { return 'CreateSchemaStmt' in obj }
function isAAlterDatabaseStmt(obj: any): obj is ast.AlterDatabaseStmt { return 'AlterDatabaseStmt' in obj }
function isAAlterDatabaseSetStmt(obj: any): obj is ast.AlterDatabaseSetStmt { return 'AlterDatabaseSetStmt' in obj }
function isAAlterRoleSetStmt(obj: any): obj is ast.AlterRoleSetStmt { return 'AlterRoleSetStmt' in obj }
function isACreateConversionStmt(obj: any): obj is ast.CreateConversionStmt { return 'CreateConversionStmt' in obj }
function isACreateCastStmt(obj: any): obj is ast.CreateCastStmt { return 'CreateCastStmt' in obj }
function isACreateOpClassStmt(obj: any): obj is ast.CreateOpClassStmt { return 'CreateOpClassStmt' in obj }
function isACreateOpFamilyStmt(obj: any): obj is ast.CreateOpFamilyStmt { return 'CreateOpFamilyStmt' in obj }
function isAAlterOpFamilyStmt(obj: any): obj is ast.AlterOpFamilyStmt { return 'AlterOpFamilyStmt' in obj }
function isAPrepareStmt(obj: any): obj is ast.PrepareStmt { return 'PrepareStmt' in obj }
function isAExecuteStmt(obj: any): obj is ast.ExecuteStmt { return 'ExecuteStmt' in obj }
function isADeallocateStmt(obj: any): obj is ast.DeallocateStmt { return 'DeallocateStmt' in obj }
function isADeclareCursorStmt(obj: any): obj is ast.DeclareCursorStmt { return 'DeclareCursorStmt' in obj }
function isACreateTableSpaceStmt(obj: any): obj is ast.CreateTableSpaceStmt { return 'CreateTableSpaceStmt' in obj }
function isADropTableSpaceStmt(obj: any): obj is ast.DropTableSpaceStmt { return 'DropTableSpaceStmt' in obj }
function isAAlterObjectDependsStmt(obj: any): obj is ast.AlterObjectDependsStmt { return 'AlterObjectDependsStmt' in obj }
function isAAlterObjectSchemaStmt(obj: any): obj is ast.AlterObjectSchemaStmt { return 'AlterObjectSchemaStmt' in obj }
function isAAlterOwnerStmt(obj: any): obj is ast.AlterOwnerStmt { return 'AlterOwnerStmt' in obj }
function isAAlterOperatorStmt(obj: any): obj is ast.AlterOperatorStmt { return 'AlterOperatorStmt' in obj }
function isAAlterTypeStmt(obj: any): obj is ast.AlterTypeStmt { return 'AlterTypeStmt' in obj }
function isADropOwnedStmt(obj: any): obj is ast.DropOwnedStmt { return 'DropOwnedStmt' in obj }
function isAReassignOwnedStmt(obj: any): obj is ast.ReassignOwnedStmt { return 'ReassignOwnedStmt' in obj }
function isACompositeTypeStmt(obj: any): obj is ast.CompositeTypeStmt { return 'CompositeTypeStmt' in obj }
function isACreateEnumStmt(obj: any): obj is ast.CreateEnumStmt { return 'CreateEnumStmt' in obj }
function isACreateRangeStmt(obj: any): obj is ast.CreateRangeStmt { return 'CreateRangeStmt' in obj }
function isAAlterEnumStmt(obj: any): obj is ast.AlterEnumStmt { return 'AlterEnumStmt' in obj }
function isAAlterTSDictionaryStmt(obj: any): obj is ast.AlterTSDictionaryStmt { return 'AlterTSDictionaryStmt' in obj }
function isAAlterTSConfigurationStmt(obj: any): obj is ast.AlterTSConfigurationStmt { return 'AlterTSConfigurationStmt' in obj }
function isACreateFdwStmt(obj: any): obj is ast.CreateFdwStmt { return 'CreateFdwStmt' in obj }
function isAAlterFdwStmt(obj: any): obj is ast.AlterFdwStmt { return 'AlterFdwStmt' in obj }
function isACreateForeignServerStmt(obj: any): obj is ast.CreateForeignServerStmt { return 'CreateForeignServerStmt' in obj }
function isAAlterForeignServerStmt(obj: any): obj is ast.AlterForeignServerStmt { return 'AlterForeignServerStmt' in obj }
function isACreateUserMappingStmt(obj: any): obj is ast.CreateUserMappingStmt { return 'CreateUserMappingStmt' in obj }
function isAAlterUserMappingStmt(obj: any): obj is ast.AlterUserMappingStmt { return 'AlterUserMappingStmt' in obj }
function isADropUserMappingStmt(obj: any): obj is ast.DropUserMappingStmt { return 'DropUserMappingStmt' in obj }
function isAAlterTableSpaceOptionsStmt(obj: any): obj is ast.AlterTableSpaceOptionsStmt { return 'AlterTableSpaceOptionsStmt' in obj }
function isAAlterTableMoveAllStmt(obj: any): obj is ast.AlterTableMoveAllStmt { return 'AlterTableMoveAllStmt' in obj }
function isASecLabelStmt(obj: any): obj is ast.SecLabelStmt { return 'SecLabelStmt' in obj }
function isACreateForeignTableStmt(obj: any): obj is ast.CreateForeignTableStmt { return 'CreateForeignTableStmt' in obj }
function isAImportForeignSchemaStmt(obj: any): obj is ast.ImportForeignSchemaStmt { return 'ImportForeignSchemaStmt' in obj }
function isACreateExtensionStmt(obj: any): obj is ast.CreateExtensionStmt { return 'CreateExtensionStmt' in obj }
function isAAlterExtensionStmt(obj: any): obj is ast.AlterExtensionStmt { return 'AlterExtensionStmt' in obj }
function isAAlterExtensionContentsStmt(obj: any): obj is ast.AlterExtensionContentsStmt { return 'AlterExtensionContentsStmt' in obj }
function isACreateEventTrigStmt(obj: any): obj is ast.CreateEventTrigStmt { return 'CreateEventTrigStmt' in obj }
function isAAlterEventTrigStmt(obj: any): obj is ast.AlterEventTrigStmt { return 'AlterEventTrigStmt' in obj }
function isARefreshMatViewStmt(obj: any): obj is ast.RefreshMatViewStmt { return 'RefreshMatViewStmt' in obj }
function isAReplicaIdentityStmt(obj: any): obj is ast.ReplicaIdentityStmt { return 'ReplicaIdentityStmt' in obj }
function isAAlterSystemStmt(obj: any): obj is ast.AlterSystemStmt { return 'AlterSystemStmt' in obj }
function isACreatePolicyStmt(obj: any): obj is ast.CreatePolicyStmt { return 'CreatePolicyStmt' in obj }
function isAAlterPolicyStmt(obj: any): obj is ast.AlterPolicyStmt { return 'AlterPolicyStmt' in obj }
function isACreateTransformStmt(obj: any): obj is ast.CreateTransformStmt { return 'CreateTransformStmt' in obj }
function isACreateAmStmt(obj: any): obj is ast.CreateAmStmt { return 'CreateAmStmt' in obj }
function isACreatePublicationStmt(obj: any): obj is ast.CreatePublicationStmt { return 'CreatePublicationStmt' in obj }
function isAAlterPublicationStmt(obj: any): obj is ast.AlterPublicationStmt { return 'AlterPublicationStmt' in obj }
function isACreateSubscriptionStmt(obj: any): obj is ast.CreateSubscriptionStmt { return 'CreateSubscriptionStmt' in obj }
function isAAlterSubscriptionStmt(obj: any): obj is ast.AlterSubscriptionStmt { return 'AlterSubscriptionStmt' in obj }
function isADropSubscriptionStmt(obj: any): obj is ast.DropSubscriptionStmt { return 'DropSubscriptionStmt' in obj }
function isACreateStatsStmt(obj: any): obj is ast.CreateStatsStmt { return 'CreateStatsStmt' in obj }
function isAAlterCollationStmt(obj: any): obj is ast.AlterCollationStmt { return 'AlterCollationStmt' in obj }
function isACallStmt(obj: any): obj is ast.CallStmt { return 'CallStmt' in obj }
function isAAlterStatsStmt(obj: any): obj is ast.AlterStatsStmt { return 'AlterStatsStmt' in obj }
function isAA_Expr(obj: any): obj is ast.A_Expr { return 'A_Expr' in obj }
function isAColumnRef(obj: any): obj is ast.ColumnRef { return 'ColumnRef' in obj }
function isAParamRef(obj: any): obj is ast.ParamRef { return 'ParamRef' in obj }
function isAA_Const(obj: any): obj is ast.A_Const { return 'A_Const' in obj }
function isAFuncCall(obj: any): obj is ast.FuncCall { return 'FuncCall' in obj }
function isAA_Star(obj: any): obj is ast.A_Star { return 'A_Star' in obj }
function isAA_Indices(obj: any): obj is ast.A_Indices { return 'A_Indices' in obj }
function isAA_Indirection(obj: any): obj is ast.A_Indirection { return 'A_Indirection' in obj }
function isAA_ArrayExpr(obj: any): obj is ast.A_ArrayExpr { return 'A_ArrayExpr' in obj }
function isAResTarget(obj: any): obj is ast.ResTarget { return 'ResTarget' in obj }
function isAMultiAssignRef(obj: any): obj is ast.MultiAssignRef { return 'MultiAssignRef' in obj }
function isATypeCast(obj: any): obj is ast.TypeCast { return 'TypeCast' in obj }
function isACollateClause(obj: any): obj is ast.CollateClause { return 'CollateClause' in obj }
function isASortBy(obj: any): obj is ast.SortBy { return 'SortBy' in obj }
function isAWindowDef(obj: any): obj is ast.WindowDef { return 'WindowDef' in obj }
function isARangeSubselect(obj: any): obj is ast.RangeSubselect { return 'RangeSubselect' in obj }
function isARangeFunction(obj: any): obj is ast.RangeFunction { return 'RangeFunction' in obj }
function isARangeTableSample(obj: any): obj is ast.RangeTableSample { return 'RangeTableSample' in obj }
function isARangeTableFunc(obj: any): obj is ast.RangeTableFunc { return 'RangeTableFunc' in obj }
function isARangeTableFuncCol(obj: any): obj is ast.RangeTableFuncCol { return 'RangeTableFuncCol' in obj }
function isATypeName(obj: any): obj is ast.TypeName { return 'TypeName' in obj }
function isAColumnDef(obj: any): obj is ast.ColumnDef { return 'ColumnDef' in obj }
function isAIndexElem(obj: any): obj is ast.IndexElem { return 'IndexElem' in obj }
function isAConstraint(obj: any): obj is ast.Constraint { return 'Constraint' in obj }
function isADefElem(obj: any): obj is ast.DefElem { return 'DefElem' in obj }
function isARangeTblEntry(obj: any): obj is ast.RangeTblEntry { return 'RangeTblEntry' in obj }
function isARangeTblFunction(obj: any): obj is ast.RangeTblFunction { return 'RangeTblFunction' in obj }
function isATableSampleClause(obj: any): obj is ast.TableSampleClause { return 'TableSampleClause' in obj }
function isAWithCheckOption(obj: any): obj is ast.WithCheckOption { return 'WithCheckOption' in obj }
function isASortGroupClause(obj: any): obj is ast.SortGroupClause { return 'SortGroupClause' in obj }
function isAGroupingSet(obj: any): obj is ast.GroupingSet { return 'GroupingSet' in obj }
function isAWindowClause(obj: any): obj is ast.WindowClause { return 'WindowClause' in obj }
function isAObjectWithArgs(obj: any): obj is ast.ObjectWithArgs { return 'ObjectWithArgs' in obj }
function isAAccessPriv(obj: any): obj is ast.AccessPriv { return 'AccessPriv' in obj }
function isACreateOpClassItem(obj: any): obj is ast.CreateOpClassItem { return 'CreateOpClassItem' in obj }
function isATableLikeClause(obj: any): obj is ast.TableLikeClause { return 'TableLikeClause' in obj }
function isAFunctionParameter(obj: any): obj is ast.FunctionParameter { return 'FunctionParameter' in obj }
function isALockingClause(obj: any): obj is ast.LockingClause { return 'LockingClause' in obj }
function isARowMarkClause(obj: any): obj is ast.RowMarkClause { return 'RowMarkClause' in obj }
function isAXmlSerialize(obj: any): obj is ast.XmlSerialize { return 'XmlSerialize' in obj }
function isAWithClause(obj: any): obj is ast.WithClause { return 'WithClause' in obj }
function isAInferClause(obj: any): obj is ast.InferClause { return 'InferClause' in obj }
function isAOnConflictClause(obj: any): obj is ast.OnConflictClause { return 'OnConflictClause' in obj }
function isACommonTableExpr(obj: any): obj is ast.CommonTableExpr { return 'CommonTableExpr' in obj }
function isARoleSpec(obj: any): obj is ast.RoleSpec { return 'RoleSpec' in obj }
function isATriggerTransition(obj: any): obj is ast.TriggerTransition { return 'TriggerTransition' in obj }
function isAPartitionElem(obj: any): obj is ast.PartitionElem { return 'PartitionElem' in obj }
function isAPartitionSpec(obj: any): obj is ast.PartitionSpec { return 'PartitionSpec' in obj }
function isAPartitionBoundSpec(obj: any): obj is ast.PartitionBoundSpec { return 'PartitionBoundSpec' in obj }
function isAPartitionRangeDatum(obj: any): obj is ast.PartitionRangeDatum { return 'PartitionRangeDatum' in obj }
function isAPartitionCmd(obj: any): obj is ast.PartitionCmd { return 'PartitionCmd' in obj }
function isAVacuumRelation(obj: any): obj is ast.VacuumRelation { return 'VacuumRelation' in obj }
function isAInlineCodeBlock(obj: any): obj is ast.InlineCodeBlock { return 'InlineCodeBlock' in obj }
function isACallContext(obj: any): obj is ast.CallContext { return 'CallContext' in obj }
function isAScanToken(obj: any): obj is ast.ScanToken { return 'ScanToken' in obj }


export const KustASTTypeGuards: { [key: string]: (obj: any) => boolean } = {
    ParseResult: isAParseResult,
    ScanResult: isAScanResult,
    Integer: isAInteger,
    Float: isAFloat,
    String: isAString,
    BitString: isABitString,
    Null: isANull,
    List: isAList,
    OidList: isAOidList,
    IntList: isAIntList,
    Alias: isAAlias,
    RangeVar: isARangeVar,
    TableFunc: isATableFunc,
    Expr: isAExpr,
    Var: isAVar,
    Param: isAParam,
    Aggref: isAAggref,
    GroupingFunc: isAGroupingFunc,
    WindowFunc: isAWindowFunc,
    SubscriptingRef: isASubscriptingRef,
    FuncExpr: isAFuncExpr,
    NamedArgExpr: isANamedArgExpr,
    OpExpr: isAOpExpr,
    DistinctExpr: isADistinctExpr,
    NullIfExpr: isANullIfExpr,
    ScalarArrayOpExpr: isAScalarArrayOpExpr,
    BoolExpr: isABoolExpr,
    SubLink: isASubLink,
    SubPlan: isASubPlan,
    AlternativeSubPlan: isAAlternativeSubPlan,
    FieldSelect: isAFieldSelect,
    FieldStore: isAFieldStore,
    RelabelType: isARelabelType,
    CoerceViaIO: isACoerceViaIO,
    ArrayCoerceExpr: isAArrayCoerceExpr,
    ConvertRowtypeExpr: isAConvertRowtypeExpr,
    CollateExpr: isACollateExpr,
    CaseExpr: isACaseExpr,
    CaseWhen: isACaseWhen,
    CaseTestExpr: isACaseTestExpr,
    ArrayExpr: isAArrayExpr,
    RowExpr: isARowExpr,
    RowCompareExpr: isARowCompareExpr,
    CoalesceExpr: isACoalesceExpr,
    MinMaxExpr: isAMinMaxExpr,
    SQLValueFunction: isASQLValueFunction,
    XmlExpr: isAXmlExpr,
    NullTest: isANullTest,
    BooleanTest: isABooleanTest,
    CoerceToDomain: isACoerceToDomain,
    CoerceToDomainValue: isACoerceToDomainValue,
    SetToDefault: isASetToDefault,
    CurrentOfExpr: isACurrentOfExpr,
    NextValueExpr: isANextValueExpr,
    InferenceElem: isAInferenceElem,
    TargetEntry: isATargetEntry,
    RangeTblRef: isARangeTblRef,
    JoinExpr: isAJoinExpr,
    FromExpr: isAFromExpr,
    OnConflictExpr: isAOnConflictExpr,
    IntoClause: isAIntoClause,
    RawStmt: isARawStmt,
    Query: isAQuery,
    InsertStmt: isAInsertStmt,
    DeleteStmt: isADeleteStmt,
    UpdateStmt: isAUpdateStmt,
    SelectStmt: isASelectStmt,
    AlterTableStmt: isAAlterTableStmt,
    AlterTableCmd: isAAlterTableCmd,
    AlterDomainStmt: isAAlterDomainStmt,
    SetOperationStmt: isASetOperationStmt,
    GrantStmt: isAGrantStmt,
    GrantRoleStmt: isAGrantRoleStmt,
    AlterDefaultPrivilegesStmt: isAAlterDefaultPrivilegesStmt,
    ClosePortalStmt: isAClosePortalStmt,
    ClusterStmt: isAClusterStmt,
    CopyStmt: isACopyStmt,
    CreateStmt: isACreateStmt,
    DefineStmt: isADefineStmt,
    DropStmt: isADropStmt,
    TruncateStmt: isATruncateStmt,
    CommentStmt: isACommentStmt,
    FetchStmt: isAFetchStmt,
    IndexStmt: isAIndexStmt,
    CreateFunctionStmt: isACreateFunctionStmt,
    AlterFunctionStmt: isAAlterFunctionStmt,
    DoStmt: isADoStmt,
    RenameStmt: isARenameStmt,
    RuleStmt: isARuleStmt,
    NotifyStmt: isANotifyStmt,
    ListenStmt: isAListenStmt,
    UnlistenStmt: isAUnlistenStmt,
    TransactionStmt: isATransactionStmt,
    ViewStmt: isAViewStmt,
    LoadStmt: isALoadStmt,
    CreateDomainStmt: isACreateDomainStmt,
    CreatedbStmt: isACreatedbStmt,
    DropdbStmt: isADropdbStmt,
    VacuumStmt: isAVacuumStmt,
    ExplainStmt: isAExplainStmt,
    CreateTableAsStmt: isACreateTableAsStmt,
    CreateSeqStmt: isACreateSeqStmt,
    AlterSeqStmt: isAAlterSeqStmt,
    VariableSetStmt: isAVariableSetStmt,
    VariableShowStmt: isAVariableShowStmt,
    DiscardStmt: isADiscardStmt,
    CreateTrigStmt: isACreateTrigStmt,
    CreatePLangStmt: isACreatePLangStmt,
    CreateRoleStmt: isACreateRoleStmt,
    AlterRoleStmt: isAAlterRoleStmt,
    DropRoleStmt: isADropRoleStmt,
    LockStmt: isALockStmt,
    ConstraintsSetStmt: isAConstraintsSetStmt,
    ReindexStmt: isAReindexStmt,
    CheckPointStmt: isACheckPointStmt,
    CreateSchemaStmt: isACreateSchemaStmt,
    AlterDatabaseStmt: isAAlterDatabaseStmt,
    AlterDatabaseSetStmt: isAAlterDatabaseSetStmt,
    AlterRoleSetStmt: isAAlterRoleSetStmt,
    CreateConversionStmt: isACreateConversionStmt,
    CreateCastStmt: isACreateCastStmt,
    CreateOpClassStmt: isACreateOpClassStmt,
    CreateOpFamilyStmt: isACreateOpFamilyStmt,
    AlterOpFamilyStmt: isAAlterOpFamilyStmt,
    PrepareStmt: isAPrepareStmt,
    ExecuteStmt: isAExecuteStmt,
    DeallocateStmt: isADeallocateStmt,
    DeclareCursorStmt: isADeclareCursorStmt,
    CreateTableSpaceStmt: isACreateTableSpaceStmt,
    DropTableSpaceStmt: isADropTableSpaceStmt,
    AlterObjectDependsStmt: isAAlterObjectDependsStmt,
    AlterObjectSchemaStmt: isAAlterObjectSchemaStmt,
    AlterOwnerStmt: isAAlterOwnerStmt,
    AlterOperatorStmt: isAAlterOperatorStmt,
    AlterTypeStmt: isAAlterTypeStmt,
    DropOwnedStmt: isADropOwnedStmt,
    ReassignOwnedStmt: isAReassignOwnedStmt,
    CompositeTypeStmt: isACompositeTypeStmt,
    CreateEnumStmt: isACreateEnumStmt,
    CreateRangeStmt: isACreateRangeStmt,
    AlterEnumStmt: isAAlterEnumStmt,
    AlterTSDictionaryStmt: isAAlterTSDictionaryStmt,
    AlterTSConfigurationStmt: isAAlterTSConfigurationStmt,
    CreateFdwStmt: isACreateFdwStmt,
    AlterFdwStmt: isAAlterFdwStmt,
    CreateForeignServerStmt: isACreateForeignServerStmt,
    AlterForeignServerStmt: isAAlterForeignServerStmt,
    CreateUserMappingStmt: isACreateUserMappingStmt,
    AlterUserMappingStmt: isAAlterUserMappingStmt,
    DropUserMappingStmt: isADropUserMappingStmt,
    AlterTableSpaceOptionsStmt: isAAlterTableSpaceOptionsStmt,
    AlterTableMoveAllStmt: isAAlterTableMoveAllStmt,
    SecLabelStmt: isASecLabelStmt,
    CreateForeignTableStmt: isACreateForeignTableStmt,
    ImportForeignSchemaStmt: isAImportForeignSchemaStmt,
    CreateExtensionStmt: isACreateExtensionStmt,
    AlterExtensionStmt: isAAlterExtensionStmt,
    AlterExtensionContentsStmt: isAAlterExtensionContentsStmt,
    CreateEventTrigStmt: isACreateEventTrigStmt,
    AlterEventTrigStmt: isAAlterEventTrigStmt,
    RefreshMatViewStmt: isARefreshMatViewStmt,
    ReplicaIdentityStmt: isAReplicaIdentityStmt,
    AlterSystemStmt: isAAlterSystemStmt,
    CreatePolicyStmt: isACreatePolicyStmt,
    AlterPolicyStmt: isAAlterPolicyStmt,
    CreateTransformStmt: isACreateTransformStmt,
    CreateAmStmt: isACreateAmStmt,
    CreatePublicationStmt: isACreatePublicationStmt,
    AlterPublicationStmt: isAAlterPublicationStmt,
    CreateSubscriptionStmt: isACreateSubscriptionStmt,
    AlterSubscriptionStmt: isAAlterSubscriptionStmt,
    DropSubscriptionStmt: isADropSubscriptionStmt,
    CreateStatsStmt: isACreateStatsStmt,
    AlterCollationStmt: isAAlterCollationStmt,
    CallStmt: isACallStmt,
    AlterStatsStmt: isAAlterStatsStmt,
    A_Expr: isAA_Expr,
    ColumnRef: isAColumnRef,
    ParamRef: isAParamRef,
    A_Const: isAA_Const,
    FuncCall: isAFuncCall,
    A_Star: isAA_Star,
    A_Indices: isAA_Indices,
    A_Indirection: isAA_Indirection,
    A_ArrayExpr: isAA_ArrayExpr,
    ResTarget: isAResTarget,
    MultiAssignRef: isAMultiAssignRef,
    TypeCast: isATypeCast,
    CollateClause: isACollateClause,
    SortBy: isASortBy,
    WindowDef: isAWindowDef,
    RangeSubselect: isARangeSubselect,
    RangeFunction: isARangeFunction,
    RangeTableSample: isARangeTableSample,
    RangeTableFunc: isARangeTableFunc,
    RangeTableFuncCol: isARangeTableFuncCol,
    TypeName: isATypeName,
    ColumnDef: isAColumnDef,
    IndexElem: isAIndexElem,
    Constraint: isAConstraint,
    DefElem: isADefElem,
    RangeTblEntry: isARangeTblEntry,
    RangeTblFunction: isARangeTblFunction,
    TableSampleClause: isATableSampleClause,
    WithCheckOption: isAWithCheckOption,
    SortGroupClause: isASortGroupClause,
    GroupingSet: isAGroupingSet,
    WindowClause: isAWindowClause,
    ObjectWithArgs: isAObjectWithArgs,
    AccessPriv: isAAccessPriv,
    CreateOpClassItem: isACreateOpClassItem,
    TableLikeClause: isATableLikeClause,
    FunctionParameter: isAFunctionParameter,
    LockingClause: isALockingClause,
    RowMarkClause: isARowMarkClause,
    XmlSerialize: isAXmlSerialize,
    WithClause: isAWithClause,
    InferClause: isAInferClause,
    OnConflictClause: isAOnConflictClause,
    CommonTableExpr: isACommonTableExpr,
    RoleSpec: isARoleSpec,
    TriggerTransition: isATriggerTransition,
    PartitionElem: isAPartitionElem,
    PartitionSpec: isAPartitionSpec,
    PartitionBoundSpec: isAPartitionBoundSpec,
    PartitionRangeDatum: isAPartitionRangeDatum,
    PartitionCmd: isAPartitionCmd,
    VacuumRelation: isAVacuumRelation,
    InlineCodeBlock: isAInlineCodeBlock,
    CallContext: isACallContext,
    ScanToken: isAScanToken,
}

export function createFromTypeName(astType: string, value: any): ProtoType.Node {
    if(astType === "ParseResult") { return create(ProtoType.ParseResultSchema, value)  }
    if(astType === "ScanResult") { return create(ProtoType.ScanResultSchema, value)  }
    if(astType === "Integer") { return create(ProtoType.IntegerSchema, value)  }
    if(astType === "Float") { return create(ProtoType.FloatSchema, value)  }
    if(astType === "String") { return create(ProtoType.StringSchema, value)  }
    if(astType === "BitString") { return create(ProtoType.BitStringSchema, value)  }
    if(astType === "Null") { return create(ProtoType.NullSchema, value)  }
    if(astType === "List") { return create(ProtoType.ListSchema, value)  }
    if(astType === "OidList") { return create(ProtoType.OidListSchema, value)  }
    if(astType === "IntList") { return create(ProtoType.IntListSchema, value)  }
    if(astType === "Alias") { return create(ProtoType.AliasSchema, value)  }
    if(astType === "RangeVar") { return create(ProtoType.RangeVarSchema, value)  }
    if(astType === "TableFunc") { return create(ProtoType.TableFuncSchema, value)  }
    if(astType === "Expr") { return create(ProtoType.ExprSchema, value)  }
    if(astType === "Var") { return create(ProtoType.VarSchema, value)  }
    if(astType === "Param") { return create(ProtoType.ParamSchema, value)  }
    if(astType === "Aggref") { return create(ProtoType.AggrefSchema, value)  }
    if(astType === "GroupingFunc") { return create(ProtoType.GroupingFuncSchema, value)  }
    if(astType === "WindowFunc") { return create(ProtoType.WindowFuncSchema, value)  }
    if(astType === "SubscriptingRef") { return create(ProtoType.SubscriptingRefSchema, value)  }
    if(astType === "FuncExpr") { return create(ProtoType.FuncExprSchema, value)  }
    if(astType === "NamedArgExpr") { return create(ProtoType.NamedArgExprSchema, value)  }
    if(astType === "OpExpr") { return create(ProtoType.OpExprSchema, value)  }
    if(astType === "DistinctExpr") { return create(ProtoType.DistinctExprSchema, value)  }
    if(astType === "NullIfExpr") { return create(ProtoType.NullIfExprSchema, value)  }
    if(astType === "ScalarArrayOpExpr") { return create(ProtoType.ScalarArrayOpExprSchema, value)  }
    if(astType === "BoolExpr") { return create(ProtoType.BoolExprSchema, value)  }
    if(astType === "SubLink") { return create(ProtoType.SubLinkSchema, value)  }
    if(astType === "SubPlan") { return create(ProtoType.SubPlanSchema, value)  }
    if(astType === "AlternativeSubPlan") { return create(ProtoType.AlternativeSubPlanSchema, value)  }
    if(astType === "FieldSelect") { return create(ProtoType.FieldSelectSchema, value)  }
    if(astType === "FieldStore") { return create(ProtoType.FieldStoreSchema, value)  }
    if(astType === "RelabelType") { return create(ProtoType.RelabelTypeSchema, value)  }
    if(astType === "CoerceViaIO") { return create(ProtoType.CoerceViaIOSchema, value)  }
    if(astType === "ArrayCoerceExpr") { return create(ProtoType.ArrayCoerceExprSchema, value)  }
    if(astType === "ConvertRowtypeExpr") { return create(ProtoType.ConvertRowtypeExprSchema, value)  }
    if(astType === "CollateExpr") { return create(ProtoType.CollateExprSchema, value)  }
    if(astType === "CaseExpr") { return create(ProtoType.CaseExprSchema, value)  }
    if(astType === "CaseWhen") { return create(ProtoType.CaseWhenSchema, value)  }
    if(astType === "CaseTestExpr") { return create(ProtoType.CaseTestExprSchema, value)  }
    if(astType === "ArrayExpr") { return create(ProtoType.ArrayExprSchema, value)  }
    if(astType === "RowExpr") { return create(ProtoType.RowExprSchema, value)  }
    if(astType === "RowCompareExpr") { return create(ProtoType.RowCompareExprSchema, value)  }
    if(astType === "CoalesceExpr") { return create(ProtoType.CoalesceExprSchema, value)  }
    if(astType === "MinMaxExpr") { return create(ProtoType.MinMaxExprSchema, value)  }
    if(astType === "SQLValueFunction") { return create(ProtoType.SQLValueFunctionSchema, value)  }
    if(astType === "XmlExpr") { return create(ProtoType.XmlExprSchema, value)  }
    if(astType === "NullTest") { return create(ProtoType.NullTestSchema, value)  }
    if(astType === "BooleanTest") { return create(ProtoType.BooleanTestSchema, value)  }
    if(astType === "CoerceToDomain") { return create(ProtoType.CoerceToDomainSchema, value)  }
    if(astType === "CoerceToDomainValue") { return create(ProtoType.CoerceToDomainValueSchema, value)  }
    if(astType === "SetToDefault") { return create(ProtoType.SetToDefaultSchema, value)  }
    if(astType === "CurrentOfExpr") { return create(ProtoType.CurrentOfExprSchema, value)  }
    if(astType === "NextValueExpr") { return create(ProtoType.NextValueExprSchema, value)  }
    if(astType === "InferenceElem") { return create(ProtoType.InferenceElemSchema, value)  }
    if(astType === "TargetEntry") { return create(ProtoType.TargetEntrySchema, value)  }
    if(astType === "RangeTblRef") { return create(ProtoType.RangeTblRefSchema, value)  }
    if(astType === "JoinExpr") { return create(ProtoType.JoinExprSchema, value)  }
    if(astType === "FromExpr") { return create(ProtoType.FromExprSchema, value)  }
    if(astType === "OnConflictExpr") { return create(ProtoType.OnConflictExprSchema, value)  }
    if(astType === "IntoClause") { return create(ProtoType.IntoClauseSchema, value)  }
    if(astType === "RawStmt") { return create(ProtoType.RawStmtSchema, value)  }
    if(astType === "Query") { return create(ProtoType.QuerySchema, value)  }
    if(astType === "InsertStmt") { return create(ProtoType.InsertStmtSchema, value)  }
    if(astType === "DeleteStmt") { return create(ProtoType.DeleteStmtSchema, value)  }
    if(astType === "UpdateStmt") { return create(ProtoType.UpdateStmtSchema, value)  }
    if(astType === "SelectStmt") { return create(ProtoType.SelectStmtSchema, value)  }
    if(astType === "AlterTableStmt") { return create(ProtoType.AlterTableStmtSchema, value)  }
    if(astType === "AlterTableCmd") { return create(ProtoType.AlterTableCmdSchema, value)  }
    if(astType === "AlterDomainStmt") { return create(ProtoType.AlterDomainStmtSchema, value)  }
    if(astType === "SetOperationStmt") { return create(ProtoType.SetOperationStmtSchema, value)  }
    if(astType === "GrantStmt") { return create(ProtoType.GrantStmtSchema, value)  }
    if(astType === "GrantRoleStmt") { return create(ProtoType.GrantRoleStmtSchema, value)  }
    if(astType === "AlterDefaultPrivilegesStmt") { return create(ProtoType.AlterDefaultPrivilegesStmtSchema, value)  }
    if(astType === "ClosePortalStmt") { return create(ProtoType.ClosePortalStmtSchema, value)  }
    if(astType === "ClusterStmt") { return create(ProtoType.ClusterStmtSchema, value)  }
    if(astType === "CopyStmt") { return create(ProtoType.CopyStmtSchema, value)  }
    if(astType === "CreateStmt") { return create(ProtoType.CreateStmtSchema, value)  }
    if(astType === "DefineStmt") { return create(ProtoType.DefineStmtSchema, value)  }
    if(astType === "DropStmt") { return create(ProtoType.DropStmtSchema, value)  }
    if(astType === "TruncateStmt") { return create(ProtoType.TruncateStmtSchema, value)  }
    if(astType === "CommentStmt") { return create(ProtoType.CommentStmtSchema, value)  }
    if(astType === "FetchStmt") { return create(ProtoType.FetchStmtSchema, value)  }
    if(astType === "IndexStmt") { return create(ProtoType.IndexStmtSchema, value)  }
    if(astType === "CreateFunctionStmt") { return create(ProtoType.CreateFunctionStmtSchema, value)  }
    if(astType === "AlterFunctionStmt") { return create(ProtoType.AlterFunctionStmtSchema, value)  }
    if(astType === "DoStmt") { return create(ProtoType.DoStmtSchema, value)  }
    if(astType === "RenameStmt") { return create(ProtoType.RenameStmtSchema, value)  }
    if(astType === "RuleStmt") { return create(ProtoType.RuleStmtSchema, value)  }
    if(astType === "NotifyStmt") { return create(ProtoType.NotifyStmtSchema, value)  }
    if(astType === "ListenStmt") { return create(ProtoType.ListenStmtSchema, value)  }
    if(astType === "UnlistenStmt") { return create(ProtoType.UnlistenStmtSchema, value)  }
    if(astType === "TransactionStmt") { return create(ProtoType.TransactionStmtSchema, value)  }
    if(astType === "ViewStmt") { return create(ProtoType.ViewStmtSchema, value)  }
    if(astType === "LoadStmt") { return create(ProtoType.LoadStmtSchema, value)  }
    if(astType === "CreateDomainStmt") { return create(ProtoType.CreateDomainStmtSchema, value)  }
    if(astType === "CreatedbStmt") { return create(ProtoType.CreatedbStmtSchema, value)  }
    if(astType === "DropdbStmt") { return create(ProtoType.DropdbStmtSchema, value)  }
    if(astType === "VacuumStmt") { return create(ProtoType.VacuumStmtSchema, value)  }
    if(astType === "ExplainStmt") { return create(ProtoType.ExplainStmtSchema, value)  }
    if(astType === "CreateTableAsStmt") { return create(ProtoType.CreateTableAsStmtSchema, value)  }
    if(astType === "CreateSeqStmt") { return create(ProtoType.CreateSeqStmtSchema, value)  }
    if(astType === "AlterSeqStmt") { return create(ProtoType.AlterSeqStmtSchema, value)  }
    if(astType === "VariableSetStmt") { return create(ProtoType.VariableSetStmtSchema, value)  }
    if(astType === "VariableShowStmt") { return create(ProtoType.VariableShowStmtSchema, value)  }
    if(astType === "DiscardStmt") { return create(ProtoType.DiscardStmtSchema, value)  }
    if(astType === "CreateTrigStmt") { return create(ProtoType.CreateTrigStmtSchema, value)  }
    if(astType === "CreatePLangStmt") { return create(ProtoType.CreatePLangStmtSchema, value)  }
    if(astType === "CreateRoleStmt") { return create(ProtoType.CreateRoleStmtSchema, value)  }
    if(astType === "AlterRoleStmt") { return create(ProtoType.AlterRoleStmtSchema, value)  }
    if(astType === "DropRoleStmt") { return create(ProtoType.DropRoleStmtSchema, value)  }
    if(astType === "LockStmt") { return create(ProtoType.LockStmtSchema, value)  }
    if(astType === "ConstraintsSetStmt") { return create(ProtoType.ConstraintsSetStmtSchema, value)  }
    if(astType === "ReindexStmt") { return create(ProtoType.ReindexStmtSchema, value)  }
    if(astType === "CheckPointStmt") { return create(ProtoType.CheckPointStmtSchema, value)  }
    if(astType === "CreateSchemaStmt") { return create(ProtoType.CreateSchemaStmtSchema, value)  }
    if(astType === "AlterDatabaseStmt") { return create(ProtoType.AlterDatabaseStmtSchema, value)  }
    if(astType === "AlterDatabaseSetStmt") { return create(ProtoType.AlterDatabaseSetStmtSchema, value)  }
    if(astType === "AlterRoleSetStmt") { return create(ProtoType.AlterRoleSetStmtSchema, value)  }
    if(astType === "CreateConversionStmt") { return create(ProtoType.CreateConversionStmtSchema, value)  }
    if(astType === "CreateCastStmt") { return create(ProtoType.CreateCastStmtSchema, value)  }
    if(astType === "CreateOpClassStmt") { return create(ProtoType.CreateOpClassStmtSchema, value)  }
    if(astType === "CreateOpFamilyStmt") { return create(ProtoType.CreateOpFamilyStmtSchema, value)  }
    if(astType === "AlterOpFamilyStmt") { return create(ProtoType.AlterOpFamilyStmtSchema, value)  }
    if(astType === "PrepareStmt") { return create(ProtoType.PrepareStmtSchema, value)  }
    if(astType === "ExecuteStmt") { return create(ProtoType.ExecuteStmtSchema, value)  }
    if(astType === "DeallocateStmt") { return create(ProtoType.DeallocateStmtSchema, value)  }
    if(astType === "DeclareCursorStmt") { return create(ProtoType.DeclareCursorStmtSchema, value)  }
    if(astType === "CreateTableSpaceStmt") { return create(ProtoType.CreateTableSpaceStmtSchema, value)  }
    if(astType === "DropTableSpaceStmt") { return create(ProtoType.DropTableSpaceStmtSchema, value)  }
    if(astType === "AlterObjectDependsStmt") { return create(ProtoType.AlterObjectDependsStmtSchema, value)  }
    if(astType === "AlterObjectSchemaStmt") { return create(ProtoType.AlterObjectSchemaStmtSchema, value)  }
    if(astType === "AlterOwnerStmt") { return create(ProtoType.AlterOwnerStmtSchema, value)  }
    if(astType === "AlterOperatorStmt") { return create(ProtoType.AlterOperatorStmtSchema, value)  }
    if(astType === "AlterTypeStmt") { return create(ProtoType.AlterTypeStmtSchema, value)  }
    if(astType === "DropOwnedStmt") { return create(ProtoType.DropOwnedStmtSchema, value)  }
    if(astType === "ReassignOwnedStmt") { return create(ProtoType.ReassignOwnedStmtSchema, value)  }
    if(astType === "CompositeTypeStmt") { return create(ProtoType.CompositeTypeStmtSchema, value)  }
    if(astType === "CreateEnumStmt") { return create(ProtoType.CreateEnumStmtSchema, value)  }
    if(astType === "CreateRangeStmt") { return create(ProtoType.CreateRangeStmtSchema, value)  }
    if(astType === "AlterEnumStmt") { return create(ProtoType.AlterEnumStmtSchema, value)  }
    if(astType === "AlterTSDictionaryStmt") { return create(ProtoType.AlterTSDictionaryStmtSchema, value)  }
    if(astType === "AlterTSConfigurationStmt") { return create(ProtoType.AlterTSConfigurationStmtSchema, value)  }
    if(astType === "CreateFdwStmt") { return create(ProtoType.CreateFdwStmtSchema, value)  }
    if(astType === "AlterFdwStmt") { return create(ProtoType.AlterFdwStmtSchema, value)  }
    if(astType === "CreateForeignServerStmt") { return create(ProtoType.CreateForeignServerStmtSchema, value)  }
    if(astType === "AlterForeignServerStmt") { return create(ProtoType.AlterForeignServerStmtSchema, value)  }
    if(astType === "CreateUserMappingStmt") { return create(ProtoType.CreateUserMappingStmtSchema, value)  }
    if(astType === "AlterUserMappingStmt") { return create(ProtoType.AlterUserMappingStmtSchema, value)  }
    if(astType === "DropUserMappingStmt") { return create(ProtoType.DropUserMappingStmtSchema, value)  }
    if(astType === "AlterTableSpaceOptionsStmt") { return create(ProtoType.AlterTableSpaceOptionsStmtSchema, value)  }
    if(astType === "AlterTableMoveAllStmt") { return create(ProtoType.AlterTableMoveAllStmtSchema, value)  }
    if(astType === "SecLabelStmt") { return create(ProtoType.SecLabelStmtSchema, value)  }
    if(astType === "CreateForeignTableStmt") { return create(ProtoType.CreateForeignTableStmtSchema, value)  }
    if(astType === "ImportForeignSchemaStmt") { return create(ProtoType.ImportForeignSchemaStmtSchema, value)  }
    if(astType === "CreateExtensionStmt") { return create(ProtoType.CreateExtensionStmtSchema, value)  }
    if(astType === "AlterExtensionStmt") { return create(ProtoType.AlterExtensionStmtSchema, value)  }
    if(astType === "AlterExtensionContentsStmt") { return create(ProtoType.AlterExtensionContentsStmtSchema, value)  }
    if(astType === "CreateEventTrigStmt") { return create(ProtoType.CreateEventTrigStmtSchema, value)  }
    if(astType === "AlterEventTrigStmt") { return create(ProtoType.AlterEventTrigStmtSchema, value)  }
    if(astType === "RefreshMatViewStmt") { return create(ProtoType.RefreshMatViewStmtSchema, value)  }
    if(astType === "ReplicaIdentityStmt") { return create(ProtoType.ReplicaIdentityStmtSchema, value)  }
    if(astType === "AlterSystemStmt") { return create(ProtoType.AlterSystemStmtSchema, value)  }
    if(astType === "CreatePolicyStmt") { return create(ProtoType.CreatePolicyStmtSchema, value)  }
    if(astType === "AlterPolicyStmt") { return create(ProtoType.AlterPolicyStmtSchema, value)  }
    if(astType === "CreateTransformStmt") { return create(ProtoType.CreateTransformStmtSchema, value)  }
    if(astType === "CreateAmStmt") { return create(ProtoType.CreateAmStmtSchema, value)  }
    if(astType === "CreatePublicationStmt") { return create(ProtoType.CreatePublicationStmtSchema, value)  }
    if(astType === "AlterPublicationStmt") { return create(ProtoType.AlterPublicationStmtSchema, value)  }
    if(astType === "CreateSubscriptionStmt") { return create(ProtoType.CreateSubscriptionStmtSchema, value)  }
    if(astType === "AlterSubscriptionStmt") { return create(ProtoType.AlterSubscriptionStmtSchema, value)  }
    if(astType === "DropSubscriptionStmt") { return create(ProtoType.DropSubscriptionStmtSchema, value)  }
    if(astType === "CreateStatsStmt") { return create(ProtoType.CreateStatsStmtSchema, value)  }
    if(astType === "AlterCollationStmt") { return create(ProtoType.AlterCollationStmtSchema, value)  }
    if(astType === "CallStmt") { return create(ProtoType.CallStmtSchema, value)  }
    if(astType === "AlterStatsStmt") { return create(ProtoType.AlterStatsStmtSchema, value)  }
    if(astType === "A_Expr") { return create(ProtoType.A_ExprSchema, value)  }
    if(astType === "ColumnRef") { return create(ProtoType.ColumnRefSchema, value)  }
    if(astType === "ParamRef") { return create(ProtoType.ParamRefSchema, value)  }
    if(astType === "A_Const") { return create(ProtoType.A_ConstSchema, value)  }
    if(astType === "FuncCall") { return create(ProtoType.FuncCallSchema, value)  }
    if(astType === "A_Star") { return create(ProtoType.A_StarSchema, value)  }
    if(astType === "A_Indices") { return create(ProtoType.A_IndicesSchema, value)  }
    if(astType === "A_Indirection") { return create(ProtoType.A_IndirectionSchema, value)  }
    if(astType === "A_ArrayExpr") { return create(ProtoType.A_ArrayExprSchema, value)  }
    if(astType === "ResTarget") { return create(ProtoType.ResTargetSchema, value)  }
    if(astType === "MultiAssignRef") { return create(ProtoType.MultiAssignRefSchema, value)  }
    if(astType === "TypeCast") { return create(ProtoType.TypeCastSchema, value)  }
    if(astType === "CollateClause") { return create(ProtoType.CollateClauseSchema, value)  }
    if(astType === "SortBy") { return create(ProtoType.SortBySchema, value)  }
    if(astType === "WindowDef") { return create(ProtoType.WindowDefSchema, value)  }
    if(astType === "RangeSubselect") { return create(ProtoType.RangeSubselectSchema, value)  }
    if(astType === "RangeFunction") { return create(ProtoType.RangeFunctionSchema, value)  }
    if(astType === "RangeTableSample") { return create(ProtoType.RangeTableSampleSchema, value)  }
    if(astType === "RangeTableFunc") { return create(ProtoType.RangeTableFuncSchema, value)  }
    if(astType === "RangeTableFuncCol") { return create(ProtoType.RangeTableFuncColSchema, value)  }
    if(astType === "TypeName") { return create(ProtoType.TypeNameSchema, value)  }
    if(astType === "ColumnDef") { return create(ProtoType.ColumnDefSchema, value)  }
    if(astType === "IndexElem") { return create(ProtoType.IndexElemSchema, value)  }
    if(astType === "Constraint") { return create(ProtoType.ConstraintSchema, value)  }
    if(astType === "DefElem") { return create(ProtoType.DefElemSchema, value)  }
    if(astType === "RangeTblEntry") { return create(ProtoType.RangeTblEntrySchema, value)  }
    if(astType === "RangeTblFunction") { return create(ProtoType.RangeTblFunctionSchema, value)  }
    if(astType === "TableSampleClause") { return create(ProtoType.TableSampleClauseSchema, value)  }
    if(astType === "WithCheckOption") { return create(ProtoType.WithCheckOptionSchema, value)  }
    if(astType === "SortGroupClause") { return create(ProtoType.SortGroupClauseSchema, value)  }
    if(astType === "GroupingSet") { return create(ProtoType.GroupingSetSchema, value)  }
    if(astType === "WindowClause") { return create(ProtoType.WindowClauseSchema, value)  }
    if(astType === "ObjectWithArgs") { return create(ProtoType.ObjectWithArgsSchema, value)  }
    if(astType === "AccessPriv") { return create(ProtoType.AccessPrivSchema, value)  }
    if(astType === "CreateOpClassItem") { return create(ProtoType.CreateOpClassItemSchema, value)  }
    if(astType === "TableLikeClause") { return create(ProtoType.TableLikeClauseSchema, value)  }
    if(astType === "FunctionParameter") { return create(ProtoType.FunctionParameterSchema, value)  }
    if(astType === "LockingClause") { return create(ProtoType.LockingClauseSchema, value)  }
    if(astType === "RowMarkClause") { return create(ProtoType.RowMarkClauseSchema, value)  }
    if(astType === "XmlSerialize") { return create(ProtoType.XmlSerializeSchema, value)  }
    if(astType === "WithClause") { return create(ProtoType.WithClauseSchema, value)  }
    if(astType === "InferClause") { return create(ProtoType.InferClauseSchema, value)  }
    if(astType === "OnConflictClause") { return create(ProtoType.OnConflictClauseSchema, value)  }
    if(astType === "CommonTableExpr") { return create(ProtoType.CommonTableExprSchema, value)  }
    if(astType === "RoleSpec") { return create(ProtoType.RoleSpecSchema, value)  }
    if(astType === "TriggerTransition") { return create(ProtoType.TriggerTransitionSchema, value)  }
    if(astType === "PartitionElem") { return create(ProtoType.PartitionElemSchema, value)  }
    if(astType === "PartitionSpec") { return create(ProtoType.PartitionSpecSchema, value)  }
    if(astType === "PartitionBoundSpec") { return create(ProtoType.PartitionBoundSpecSchema, value)  }
    if(astType === "PartitionRangeDatum") { return create(ProtoType.PartitionRangeDatumSchema, value)  }
    if(astType === "PartitionCmd") { return create(ProtoType.PartitionCmdSchema, value)  }
    if(astType === "VacuumRelation") { return create(ProtoType.VacuumRelationSchema, value)  }
    if(astType === "InlineCodeBlock") { return create(ProtoType.InlineCodeBlockSchema, value)  }
    if(astType === "CallContext") { return create(ProtoType.CallContextSchema, value)  }
    if(astType === "ScanToken") { return create(ProtoType.ScanTokenSchema, value)  }

    throw `Invalid Type: ${astType}` 
}