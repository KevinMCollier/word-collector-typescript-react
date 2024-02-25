import { store } from '../../../store';
import { login } from '../../authSlice';

describe('authSlice', () => {
  it('should initialize state with no user and no token', () => {
    expect(store.getState().auth).toEqual({ user: null, token: null });
  })

  it('stores user email and token in state upon login', () => {
    store.dispatch(login({ user: { email: 'user@example.com'}, token: 'fake_token' }));
    expect(store.getState().auth).toEqual({
      user: { email: 'user@example.com' },
      token: 'fake_token',
    });
  });
})
