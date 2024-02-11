import FormInput from "../components/FormInput";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <form className="flex flex-col items-center justify-center w-full h-3/4">
        <FormInput label="Username"></FormInput>
        <FormInput label="Password"></FormInput>
        <p>
          Don't have an account? <Link to={"/signup"}>Sign Up!</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
