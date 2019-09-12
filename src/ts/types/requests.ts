export interface ResponseBodyMessage {
  readonly message?: string,
}

export type ResponseBody = ResponseBodyMessage | string;
