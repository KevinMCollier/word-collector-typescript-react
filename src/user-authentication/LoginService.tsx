const login = async (username: string, password: string): Promise<{ token: string}> =>  {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed ya jabroni');
  }

  return response.json();
}

export { login };
