import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../../LoginPage';
import * as loginService from '../../LoginService';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../..//LoginForm', () => () => <div data-testid="mock-login-form"></div>)
jest.mock('../../LoginService')
const mockedLogin = loginService.login as jest.MockedFunction<typeof loginService.login>;

describe('LoginPage', () => {
  it('renders LoginForm component', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const loginFormElement = screen.getByTestId('mock-login-form');

    expect(loginFormElement).toBeInTheDocument();
  })

  it('calls login service with credentials and redirects on success', async () => {
    mockedLogin.mockResolvedValue({ token: 'fake_token' });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/homepage');
    });
  })
})
