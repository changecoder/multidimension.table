import { FieldType, ISegment } from "./field";

export type IFontWeight = "normal" | "bold" | "bolder" | "lighter";

export interface ICtxStyleProps {
  fontSize?: number;
  fontWeight?: IFontWeight;
  fillStyle?: string;
  strokeStyle?: string;
}

export interface IGraphProps {
  x: number;
  y: number;
}

export interface ILineProps extends IGraphProps {
  points: number[];
  stroke?: string;
  closed?: boolean;
}

export interface IRectProps extends IGraphProps {
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  radius?: number[] | number;
}

export interface ITextProps extends IGraphProps {
  text: string;
  fillStyle?: string;
  fontSize?: number;
  textAlign?: "left" | "right" | "center" | "start" | "end";
  verticalAlign?: "top" | "middle" | "bottom";
  fontWeight?: IFontWeight;
  textDecoration?: "underline" | "line-through" | "none";
  favicon?: string;
}

export type IWrapTextDataProps = {
  offsetX: number;
  offsetY: number;
  text: string;
  width: number;
  linkUrl: string | null;
}[];

export interface IWrapTextResultProps {
  height: number;
  data: IWrapTextDataProps;
}

export interface IImageProps extends IGraphProps {
  url: string;
  width: number;
  height: number;
  opacity?: number;
  clipFunc?: (ctx: any) => void;
}

export interface IImageOption {
  crossOrigin?: boolean;
}

export interface ITextEllipsisProps {
  text: string;
  maxWidth?: number;
  fontSize?: number;
  fontWeight?: IFontWeight;
}

export interface IWrapTextProps extends ITextProps {
  maxWidth: number;
  lineHeight: number;
  fieldType: FieldType;
  maxRow?: number;
  originValue?: ISegment[] | null;
  isLinkSplit?: boolean;
  needDraw?: boolean;
}

export interface ILinkData {
  endIndex: number;
  url: string;
}

export type ILabelProps = Omit<IRectProps & ITextProps, "fillStyle"> & {
  background: string;
  color?: string;
  padding?: number;
};
