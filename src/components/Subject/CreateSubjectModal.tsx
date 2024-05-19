import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
} from "@chakra-ui/react";
import FormInput from "../FormInput";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button.tsx";
import { createSubject } from "../../api/services/subject.service.ts";
import { useRef, useState } from "react";
import FormSelect from "../FormSelect.tsx";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const schema = z.object({
  title: z
    .string({ required_error: "Title is reqiured." })
    .min(3, { message: "Title should be at least 3 characters." }),
  resource: z.string({ required_error: "Resource is required." }),
});
type FormData = z.infer<typeof schema>;

const CreateSubjectModal = ({ isOpen, onClose }: Props) => {
  const [done, isDone] = useState(false);
  const credit = useRef(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => {
    data.credit = credit.current;
    createSubject(data)
      ?.then(() => isDone(true))
      .catch((e) => console.log(e));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={"100%"}>
        <ModalHeader>Create a subject</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormInput
            w={["100%"]}
            type="text"
            label="Title"
            register={register}
          />
          <Flex justify={"center"} align={"center"} w={"100%"}>
            <FormSelect
              values={["1", "3", "6"]}
              defaultVal={"Credit"}
              onSelect={(d) => (credit.current = Number(d))}
            />
          </Flex>
          <FormInput
            w={["100%"]}
            type="text"
            label="Resource"
            register={register}
          />
          <Flex
            direction={["column", "row"]}
            align={["center", "center"]}
            justify={["space-around", "space-between"]}
          >
            <Button type="button" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
            <Button onClick={onClose} type="button">
              Close
            </Button>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex direction={"column"} justifyContent={"center"} align={"center"}>
            {errors.title && <Text color={"red"}>{errors.title.message}</Text>}
            {errors.resource && (
              <Text color={"red"}>{errors.resource.message}</Text>
            )}
            {done && (
              <Text color={"red.500"}>Successfully created the subject!</Text>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateSubjectModal;
