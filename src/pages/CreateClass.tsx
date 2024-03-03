import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/FormInput";
import { Box, Flex, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import Button from "../components/Button";
import { createClass, getCategories } from "../api/services/class.service";
import { useEffect, useRef, useState } from "react";
import { getSubjects } from "../api/services/subject.service";
import FormSelect from "../components/FormSelect";
import CreateSubjectModal from "../components/Subject/CreateSubjectModal";
import { getCurrentUser } from "../api/services/user.service";

const schema = z.object({
  startdate: z.string(),
  finishdate: z.string().optional(),
  location: z.string(),
  description: z
    .string()
    .min(30, { message: "Description must at least be 25 characters." })
    .max(150, { message: "Description must at most be 150 characters." }),
  category: z.string(),
});
type FormData = z.infer<typeof schema>;

interface Subject {
  title: string;
}

const CreateClass = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<{ _id: number }>(Object);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [categories, setCategores] = useState<string[]>([]);
  const [done, isDone] = useState(false);
  const subject = useRef("");
  const category = useRef("");

  useEffect(() => {
    getCurrentUser()?.then((res) => {
      setUser(res);
    });
    getSubjects()
      .then((res) => {
        setSubjects(res);
      })
      .catch((e) => console.log(e));
    getCategories()
      .then((res) => {
        setCategores(res);
      })
      .catch((e) => console.log(e));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    data.presenterId = user._id;
    data.participants = [user._id];
    data.subjectTitle = subject.current;
    data.category = category.current;
    createClass(
      data.subjectTitle,
      data.participants,
      data.presenterId,
      data.startdate,
      data.finishdate,
      data.location,
      data.category,
      data.description
    )
      .then(() => isDone(true))
      .catch((e) => console.log(e));
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
        <FormSelect
          defaultVal="Subjects"
          values={subjects.map((s) => s["title"])}
          // register={register}
          onSelect={(s) => (subject.current = s)}
        />
        <FormSelect
          defaultVal="Categories"
          values={categories}
          onSelect={(c) => (category.current = c)}
        />
        <Text as={"h6"} size={"xs"} mb={3}>
          The subject you're looking for doesn't exist?{" "}
          <Text color={"red.500"} display={"inline"} onClick={onOpen}>
            Make it!
          </Text>
        </Text>
        <CreateSubjectModal isOpen={isOpen} onClose={onClose} />
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
        <Box mb={3}>
          {errors.startdate && (
            <Text color={"red"}>{errors.startdate.message}</Text>
          )}
          {errors.finishdate && (
            <Text color={"red"}>{errors.finishdate.message}</Text>
          )}
          {errors.location && (
            <Text color={"red"}>{errors.location.message}</Text>
          )}
          {errors.description && (
            <Text color={"red"}>{errors.description.message}</Text>
          )}
          {done && (
            <Text color={"red.500"}>Successfully created the class!</Text>
          )}
        </Box>
        <Button type="submit">Create</Button>
      </Flex>
    </form>
  );
};

export default CreateClass;
