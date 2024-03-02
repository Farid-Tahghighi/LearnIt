import Button from "../components/Button";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/FormInput";
import { login } from "../api/services/auth.service";
import { Flex, Text } from "@chakra-ui/react";
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
    formState: { isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) =>
    login(data.email, data.password).then(() => {
      navigate("/");
      window.location.reload();
    });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "75%" }}>
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
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={["70%", "45%", "45%", "30%"]}
            mt={3}
          >
            <Text as={"h6"} size={"xs"}>
              Don't Have an account?{" "}
              <Text color={"red.500"} display={"inline"}>
                <Link to={"/signup"}>Sign Up!</Link>
              </Text>
            </Text>
            <Button type="submit" disabled={!isValid} bg="red.500">
              Login
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default Login;
