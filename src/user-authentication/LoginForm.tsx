import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import { LoginFormProps } from "./LoginFormProps";
import { useState } from "react";

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <div>
        <UsernameInput id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <LoginButton />
    </form>
  );
}

export default LoginForm;
