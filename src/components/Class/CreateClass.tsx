import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { useState } from "react";
import FormInput from "../FormInput";
import { Flex } from "@chakra-ui/react";
import Button from "../Button";

const schema = z.object({
  title: z.string().min(1),
  credit: z.enum(["1", "3", "6"]),
  resources: z.array(string()),
  startDate: z.string(),
  finishDate: z.string(),
  location: z.string(),
  category: z.string(),
  description: z.string().min(25).max(150),
});
type FormData = z.infer<typeof schema>;

interface Subject {
  title: string;
  credit: number;
  resources: string[];
}

interface Class {
  subject: Subject;
  startDate: string;
  finishDate: string;
  location: string;
  category: string;
  description: string;
}

const CreateClass = () => {
  const [clss, setClss] = useState<Class>(Object);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        border={"1px solid rgb(210, 210, 210)"}
        mx={"10%"}
        my={["8", "12"]}
        py={"5"}
      >
        <FormInput type="text" label="Title" register={register} />
        <FormInput type="number" label="Credit" register={register} />
        <FormInput type="text" label="Resources" register={register} />
        <FormInput type="date" label="Start" register={register} />
        <FormInput type="date" label="Finish" register={register} />
        <FormInput type="text" label="Location" register={register} />
        <FormInput type="text" label="Description" register={register} />
        <Button type="submit">Create</Button>
      </Flex>
    </form>
  );
};

export default CreateClass;
