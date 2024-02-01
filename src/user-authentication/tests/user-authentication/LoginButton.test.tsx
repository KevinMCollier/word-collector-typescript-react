import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginButton from '../../LoginButton';

describe('LoginButton', () => {
  it('renders a login button', () => {
    render(<LoginButton />);
    const loginButtonElement = screen.getByRole('button', { name: /login/i });
    expect(loginButtonElement).toBeInTheDocument();
  })
})
