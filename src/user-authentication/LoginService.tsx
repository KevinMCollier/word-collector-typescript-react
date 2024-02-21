const API_URL = process.env.REACT_APP_WORD_COLLECTOR_API_URL

const login = async (email: string, password: string): Promise<{ token: string}> =>  {
  const response = await fetch(`${API_URL}/users/sign_in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed ya jabroni');
  }

  const loginResponseData = await response.json();
  localStorage.setItem('token', loginResponseData.token);

  return loginResponseData;
}

export { login };
