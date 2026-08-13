export enum CellType {
  GroupTab = "GroupTab", // 分组标题行
  Add = "AddRecord", // 「添加行」按钮行
  Blank = "Blank", // 分组间距空白行
  Record = "Record", // 数据行
}

export enum RowHeightLevel {
  Short = 1,
  Medium = 2,
  Tall = 3,
  ExtraTall = 4,
}

export const RowHeight = {
  Short: 32,
  Medium: 57,
  Tall: 104,
  ExtraTall: 152,
};

export const DEFAULT_COLUMN_WIDTH = 200;
export const MIN_COLUMN_WIDTH = 80;

export enum ViewType {
  NotSupport = 0,
  Grid = 1,
  Kanban = 2,
  Gallery = 3,
  Form = 4,
  Calendar = 5,
  Gantt = 6,
  OrgChart = 7,
}
