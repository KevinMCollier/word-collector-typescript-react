import LoginForm from "./LoginForm";
import { login } from "./LoginService";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
      navigate('/homepage');
    } catch (error) {
    }
  };

  return (
      <div>
        <LoginForm onSubmit={handleSubmit}/>
      </div>
  );
}

export default LoginPage;
