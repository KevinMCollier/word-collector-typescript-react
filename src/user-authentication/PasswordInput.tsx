import { PasswordInputProps } from "./PasswordInputProps";

const PasswordInput: React.FC<PasswordInputProps> = ({ id, value, onChange }) => {
  return (
    <div>
      <label htmlFor="password">Password</label>
      <input id={id} type="password" value={value} onChange={onChange} />
    </div>
  );
}

export default PasswordInput;
