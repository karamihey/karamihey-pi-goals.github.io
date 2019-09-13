// utils
import { RequestError } from 'utils/exceptions';

describe('request error class', () => {
  it('should create class instance with message in the responseData', () => {
    const status = 401;
    const responseData = {
      message: '401 Unauthorized',
    };

    const classInstance = new RequestError(status, responseData);

    expect(classInstance.status).toBe(status);
    expect(classInstance.data).toBe(responseData.message);
    expect(classInstance.name).toBe('RequestError');
  });

  it('should create class instance without message in the responseData', () => {
    const status = 502;
    const responseData = {};

    const classInstance = new RequestError(status, responseData);

    expect(classInstance.status).toBe(status);
    expect(classInstance.data).toBe(responseData);
    expect(classInstance.name).toBe('RequestError');
  });
});
