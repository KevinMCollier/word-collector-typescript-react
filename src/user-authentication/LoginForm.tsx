import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import { LoginFormProps } from "./LoginFormProps";
import { useState } from "react";

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <div>
        <EmailInput id="email" value={email} onChange={(e) => setemail(e.target.value)} />
      </div>
      <div>
        <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <LoginButton />
    </form>
  );
}

export default LoginForm;
