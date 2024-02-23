import { login } from '../../LoginService'

beforeAll(() => {
  process.env.REACT_APP_WORD_COLLECTOR_API_URL = 'http://localhost:3000';
})

beforeEach(() => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ user: { email: 'user@example.com', authentication_token: 'fake_token'} }),
    })
  }) as jest.Mock;

  Storage.prototype.setItem = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
})

describe('LoginService', () => {
  it('calls fetch with the correct parameters when logging in', async () => {
    const apiEndpoint = 'http://localhost:3000/users/sign_in';
    const email = 'user@example.com';
    const password = 'validPassword';

    await login(email, password);

    expect(fetch).toHaveBeenCalledWith(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    });
  })

  it('fails to log in with invalid credentials', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: 'Invalid credentials' }),
      })
    ) as jest.Mock;
    await expect(login('invalidUser', 'wrongPassword')).rejects.toThrow('Login failed ya jabroni');
  })

  it('handles network errors gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));

    await expect(login('validUser', 'validPassword')).rejects.toThrow('Network Error');
  });

  it('extracts and returns user information upon successful login', async () => {
    const email = 'user@example.com';
    const password = 'validPassword';
    const response = await login(email, password);

    const expectedResponse = {
      user: { email },
      token: 'fake_token',
    };

    expect(response).toEqual(expectedResponse);
  });

  it('stores token in localStorage on successful login', async () => {
    const email = 'validUser';
    const password = 'validPassword';
    const token = 'fake_token';

    await login(email, password);

    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
  });

  it('ensures the payload structure matches the expected format', async () => {
    const email = 'user@example.com';
    const password = 'password';
    const token = 'fake_token';

    const response = await login(email, password);

    expect(response).toEqual({
      user: { email },
      token
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', token)
  })
});
