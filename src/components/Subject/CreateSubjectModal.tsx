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
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters." }),
  credit: z.enum(["1", "3", "6"]),
  resources: z.string(),
});
type FormData = z.infer<typeof schema>;

const CreateSubjectModal = ({ isOpen, onClose }: Props) => {
  const [done, isDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    createSubject(data)
      ?.then(() => isDone(true))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={"100%"}>
          <ModalHeader>Create a subject</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "inherit" }}
            >
              <FormInput
                w={["100%"]}
                type="text"
                label="Title"
                register={register}
              />
              <FormInput
                w={["100%"]}
                type="text"
                label="Credit"
                register={register}
              />
              <FormInput
                w={["100%"]}
                type="text"
                label="Resources"
                register={register}
              />
              <Flex
                direction={["column", "row"]}
                align={["center", "center"]}
                justify={["space-around", "space-between"]}
              >
                <Button type="submit">Submit</Button>
                <Button onClick={onClose} type="button">
                  Close
                </Button>
              </Flex>
            </form>
          </ModalBody>
          <ModalFooter>
            <Flex
              direction={"column"}
              justifyContent={"center"}
              align={"center"}
            >
              {errors.title && (
                <Text color={"red"}>{errors.title.message}</Text>
              )}
              {errors.credit && (
                <Text color={"red"}>{errors.credit.message}</Text>
              )}
              {errors.resources && (
                <Text color={"red"}>{errors.resources.message}</Text>
              )}
              {done && (
                <Text color={"red.500"}>Successfully created the subject!</Text>
              )}
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateSubjectModal;
