jest.mock('../../src/utils/jwt');
jest.mock('../../src/utils/config', () => ({}));
const authGuardMiddleware = require('../../src/middleware/authGuard.middleware');
const { validateToken } = require('../../src/utils/jwt');

describe('auth guard middleware', () => {
  it('should return 401 if authorization header is not defined', () => {
    // setup
    const req = {
      header: jest.fn(),
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();
    res.status.mockReturnValue(res);

    // execute
    authGuardMiddleware(req, res, next);

    // compare
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  // bearer token format

  // validation token failure

  it('should pass the authentication check', () => {
    // setup
    const token = 'token';
    const payload = { _id: '123' };
    const req = {
      header: jest.fn(),
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    req.header.mockReturnValue(`Bearer ${token}`);
    validateToken.mockImplementation((token) => payload);
    // execute
    authGuardMiddleware(req, res, next);

    expect(validateToken).toHaveBeenCalledWith(token);
    expect(req.user).toEqual(payload);
    expect(next).toHaveBeenCalled();
  });
});
