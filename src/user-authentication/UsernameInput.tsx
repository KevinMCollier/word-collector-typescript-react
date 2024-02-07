import { UsernameInputProps } from "./UsernameInputProps";


const UsernameInput: React.FC<UsernameInputProps> = ({ id, value, onChange }) => {
  return (
    <div>
      <label htmlFor="username">Username</label>
      <input id={id} type="text" value={value} onChange={onChange} />
    </div>
  );
}

export default UsernameInput;
