import { login } from '../../LoginService'

beforeAll(() => {
  process.env.REACT_APP_WORD_COLLECTOR_API_URL = 'http://localhost:3000';
})

beforeEach(() => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token: 'fake_token' }),
    })
  }) as jest.Mock;
});

beforeEach(() => {
  Storage.prototype.setItem = jest.fn();
  global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: 'fake_token' }),
  })) as jest.Mock;
})

afterEach(() => {
  jest.restoreAllMocks();
})

describe('LoginService', () => {
  it('successfully logs in with valid credentials and returns a token', async () => {
    const apiEndpoint = 'http://localhost:3000/users/sign_in';
    const email = 'validUser';
    const password = 'validPassword';
    const expectedResponse = { token: 'fake_token' };
    const response = await login(email, password);

    expect(fetch).toHaveBeenCalledWith(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    expect(response).toEqual(expectedResponse);
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
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok:true,
        json: () => Promise.resolve({ token: 'fake_token', user: { id: 1, email: 'user@example.com' } })
      })
    ) as jest.Mock;

    const response = await login('validUser', 'validPassword');

    expect(response).toEqual({
      token: 'fake_token',
      user: { id: 1, email: 'user@example.com' }
    });
  });

  it('stores token in localStorage on successful login', async () => {
    const email = 'validUser';
    const password = 'validPassword';
    const token = 'fake_token';

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token }),
    })) as jest.Mock;

    await login(email, password);

    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
  });

  it('ensures the payload structure matches the expected format', async () => {
    const email = 'user@example.com';
    const password = 'password';
    const token = 'fake_token';
    const mockResponse = { user: { email, authentication_token: token } };

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })) as jest.Mock;

    const response = await login(email, password);

    expect(response).toEqual({
      user: { email },
      token
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
  })
});
