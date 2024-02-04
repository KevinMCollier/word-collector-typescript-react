import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('updates state on user input for UsernameInput field', () => {
    render(<LoginForm />);
    const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    expect(usernameInput.value).toBe('testuser');
  })

  it('updates state on user input for PasswordInput field', () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(passwordInput.value).toBe('testpassword');
  })

  it('calls onSubmit with updated username and password when form is submitted', () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByRole('form');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(mockSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    });
  });

})
