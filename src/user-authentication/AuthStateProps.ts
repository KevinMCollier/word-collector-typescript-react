export interface AuthState {
  user: { email: string } | null;
  token: string | null;
}
