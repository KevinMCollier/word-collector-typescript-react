const API_URL = process.env.REACT_APP_WORD_COLLECTOR_API_URL

const login = async (email: string, password: string): Promise<{ user: { email: string }, token: string}> =>  {
  const response = await fetch(`${API_URL}/users/sign_in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: { email, password } }),
  });

  if (!response.ok) {
    throw new Error('Login failed ya jabroni');
  }

  const loginResponseData = await response.json();
  localStorage.setItem('token', loginResponseData.user.authentication_token);

  return {
    user: { email: loginResponseData.user.email },
    token: loginResponseData.user.authentication_token
  };
}

export { login };
