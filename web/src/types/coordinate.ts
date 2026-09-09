import { RowHeightLevel } from "../constants/coordinate";

export type IndicesMap = Record<number, number>;

export type CellMetaDataMap = Record<number, CellMetaData>;

export type CellMetaData = {
  size: number;
  offset: number;
};

export interface ICoordinate {
  rowCount: number;
  columnCount: number;
  containerWidth: number;
  containerHeight: number;
  rowHeight: number;
  columnWidth: number;
  rowHeightLevel?: RowHeightLevel;
  rowInitSize?: number;
  columnInitSize?: number;
  rowIndicesMap?: IndicesMap;
  columnIndicesMap?: IndicesMap;
}

export interface IGridCoordinate extends ICoordinate {
  frozenColumnCount?: number;
  autoHeadHeight?: boolean;
}
