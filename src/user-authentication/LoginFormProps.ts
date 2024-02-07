export interface LoginFormProps {
  onSubmit: (data: { username: string; password: string; }) => void;
}
