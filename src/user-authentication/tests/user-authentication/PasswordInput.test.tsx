import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import PasswordInput from '../../PasswordInput';

describe('PasswordInput', () => {
  it('renders the correct value in input field for password', () => {
    const mockValue = "password123"
    const mockOnChange = jest.fn();

    render(<PasswordInput id="password" value={mockValue} onChange={mockOnChange} />);
    const passwordInputElement = screen.getByLabelText(/password/i);

    expect(passwordInputElement).toBeInTheDocument();
    expect(passwordInputElement).toHaveAttribute('type', 'password');
    expect(passwordInputElement).toHaveValue(mockValue);
  })
})
