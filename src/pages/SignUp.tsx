import Button from "../components/Button";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/FormInput";
import { Flex, Text } from "@chakra-ui/react";
import { signup } from "../api/services/auth.service";
import { useState } from "react";
const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password should be longer than 6 characters." })
    .max(20, { message: "Password should be shorter than 20 characters." }),
  name: z
    .string()
    .min(2, { message: "Name must be longer than 2 characters." }),
  age: z
    .number({ invalid_type_error: "Age must be a number." })
    .min(6, { message: "You must be 6 years old or more." }),
});
type FormData = z.infer<typeof schema>;
const SignUp = () => {
  const [err, setErr] = useState<string>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => {
    data.type = "Student";
    data.gender = "Not Set";
    signup(data)
      .then((res) => {
        if (Math.round(res.status) != 200) {
          setErr(res.data);
        } else {
          navigate("/");
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      h={"100%"}
    >
      <FormInput type="text" label="Name" register={register}></FormInput>
      <FormInput type="email" label="Email" register={register}></FormInput>
      <FormInput
        type="number"
        label="Age"
        register={register}
        valueAsNumber={true}
      ></FormInput>
      <FormInput
        type="password"
        label="Password"
        register={register}
      ></FormInput>
      {errors.name && <Text color={"red"}>{errors.name.message}</Text>}
      {errors.email && <Text color={"red"}>{errors.email.message}</Text>}
      {errors.age && <Text color={"red"}>{errors.age.message}</Text>}
      {errors.password && <Text color={"red"}>{errors.password.message}</Text>}
      {err && <Text color={"red"}>{err}</Text>}
      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={["75%", "45%", "45%", "30%"]}
        mt={3}
      >
        <Text as={"h6"} size={"xs"}>
          Already have an account?{" "}
          <Text color={"red.500"} display={"inline"}>
            <Link to={"/login"}>Login!</Link>
          </Text>
        </Text>
        <Button type="button" onClick={handleSubmit(onSubmit)} bg="red.500">
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignUp;
