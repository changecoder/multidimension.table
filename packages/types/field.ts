export enum FieldType {
  NotSupport = 0,
  Text = 1,
  Number = 2,
  SingleSelect = 3,
  MultiSelect = 4,
  DateTime = 5,
  Attachment = 6,
  Link = 7,
  URL = 8,
  Email = 9,
  Phone = 10,
  Checkbox = 11,
  Rating = 12,
  Member = 13,
  LookUp = 14,
  // RollUp = 15,
  Formula = 16,
  Currency = 17,
  Percent = 18,
  SingleText = 19,
  AutoNumber = 20,
  CreatedTime = 21,
  LastModifiedTime = 22,
  CreatedBy = 23,
  LastModifiedBy = 24,
  Cascader = 25,
  OneWayLink = 26,
  WorkDoc = 27,
  Button = 28,
  DeniedField = 999, // no permission column
}

export enum SegmentType {
  Unknown = 0,
  Text = 1,
  Mention = 1,
  Url = 2,
  Image = 3,
  Email = 4,
}

export enum MentionType {
  Unknown = 0,
  User = 1,
  DataSheet = 2,
  Group = 3,
}

export interface IBaseSegment {
  text: string;
}

export interface ITextSegment extends IBaseSegment {
  type: SegmentType.Text;
}
export interface IHyperlinkSegment extends IBaseSegment {
  type: SegmentType.Url;
  link: string;
  title?: string;
  favicon?: string;
  visited?: boolean;
}

export interface IEmailSegment extends IBaseSegment {
  type: SegmentType.Email;
  link: string;
}

export interface IMentionSegment extends IBaseSegment {
  type: SegmentType.Mention;
  link: string;
  token: string;
  mentionType: MentionType;
  mentionNotify: boolean;
}

export type ISegment =
  | ITextSegment
  | IMentionSegment
  | IHyperlinkSegment
  | IEmailSegment;
