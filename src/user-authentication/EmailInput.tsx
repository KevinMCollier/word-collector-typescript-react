import { emailInputProps } from "./EmailInputProps";


const EmailInput: React.FC<emailInputProps> = ({ id, value, onChange }) => {
  return (
    <div>
      <label htmlFor="email">email</label>
      <input id={id} type="text" value={value} onChange={onChange} />
    </div>
  );
}

export default EmailInput;
