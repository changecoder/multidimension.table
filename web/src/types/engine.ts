import { FieldType } from "./field";

export enum OTActionName {
  NumberAdd = "NA",
  ListInsert = "LI",
  ListDelete = "LD",
  ListReplace = "LR",
  ListMove = "LM",
  ObjectInsert = "OI",
  ObjectDelete = "OD",
  ObjectReplace = "OR",
  SubType = "ST",
  TextInsert = "TI",
  TextDelete = "TD",
}

export type IJOTPath = (string | number)[];

export interface INumberAddAction {
  n: OTActionName.NumberAdd;
  p: IJOTPath;
  na: number;
}

export interface IListInsertAction {
  n: OTActionName.ListInsert;
  p: IJOTPath;
  li: any;
}

export interface IListDeleteAction {
  n: OTActionName.ListDelete;
  p: IJOTPath;
  ld: any;
}

export interface IListReplaceAction {
  n: OTActionName.ListReplace;
  p: IJOTPath;
  ld: any;
  li: any;
}

export interface IListMoveAction {
  n: OTActionName.ListMove;
  p: IJOTPath;
  lm: number;
}

export interface IObjectInsertAction {
  n: OTActionName.ObjectInsert;
  p: IJOTPath;
  oi: any;
}

export interface IObjectDeleteAction {
  n: OTActionName.ObjectDelete;
  p: IJOTPath;
  od: any;
}

export interface IObjectReplaceAction {
  n: OTActionName.ObjectReplace;
  p: IJOTPath;
  od: any;
  oi: any;
}

export interface ISubTypeAction {
  n: OTActionName.SubType;
  p: IJOTPath;
  t: string;
  o: any;
}

export interface ITextInsertAction {
  n: OTActionName.TextInsert;
  p: IJOTPath;
  si: string;
}

export interface ITextDeleteAction {
  n: OTActionName.TextDelete;
  p: IJOTPath;
  sd: string;
}

export type IJOTAction =
  | INumberAddAction
  | IListInsertAction
  | IListDeleteAction
  | IListReplaceAction
  | IListMoveAction
  | IObjectInsertAction
  | IObjectDeleteAction
  | IObjectReplaceAction
  | ISubTypeAction
  | ITextInsertAction
  | ITextDeleteAction;

export interface IOperation {
  cmd: string;
  actions: IJOTAction[];
  mainLinkDstId?: string;
  fieldTypeMap?: {
    [fieldId: string]: FieldType;
  };
  revision?: number;
}

export interface IChangeset {
  messageId: string;
  resourceId: string;
  operations: IOperation[];
}

export interface IRemoteChangeset extends IChangeset {
  userId?: string;
  revision: number;
  createdAt?: number;
}

export interface ILocalChangeset extends IChangeset {
  baseRevision: number;
  datasheetId?: string;
}

export interface IOperation {
  cmd: string;
  actions: IJOTAction[];
  mainLinkDstId?: string;
  fieldTypeMap?: {
    [fieldId: string]: FieldType;
  };
  revision?: number;
}

export interface IApiWrapper {
  code: number;
  message: string;
  success: boolean;
}

export interface IChangesetPack extends IApiWrapper {
  data: IRemoteChangeset[];
}
