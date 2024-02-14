import LoginForm from "./LoginForm";
import { login } from "./LoginService";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data: { username: string; password: string }) => {
    try {
      const response = await login(data.username, data.password);
      navigate('/homepage');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div>
        <LoginForm onSubmit={handleSubmit}/>
      </div>
  );
}

export default LoginPage;
