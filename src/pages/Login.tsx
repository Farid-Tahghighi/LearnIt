import Button from "../components/Button";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/FormInput";
import { login } from "../services/auth.service";
const schema = z.object({
  email: z.string().min(3),
  password: z.string().min(4),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) =>
    login(data.email, data.password).then(() => {
      console.log("SUCCESS!!");
      navigate("/");
    });
  return (
    <>
      <form
        className="flex flex-col items-center justify-center w-full h-3/4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput label="Email" register={register}></FormInput>
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
        <FormInput label="Password" register={register}></FormInput>
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
        <div className="flex flex-row justify-between items-center  w-2/6">
          <h6 className="m-0">
            Don't have an account?{" "}
            <Link className=" text-red-500" to={"/signup"}>
              Sign Up!
            </Link>
          </h6>
          <Button type="submit" disabled={!isValid} bg="red.500">
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;

{
  /* <Button disabled={!isValid} type="submit">Submit</Button> */
}
