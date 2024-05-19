import Information from "../components/Profile/Information";
import Button from "../components/Button";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/FormInput";
import { Flex, Text } from "@chakra-ui/react";
import EditProfileSelect from "../components/Profile/EditProfileSelect";
import { useEffect, useRef, useState } from "react";
import { editCurrentUser, getCurrentUser } from "../api/services/user.service";
import FormSelect from "../components/FormSelect";

const schema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a string.",
    })
    .min(2, { message: "Name must be 2 characters or longer." })
    .max(50, { message: "Name must be atmost me 50 characters or shorter." }),
  age: z
    .number({
      required_error: "Age is required.",
      invalid_type_error: "Age must be a number.",
    })
    .min(6, { message: "You must atleast be 6 years old." }),
  email: z
    .string({
      required_error: "Email is requied.",
      invalid_type_error: "Email must be a string.",
    })
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  description: z
    .string()
    .min(20, { message: "Description must be 20+ characters" })
    .max(150, { message: "Description limit reached." })
    .optional(),
});
interface User {
  name: string;
  age: number;
  email: string;
  description: string;
  gender: string;
}
type FormData = z.infer<typeof schema>;
const EditProfile = () => {
  const [user, setUser] = useState<User>(Object);
  const gender = useRef("");
  useEffect(() => {
    getCurrentUser()
      ?.then((res) => setUser(res))
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => {
    data.gender = gender.current;
    editCurrentUser(data, user.email);
  };
  return (
    <Flex w={"100%"} px={"10%"} direction={["column", "column", "row"]}>
      <EditProfileSelect />
      <Information>
        <FormInput
          type="text"
          label="Name"
          register={register}
          placeholder={user.name}
        ></FormInput>
        <FormInput
          type="number"
          label="Age"
          register={register}
          valueAsNumber={true}
          placeholder={String(user.age)}
        ></FormInput>
        <FormSelect
          values={["Male", "Female", "Not Set"]}
          defaultVal={user.gender}
          onSelect={(g) => (gender.current = g)}
        />
        <FormInput
          type="email"
          label="Email"
          register={register}
          placeholder={user.email}
        ></FormInput>
        {errors.name && <Text color={"red"}>{errors.name.message}</Text>}
        {errors.email && <Text color={"red"}>{errors.email.message}</Text>}
        {errors.age && <Text color={"red"}>{errors.age.message}</Text>}
        {errors.description && (
          <Text color={"red"}>{errors.description.message}</Text>
        )}
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          Edit
        </Button>
      </Information>
    </Flex>
  );
};

export default EditProfile;
