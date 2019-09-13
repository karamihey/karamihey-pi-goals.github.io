// types
import { ResponseBody, ResponseBodyMessage } from 'types/requests';

export class RequestError extends Error {
  data: ResponseBody;

  status: number;

  name: string;

  constructor(status: number, responseData: ResponseBodyMessage) {
    super();

    this.data = (responseData && responseData.message) || responseData;
    this.status = status;
    this.name = 'RequestError';
  }
}
