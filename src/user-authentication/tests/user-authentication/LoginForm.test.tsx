import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../../LoginForm';

describe('LoginForm', () => {
  it('renders emailInput', () => {
    const mockOnSubmit = jest.fn();

    render(<LoginForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'text');
  })

  it('renders PasswordInput', () => {
    const mockOnSubmit = jest.fn();

    render(<LoginForm onSubmit={mockOnSubmit} />);

    const passwordInput = screen.getByLabelText(/password/i);

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  })

  it('renders LoginButton', () => {
    const mockOnSubmit = jest.fn();

    render(<LoginForm onSubmit={mockOnSubmit} />);

    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(loginButton).toBeInTheDocument();
  })

  it('updates state on user input for emailInput field', () => {
    const mockOnSubmit = jest.fn();

    render(<LoginForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'testuser' } });

    expect(emailInput.value).toBe('testuser');
  })

  it('updates state on user input for PasswordInput field', () => {
    const mockOnSubmit = jest.fn();

    render(<LoginForm onSubmit={mockOnSubmit} />);
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  })

  it('calls onSubmit with updated email and password when form is submitted', () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByTestId('login-form');

    fireEvent.change(emailInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'testuser',
      password: 'password123',
    });
  });

})
