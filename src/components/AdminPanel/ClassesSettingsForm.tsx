import { Select } from "chakra-react-select";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import Button from "../Button";
import ParticipantsModal from "../User/ParticipantsModal";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import {
  createClass,
  deleteClass,
  editClass,
} from "../../api/services/class.service";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Lclass {
  subject: { title: string };
  presenter: User;
  participants: User[];
  startDate: Date;
  finishDate: Date;
  location: string;
  category: string;
  description: string;
  _id: string;
}

interface Props {
  selectedClass: Lclass | undefined;
  presenters: User[];
  students: User[];
  categories: string[];
  subjects: string[];
}

interface User {
  name: string;
  email: string;
}

// const selectSchema = z.object({
//   label: z.string(),
//   value: z.string(),
// });

// type SelectData = z.infer<typeof selectSchema>;

const schema = z.object({
  startdate: z.coerce.date({ required_error: "Start Date is required." }),
  finishdate: z.coerce.date().optional(),
  description: z.string(),
  location: z.string().min(3),
});
type FormData = z.infer<typeof schema>;

const ClassesSettingsForm = ({
  selectedClass,
  students,
  presenters,
  categories,
  subjects,
}: Props) => {
  const [currentClass, setCurrentClass] = useState<Lclass | undefined>(
    selectedClass
  );
  const [edited, setEdited] = useState<boolean>(false);
  const [participants, setParticipants] = useState<User[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<{
    label: string;
    value: string;
  }>();
  const [selectedPresenter, setSelectedPresenter] = useState<{
    label: string;
    value: string;
  }>();
  const [state, setState] = useState("Edit");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const subject = useRef("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<FormData> = (data: FieldValues) => {
    console.log(subject.current);    
    data.participants = participants.map((p) => p["email"]);
    data.presenter = selectedPresenter?.value;
    data.category = selectedCategory?.value;
    data.subject = subject.current;
    console.log(currentClass?._id);
    
    switch (state) {
      case "Edit":
        if (currentClass) {
          editClass(currentClass._id, data)
            ?.then(() => setEdited(true))
            .catch((e) => console.log(e));
        }
        break;
      case "Create":
        createClass(data)
          .then(() => setEdited(true))
          .catch((e) => console.log(e));
        break;
    }
  };
  useEffect(() => {
    if (selectedClass) {
      setCurrentClass(selectedClass);
      subject.current = selectedClass.subject.title;
      setParticipants(selectedClass.participants);
      setSelectedCategory({
        label: selectedClass.category,
        value: selectedClass.category,
      });
      setSelectedPresenter({
        label: selectedClass.presenter.name,
        value: selectedClass.presenter.email,
      });
    }
  }, [selectedClass]);
  useEffect(() => {
    if (state == "Create") {
      selectedClass = undefined;
      setCurrentClass(undefined);
      setSelectedCategory(undefined);
      setSelectedPresenter(undefined);
      setParticipants([]);
    }
  }, [state]);
  return (
    <>
      <FormSelect
        values={subjects}
        onSelect={(s) => (subject.current = s)}
        defaultVal={currentClass?.subject.title || "Subjects"}
      />
      <FormInput
        type="date"
        label="StartDate"
        register={register}
        defaultVal={
          currentClass &&
          new Date(currentClass?.startDate).toISOString().split("T")[0]
        }
      />
      <FormInput
        type="date"
        label="FinishDate"
        register={register}
        defaultVal={
          currentClass &&
          new Date(currentClass?.finishDate).toISOString().split("T")[0]
        }
      />
      <Select
        value={selectedPresenter}
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            w: ["70%", "45%", "45%", "30%"],
            mb: 3,
          }),
        }}
        size={"md"}
        options={presenters.map((item) => {
          return { value: item.email, label: item.name };
        })}
        onChange={(e) => {
          if (e) {
            setSelectedPresenter(e);
          }
        }}
        placeholder="Select a presenter"
      />
      <Select
        value={selectedCategory}
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            w: ["70%", "45%", "45%", "30%"],
            mb: 3,
          }),
        }}
        size={"md"}
        options={categories.map((c) => {
          return { value: c, label: c };
        })}
        onChange={(e) => {
          if (e) {
            setSelectedCategory(e);
          }
        }}
      />
      <Flex
        direction={"column"}
        align={"center"}
        justify={"start"}
        border={"1px solid rgb(210, 210, 210)"}
        borderRadius={6}
        mb={3}
        p={1}
        w={["70%", "45%", "45%", "30%"]}
        height={"200px"}
        overflow={"hidden"}
        overflowY={"scroll"}
      >
        <Text>Participants</Text>
        {participants.map((p) => (
          <Flex
            key={p.email}
            direction={"row"}
            justify={"space-between"}
            align={"center"}
            _hover={{ backgroundColor: "rgb(210, 210, 210)" }}
            w={"100%"}
            px={1}
          >
            <Text>{p.name}</Text>
            <Text
              color={"red"}
              textDecoration={"underline"}
              cursor={"pointer"}
              onClick={() => {
                setParticipants(
                  participants.filter((pa) => p.email != pa.email)
                );
              }}
            >
              Delete
            </Text>
          </Flex>
        ))}
      </Flex>
      <Box>
        <Button type="button" onClick={onOpen}>
          Add
        </Button>
        <ParticipantsModal
          users={students}
          onClose={onClose}
          isOpen={isOpen}
          submit={(data) => {
            setParticipants(data);
          }}
          participants={currentClass?.participants}
        />
      </Box>
      <FormInput
        type="text"
        label="Location"
        register={register}
        placeholder="Location"
        defaultVal={currentClass?.location}
      />
      <Textarea
        {...register("description")}
        placeholder="Description"
        size={"sm"}
        w={["70%", "45%", "45%", "30%"]}
        mb={4}
        borderRadius={6}
        resize={"vertical"}
        defaultValue={currentClass?.description || ""}
      />
      <RadioGroup defaultValue="Edit" onChange={(e) => setState(e)}>
        <Stack direction="row">
          <Radio value="Edit">Edit</Radio>
          <Radio value="Create">Create</Radio>
        </Stack>
      </RadioGroup>
      <Flex
        direction={["column", "row"]}
        justify={"space-around"}
        align={"center"}
        mb={4}
        w={"50%"}
      >
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
        <Button
          type="button"
          onClick={() => deleteClass(currentClass ? currentClass?._id : "")}
        >
          Delete
        </Button>
      </Flex>
      <Box mb={4}>
        {errors.startdate && (
          <Text color={"red"} align={"center"}>
            {errors.startdate.message}
          </Text>
        )}
        {errors.finishdate && (
          <Text color={"red"} align={"center"}>
            {errors.finishdate.message}
          </Text>
        )}
        {errors.location && (
          <Text color={"red"} align={"center"}>
            {errors.location.message}
          </Text>
        )}
        {errors.description && (
          <Text color={"red"} align={"center"}>
            {errors.description.message}
          </Text>
        )}
        {edited && <Text align={"center"}>User Edited Successfully.</Text>}
      </Box>
    </>
  );
};

export default ClassesSettingsForm;
