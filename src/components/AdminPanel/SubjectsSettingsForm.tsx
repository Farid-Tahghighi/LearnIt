import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import FormSelect from "../FormSelect";
import FormInput from "../FormInput";
import Button from "../Button";
import { deleteSubject, editSubject } from "../../api/services/subject.service";
import CreateSubjectModal from "../Subject/CreateSubjectModal";

interface Subject {
  title: string;
  credit: number;
  resource: string;
}

interface Props {
  selectedSubject: Subject | undefined;
}

const schema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(3, { message: "Title should be at least 3 characters." }),
  resource: z.string({ required_error: "Resource is required." }),
});
type FormData = z.infer<typeof schema>;

const SubjectsSettingsForm = ({ selectedSubject }: Props) => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [edited, setEdited] = useState<boolean>(false);
  const credit = useRef(0);
  const removeSubject = (title: string) => {
    deleteSubject(title)
      ?.then(() => {
        setEdited(false);
        setDeleted(true);
      })
      .catch((e) => console.log(e));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => {
    if (selectedSubject) {
      data.credit = Number(credit.current);
      editSubject(data, selectedSubject?.title)
        ?.then(() => {
          setDeleted(false);
          setEdited(true);
        })
        .catch((e) => console.log(e));
    }
  };
  useEffect(() => {
    if (selectedSubject) credit.current = selectedSubject?.credit;
  }, [selectedSubject]);
  return (
    <>
      <FormInput
        type="text"
        label="Title"
        register={register}
        defaultVal={selectedSubject?.title}
      />
      <FormSelect
        values={["1", "3", "6"]}
        defaultVal={selectedSubject?.credit.toString()}
        onSelect={(d) => (credit.current = Number(d))}
      />
      <FormInput
        type="text"
        label="Resource"
        register={register}
        defaultVal={selectedSubject?.resource}
      />
      <Flex
        direction={["column", "row"]}
        justify={"space-around"}
        align={"center"}
        mb={4}
        w={"50%"}
      >
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={selectedSubject ? false : true}
        >
          Edit
        </Button>
        <Button type="button" onClick={onOpen}>
          Create
        </Button>
        <CreateSubjectModal isOpen={isOpen} onClose={onClose} />
        <Button
          type="button"
          onClick={() =>
            removeSubject(selectedSubject ? selectedSubject.title : "")
          }
          disabled={selectedSubject ? false : true}
        >
          Delete
        </Button>
      </Flex>
      <Box mb={4}>
        {errors.title && (
          <Text align={"center"} color={"red"}>
            {errors.title.message}
          </Text>
        )}
        {errors.resource && (
          <Text align={"center"} color={"red"}>
            {errors.resource.message}
          </Text>
        )}
        {edited && <Text align={"center"}>Subject Edited Successfully.</Text>}
        {deleted && <Text align={"center"}>Subject Deleted Successfully.</Text>}
      </Box>
    </>
  );
};

export default SubjectsSettingsForm;
