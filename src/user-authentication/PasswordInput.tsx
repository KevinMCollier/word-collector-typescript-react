import { PasswordInputProps } from "./PasswordInputProps";

const PasswordInput: React.FC<PasswordInputProps> = ({ id }) => {
  return (
    <div>
      <label htmlFor="password">Password</label>
      <input id={id} type="password" />
    </div>
  );
}

export default PasswordInput;
