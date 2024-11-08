import { AuthFormCustom } from "../components/AuthForm";
import { useAuthHook } from "../hooks/useAuthHook";

const Signup = () => {
  const { user, handleInputChange, handleSignUp, router } = useAuthHook();

  return (
    <AuthFormCustom
      title="Sign Up"
      handleSubmit={handleSignUp}
      fields={[
        {
          id: "username",
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
          required: true,
          onChange: handleInputChange,
          value: user.username,
        },
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
      submitLabel="Sign Up"
      linkLabel="Login"
      onLinkClick={() => router("/login")}
    />
  );
};

export default Signup;
