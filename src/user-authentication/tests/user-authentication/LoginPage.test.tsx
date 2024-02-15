import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import LoginPage from '../../LoginPage';
// import * as loginService from '../../LoginService';
import { MemoryRouter } from 'react-router-dom';
import { LoginFormProps } from '../../LoginFormProps';

jest.mock('../../LoginService', () => ({
  login: jest.fn()
}));
// const mockedLogin = loginService.login as jest.MockedFunction<typeof loginService.login>;

jest.mock('../..//LoginForm', () => {
  const MockLoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ username: 'testUser', password: 'testPassword' }); }}>
      <button type="submit">Login</button>
    </form>
  );
  return MockLoginForm;
});

describe('LoginPage with mocked LoginForm', () => {
  it('renders LoginForm component', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  })
})
