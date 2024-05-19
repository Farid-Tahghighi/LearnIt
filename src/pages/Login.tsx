import Button from "../components/Button";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/FormInput";
import { login } from "../api/services/auth.service";
import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
const schema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Invalid email." }),
  password: z
    .string({ required_error: "Password is required." })
    .min(4, { message: "Password should be longer than 6 characters." })
    .max(20, { message: "Password should be shorter than 20 characters." }),
});
type FormData = z.infer<typeof schema>;
const Login = () => {
  const [err, setErr] = useState<string>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) =>
    login(data)
      .then((res) => {
        if (Math.round(res.status / 100) != 2) {
          setErr(res.data);
        } else {
          navigate("/");
          window.location.reload();
        }
      })
      .catch((e) => console.log(e));
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      h={"100%"}
    >
      <FormInput type="email" label="Email" register={register}></FormInput>
      <FormInput
        type="password"
        label="Password"
        register={register}
      ></FormInput>
      <Text
        as={"h6"}
        size={"xs"}
        w={["70%", "45%", "45%", "30%"]}
        mb={4}
        mt={2}
      >
        Don't Have an account?{" "}
        <Text color={"red.500"} display={"inline"}>
          <Link to={"/signup"}>Sign Up!</Link>
        </Text>
      </Text>
      {errors.email && (
        <Text mb={2} color={"red"}>
          {errors.email.message}
        </Text>
      )}
      {errors.password && (
        <Text mb={2} color={"red"}>
          {errors.password.message}
        </Text>
      )}
      {err && (
        <Text mb={2} color={"red"}>
          {err}
        </Text>
      )}
      <Button type="button" bg="red.500" onClick={handleSubmit(onSubmit)}>
        Login
      </Button>
    </Flex>
  );
};

export default Login;
