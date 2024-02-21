import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import EmailInput from '../../EmailInput';


describe('emailInput', () => {
  test('renders the correct value in input field for email', () => {
    const mockValue = "testuser";
    const mockOnChange = jest.fn()

    render(<EmailInput id="email" value={mockValue} onChange={mockOnChange} />);
    const emailInputElement = screen.getByLabelText(/email/i);

    expect(emailInputElement).toBeInTheDocument();
    expect(emailInputElement).toHaveAttribute('type', 'text');
    expect(emailInputElement).toHaveValue(mockValue);
  });
});
