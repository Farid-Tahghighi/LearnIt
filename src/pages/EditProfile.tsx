import Information from "../components/Profile/Information";
import Button from "../components/Button";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/FormInput";
import { editCurrentUser, getCurrentUser } from "../api/services/auth.service";
import { Flex } from "@chakra-ui/react";
import EditProfileSelect from "../components/Profile/EditProfileSelect";
import { useEffect, useState } from "react";
const schema = z.object({
  name: z.string().min(2),
  age: z.number().min(6),
  gender: z.enum(["Male", "Female", "Not Set"]),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  description: z.string().min(20).max(150).optional(),
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
  useEffect(() => {
    getCurrentUser()
      ?.then((res) => setUser(res))
      .catch((e) => {
        console.log("SOMETHING WENT WRONG! " + e);
      });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => editCurrentUser(data, user.email);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            placeholder={user.age + ""}
          ></FormInput>
          <FormInput
            type="string"
            label="Gender"
            register={register}
            placeholder={user.gender}
          ></FormInput>
          <FormInput
            type="email"
            label="Email"
            register={register}
            placeholder={user.email}
          ></FormInput>
          <Button type="submit" disabled={!isValid}>
            Edit
          </Button>
        </Information>
      </Flex>
    </form>
  );
};

export default EditProfile;
