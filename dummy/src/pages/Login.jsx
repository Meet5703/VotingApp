import { AuthFormCustom } from "../components/AuthForm";
import { useAuthHook } from "../hooks/useAuthHook";

const Login = () => {
  const { user, handleInputChange, handleSignIn } = useAuthHook();

  return (
    <AuthFormCustom
      title="Login"
      handleSubmit={handleSignIn}
      fields={[
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          required: true,
          onChange: handleInputChange,
          value: user.email,
        },
        {
          id: "password",
          label: "Password",
          type: "password",
          placeholder: "Create a password",
          required: true,
          onChange: handleInputChange,
          value: user.password,
        },
      ]}
      submitLabel="Login"
      linkLabel="Sign Up"
      onLinkClick={() => window.location.replace("/signup")}
    />
  );
};

export default Login;
