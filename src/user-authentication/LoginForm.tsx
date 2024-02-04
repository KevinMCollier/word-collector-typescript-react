import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";

const LoginForm = () => {
  return (
    <form data-testid="login-form">
      <div>
        <UsernameInput id="username" />
      </div>
      <div>
        <PasswordInput id="password" />
      </div>
      <LoginButton />
    </form>
  );
}

export default LoginForm;
