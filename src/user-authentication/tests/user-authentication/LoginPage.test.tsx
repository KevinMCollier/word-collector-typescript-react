import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../../LoginPage';
import * as loginService from '../../LoginService';
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

  it('calls login service with credentials and redirects on success', async () => {
    const mockLogin = loginService.login as jest.MockedFunction<typeof loginService.login>;
    const fakeToken = 'fake_token';
    mockLogin.mockResolvedValue({ token: fakeToken });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testUser', 'testPassword');
      // Adjust for localStorage later on with something such as:
      // expect(localStorage.setItem).toHaveBeenCalledWith('token', fakeToken);
      // Mock out naviagation and test that as well
      // Better yet -> separate this into two tests later on
    })
  })
})
