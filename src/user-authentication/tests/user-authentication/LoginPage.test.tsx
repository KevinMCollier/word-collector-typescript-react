import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import LoginPage from '../../LoginPage';

jest.mock('../..//LoginForm', () => () => <div data-testid="mock-login-form"></div>)

describe('LoginPage', () => {
  it('renders LoginForm component', () => {
    render(<LoginPage />);

    const loginFormElement = screen.getByTestId('mock-login-form');

    expect(loginFormElement).toBeInTheDocument();
  })
})
