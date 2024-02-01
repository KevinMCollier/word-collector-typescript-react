import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import PasswordInput from '../../PasswordInput';

describe('PasswordInput', () => {
  it('renders an input field for password', () => {
    render(<PasswordInput />);
    const passwordInputElement = screen.getByLabelText(/password/i);
    expect(passwordInputElement).toBeInTheDocument();
    expect(passwordInputElement).toHaveAttribute('type', 'text');
  })
})
