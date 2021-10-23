import AuthTemplete from "./auth/AuthTemplete";
import AuthForm from "./auth/AuthForm";

const Login = () => {
  return (
    <AuthTemplete>
      <AuthForm type="LOGIN" />
    </AuthTemplete>
  );
};

export default Login;
