import { UsernameInputProps } from "./UsernameInputProps";


const UsernameInput: React.FC<UsernameInputProps> = ({ id }) => {
  return (
    <div>
      <label htmlFor="username">Username</label>
      <input id={id} type="text" />
    </div>
  );
}

export default UsernameInput;
