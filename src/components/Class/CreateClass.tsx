import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../FormInput";
import { Flex, Textarea } from "@chakra-ui/react";
import Button from "../Button";
import { createClass, getCurrentUser } from "../../services/auth.service";
import { useEffect, useState } from "react";

const schema = z.object({
  startDate: z.date().optional(),
  finishDate: z.date().optional(),
  title: z.string().min(1, { message: "title must be 1 character or longer." }),
  credit: z.enum(["1", "3", "6"]),
  resources: z.string(),
  location: z.string(),
  description: z
    .string()
    .min(25, { message: "Description must at least be 25 characters." })
    .max(150, { message: "Description must at most be 150 characters." }),
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
  const [user, setUser] = useState<{ _id: number }>(Object);
  useEffect(() => {
    getCurrentUser()?.then((res) => {
      setUser(res);
    });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => {
    data.presenterId = user._id;
    data.participants = user._id;
    createClass(data);
  };
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
        <FormInput type="date" label="StartDate" register={register} />
        <FormInput type="date " label="FinishDate" register={register} />
        <FormInput type="text" label="Location" register={register} />
        <Textarea
          placeholder="Description"
          size={"sm"}
          w={["70%", "45%", "45%", "30%"]}
          mb={3}
          resize={"vertical"}
          {...register("description")}
        ></Textarea>
        {errors.title && <p className="text-danger">{errors.title.message}</p>}
        {errors.credit && (
          <p className="text-danger">{errors.credit.message}</p>
        )}
        {errors.resources && (
          <p className="text-danger">{errors.resources.message}</p>
        )}
        {errors.startDate && (
          <p className="text-danger">{errors.startDate.message}</p>
        )}
        {errors.finishDate && (
          <p className="text-danger">{errors.finishDate.message}</p>
        )}
        {errors.location && (
          <p className="text-danger">{errors.location.message}</p>
        )}
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
        <Button type="submit" disabled={!isValid}>
          Create
        </Button>
      </Flex>
    </form>
  );
};

export default CreateClass;
