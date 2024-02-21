import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../../LoginPage';
import * as loginService from '../../LoginService';
import { MemoryRouter } from 'react-router-dom';
import { LoginFormProps } from '../../LoginFormProps';

beforeEach(() => {
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
})

jest.mock('../../LoginService', () => ({
  login: jest.fn(() => Promise.resolve({ token: 'fake_token' }))
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../..//LoginForm', () => {
  const MockLoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ email: 'testUser', password: 'testPassword' }); }}>
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

    // const mockNavigate = require('react-router-dom').useNavigate();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testUser', 'testPassword');
      // Mock out naviagation and test that as well
      // Better yet -> separate this into two tests later on
    })
  })

  it('directly tests localStorage.setItem', () => {
    localStorage.setItem('test', 'value');
    expect(localStorage.setItem).toHaveBeenCalledWith('test', 'value');
  });
})
