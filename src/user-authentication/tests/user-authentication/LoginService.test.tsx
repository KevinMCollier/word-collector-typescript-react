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
