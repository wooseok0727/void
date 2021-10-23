import AuthTemplete from "./auth/AuthTemplete";
import AuthForm from "./auth/AuthForm";

const Register = () => {
  return (
    <AuthTemplete>
      <AuthForm type="JOIN" />
    </AuthTemplete>
  );
};

export default Register;
