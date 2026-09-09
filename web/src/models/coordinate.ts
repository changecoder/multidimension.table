import { RowHeightLevel } from "../constants/coordinate";
import type {
  CellMetaDataMap,
  ICoordinate,
  IndicesMap,
} from "../types/coordinate";
import { CellMetaData, ItemType } from "../types/grid";

export class Coordinate {
  protected _rowHeight: number;
  protected _columnWidth: number;
  public rowCount: number;
  public columnCount: number;
  public containerWidth: number;
  public containerHeight: number;
  public rowIndicesMap: IndicesMap = {};
  public columnIndicesMap: IndicesMap = {};
  public rowInitSize: number;
  public columnInitSize: number;
  public lastRowIndex = -1;
  public lastColumnIndex = -1;
  public rowMetaDataMap: CellMetaDataMap = {};
  public columnMetaDataMap: CellMetaDataMap = {};
  public rowHeightLevel: RowHeightLevel;

  constructor({
    rowHeight,
    columnWidth,
    rowCount,
    columnCount,
    containerWidth,
    containerHeight,
    rowInitSize = 0,
    columnInitSize = 0,
    rowIndicesMap = {},
    columnIndicesMap = {},
    rowHeightLevel = RowHeightLevel.Short,
  }: ICoordinate) {
    this._rowHeight = rowHeight;
    this._columnWidth = columnWidth;
    this.rowHeightLevel = rowHeightLevel;
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.rowInitSize = rowInitSize;
    this.columnInitSize = columnInitSize;
    this.rowIndicesMap = rowIndicesMap;
    this.columnIndicesMap = columnIndicesMap;
  }

  public get columnWidth() {
    return this._columnWidth;
  }

  public set columnWidth(width: number) {
    this._columnWidth = width;
  }

  public get rowHeight() {
    return this._rowHeight;
  }

  public set rowHeight(height: number) {
    this._rowHeight = height;
  }

  public getRowHeight(index: number) {
    return this.rowMetaDataMap[index]?.size ?? this.rowHeight;
  }

  public getColumnWidth(index: number) {
    return this.columnMetaDataMap[index]?.size ?? this.columnWidth;
  }

  public findNearestCellIndex(offset: number, itemType: ItemType) {
    let itemMetadataMap, lastIndex;

    if (itemType === ItemType.Column) {
      itemMetadataMap = this.columnMetaDataMap;
      lastIndex = this.lastColumnIndex;
    } else {
      itemMetadataMap = this.rowMetaDataMap;
      lastIndex = this.lastRowIndex;
    }
    const lastMeasuredItemOffset =
      lastIndex > 0 ? itemMetadataMap[lastIndex].offset : 0;

    if (lastMeasuredItemOffset >= offset) {
      return this._findNearestCellIndexByBinary(offset, 0, lastIndex, itemType);
    }
    return this._findNearestCellIndex(Math.max(0, lastIndex), offset, itemType);
  }

  public getRowStartIndex(offset: number) {
    return this.findNearestCellIndex(offset, ItemType.Row);
  }

  public getRowStopIndex(startIndex: number, scrollTop: number) {
    const itemMetadata = this.getCellMetaData(startIndex, ItemType.Row);
    const maxOffset = scrollTop + this.containerHeight;
    let offset = itemMetadata.offset + itemMetadata.size;
    let stopIndex = startIndex;

    while (stopIndex < this.rowCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += this.getCellMetaData(stopIndex, ItemType.Row).size;
    }
    return stopIndex;
  }

  public getColumnStartIndex(offset: number) {
    return this.findNearestCellIndex(offset, ItemType.Column);
  }

  public getColumnStopIndex(startIndex: number, scrollLeft: number) {
    const itemMetadata = this.getCellMetaData(startIndex, ItemType.Column);
    const maxOffset = scrollLeft + this.containerWidth;
    let offset = itemMetadata.offset + itemMetadata.size;
    let stopIndex = startIndex;

    while (stopIndex < this.columnCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += this.getCellMetaData(stopIndex, ItemType.Column).size;
    }
    return stopIndex;
  }

  public getRowOffset(rowIndex: number) {
    return this.getCellMetaData(rowIndex, ItemType.Row).offset;
  }

  public getColumnOffset(columnIndex: number) {
    return this.getCellMetaData(columnIndex, ItemType.Column).offset;
  }

  protected getCellMetaData(index: number, itemType: ItemType): CellMetaData {
    let cellMetadataMap, itemSize, lastMeasuredIndex, offset;
    const isColumnType = itemType === ItemType.Column;

    if (isColumnType) {
      itemSize = this.columnWidth;
      offset = this.columnInitSize;
      lastMeasuredIndex = this.lastColumnIndex;
      cellMetadataMap = this.columnMetaDataMap;
    } else {
      itemSize = this.rowHeight;
      offset = this.rowInitSize;
      lastMeasuredIndex = this.lastRowIndex;
      cellMetadataMap = this.rowMetaDataMap;
    }
    if (index > lastMeasuredIndex) {
      if (lastMeasuredIndex >= 0) {
        const itemMetadata = cellMetadataMap[lastMeasuredIndex];
        offset = itemMetadata.offset + itemMetadata.size;
      }

      for (let i = lastMeasuredIndex + 1; i <= index; i++) {
        const size =
          (isColumnType ? this.columnIndicesMap[i] : this.rowIndicesMap[i]) ??
          itemSize;

        cellMetadataMap[i] = {
          offset,
          size,
        };
        offset += size;
      }
      if (isColumnType) {
        this.lastColumnIndex = index;
      } else {
        this.lastRowIndex = index;
      }
    }
    return cellMetadataMap[index] || { size: 0, offset: 0 };
  }

  private _findNearestCellIndexByBinary(
    offset: number,
    low: number,
    high: number,
    itemType: ItemType,
  ) {
    while (low <= high) {
      const middle = low + Math.floor((high - low) / 2);
      const currentOffset = this.getCellMetaData(middle, itemType).offset;

      if (currentOffset === offset) {
        return middle;
      } else if (currentOffset < offset) {
        low = middle + 1;
      } else if (currentOffset > offset) {
        high = middle - 1;
      }
    }
    return low > 0 ? low - 1 : 0;
  }

  private _findNearestCellIndex(
    index: number,
    offset: number,
    itemType: ItemType,
  ) {
    const itemCount =
      itemType === ItemType.Column ? this.columnCount : this.rowCount;
    let interval = 1;

    while (
      index < itemCount &&
      this.getCellMetaData(index, itemType).offset < offset
    ) {
      index += interval;
      interval *= 2;
    }

    return this._findNearestCellIndexByBinary(
      offset,
      Math.floor(index / 2),
      Math.min(index, itemCount - 1),
      itemType,
    );
  }
}
