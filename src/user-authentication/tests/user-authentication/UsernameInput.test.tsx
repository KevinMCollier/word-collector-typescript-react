import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import UsernameInput from '../../UsernameInput';


describe('UsernameInput', () => {
  test('renders the correct value in input field for username', () => {
    const mockValue = "testuser";
    const mockOnChange = jest.fn()

    render(<UsernameInput id="username" value={mockValue} onChange={mockOnChange} />);
    const usernameInputElement = screen.getByLabelText(/username/i);

    expect(usernameInputElement).toBeInTheDocument();
    expect(usernameInputElement).toHaveAttribute('type', 'text');
    expect(usernameInputElement).toHaveValue(mockValue);
  });
});
