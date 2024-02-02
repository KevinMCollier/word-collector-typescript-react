import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import UsernameInput from '../../UsernameInput';


describe('UsernameInput', () => {
  test('renders an input field for username', () => {
    render(<UsernameInput id={"username"} />);
    const usernameInputElement = screen.getByLabelText(/username/i);
    expect(usernameInputElement).toBeInTheDocument();
    expect(usernameInputElement).toHaveAttribute('type', 'text');
  });
});
