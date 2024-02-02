import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import LoginForm from '../../LoginForm';

describe('LoginForm', () => {
  it('renders UsernameInput', () => {
    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/username/i);

    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute('type', 'text');
  })

  it('renders PasswordInput', () => {
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/password/i);

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  })

  it('renders LoginButton', () => {
    render(<LoginForm />);

    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(loginButton).toBeInTheDocument();
  })
})
