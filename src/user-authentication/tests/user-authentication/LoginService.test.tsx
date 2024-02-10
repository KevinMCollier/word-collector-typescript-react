import { login } from '../../LoginService'

beforeEach(() => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token: 'fake_token' }),
    })
  }) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
})

describe('LoginService', () => {
  it('successfully logs in with valid credentials and returns a token', async () => {
    const apiEndpoint = '/api/login';
    const username = 'validUser';
    const password = 'validPassword';
    const expectedResponse = { token: 'fake_token' };
    const response = await login(username, password);

    expect(fetch).toHaveBeenCalledWith(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    expect(response).toEqual(expectedResponse);
  })
})
