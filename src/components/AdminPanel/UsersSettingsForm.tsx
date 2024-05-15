import { useRef, useState } from "react";
import { deleteUser, editUser } from "../../api/services/user.service";
import FormInput from "../FormInput";
import { FieldValues, useForm } from "react-hook-form";
import { Box, Flex, Text } from "@chakra-ui/react";
import Button from "../Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "../FormSelect";

interface User {
  name: string;
  email: string;
  age: number;
  type: string;
  gender: string;
}

interface Props {
  selectedUser: User | undefined;
}

const schema = z.object({
  name: z.string().min(3),
  age: z.number().min(18),
  email: z.string().min(3),
});
type FormData = z.infer<typeof schema>;
const UsersSettingsForm = ({ selectedUser }: Props) => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const type = useRef(selectedUser?.type);
  const gender = useRef(selectedUser?.gender);
  const [edited, setEdited] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => {
    if (selectedUser) {
      data.gender = gender.current;
      data.type = type.current;
      editUser(data, selectedUser.email)?.then(() => {
        setEdited(true);
        setDeleted(false);
      });
    }
  };
  const removeUser = (email: string) => {
    if (selectedUser) {
      deleteUser(email)?.then(() => {
        setEdited(false);
        setDeleted(true);
      });
    }
  };
  return (
    <>
      <FormInput
        type="text"
        label="Name"
        register={register}
        defaultVal={selectedUser?.name}
      />
      <FormInput
        type="text"
        label="Email"
        register={register}
        defaultVal={selectedUser?.email}
      />
      <FormSelect
        values={["Student", "Teacher", "Moderator"]}
        defaultVal={selectedUser?.type.toString() || "Type"}
        onSelect={(d) => (type.current = d)}
      />
      <FormSelect
        values={["Male", "Female", "Not Set"]}
        defaultVal={selectedUser?.gender.toString() || "Gender"}
        onSelect={(d) => (gender.current = d)}
      />
      <FormInput
        type="number"
        label="Age"
        register={register}
        valueAsNumber={true}
        defaultVal={selectedUser?.age.toString()}
      />
      <Flex
        direction={["column", "row"]}
        justify={"space-around"}
        align={"center"}
        mb={4}
        w={"50%"}
      >
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          Edit
        </Button>
        <Button
          type="button"
          onClick={() => removeUser(selectedUser ? selectedUser?.email : "")}
        >
          Delete
        </Button>
      </Flex>
      <Box mb={4}>
        {errors.name && (
          <Text align={"center"} color={"red"}>
            {errors.name.message}
          </Text>
        )}
        {errors.email && (
          <Text color={"red"} align={"center"}>
            {errors.email.message}
          </Text>
        )}
        {errors.age && (
          <Text color={"red"} align={"center"}>
            {errors.age.message}
          </Text>
        )}
        {deleted && <Text color={"red"}>User deleted successfully.</Text>}
        {edited && <Text align={"center"}>User Edited Successfully.</Text>}
      </Box>
    </>
  );
};

export default UsersSettingsForm;
