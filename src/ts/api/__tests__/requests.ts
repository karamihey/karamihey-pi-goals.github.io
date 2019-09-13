// requests
import {
  sendGetRequest, sendPostRequest, sendPutRequest, sendDeleteRequest,
} from 'api/requests';

const headersMock = new Headers();
headersMock.append('Content-Type', 'application/json');

const successResponseMock = {
  headers: headersMock,
  status: 200,
  ok: true,
  json: () => {},
};

const failedResponseMock = {
  status: 401,
  ok: false,
  json: {},
};

const fetchSuccessMock = jest.fn().mockImplementation(() => new Promise((resolve) => {
  resolve(successResponseMock);
}));

const fetchFailedMock = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  reject(failedResponseMock);
}));

describe('API requests',() => {
  beforeEach(() => {
    window.fetch = fetchSuccessMock;
  });

  it('should provide necessary methods',() => {
    expect(sendGetRequest('url')).toBeDefined();
    expect(sendPostRequest('url')).toBeDefined();
    expect(sendPutRequest('url')).toBeDefined();
    expect(sendDeleteRequest('url')).toBeDefined();
  });

  it('should sendGetRequest with GET params',() => {
    expect(sendGetRequest('url', {
      tag: 'test',
      key: 'label',
    })).toBeDefined();
  });

  it('returns promise handling without error',() => {
    expect(sendGetRequest('url')).resolves.toStrictEqual(successResponseMock);
  });

  it('returns promise handling with error',() => {
    window.fetch = fetchFailedMock;

    expect(sendGetRequest('url')).rejects.toStrictEqual(failedResponseMock);
  });
});
