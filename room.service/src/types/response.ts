export interface BaseResponse {
  code: number;
  message: string;
  data?: any;
}

export interface SuccessResponse extends BaseResponse {
  code: 200;
  message: 'success';
  data: any;
}

export interface ErrorResponse extends BaseResponse {
  code: number;
  message: string;
}
