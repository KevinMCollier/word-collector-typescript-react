import { store } from '../../../store';
// import { login, logout } from '../../authSlice';

describe('authSlice', () => {
  it('should initialize state with no user and no token', () => {
    expect(store.getState().auth).toEqual({ user: null, token: null });
  })
})
