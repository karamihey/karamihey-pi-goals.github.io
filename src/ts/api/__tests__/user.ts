// api
import * as userRequests from 'api/user';

describe('User requests', () => {
  it('should provide necessary methods', () => {
    expect(userRequests.createUser({
      email: '',
      password: '',
    })).toBeDefined();

    expect(userRequests.getUsers()).toBeDefined();

    expect(userRequests.getUser(1)).toBeDefined();
  });
});
