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
import { useState } from "react";
import { createSession } from "../../api/services/session.service.ts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  classId: string;
}

const schema = z.object({
  duration: z.number().min(30).max(180),
  date: z.string({ required_error: "Date is required." }),
});
type FormData = z.infer<typeof schema>;

const CreateSessionModal = ({ isOpen, onClose, classId }: Props) => {
  const [done, isDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => {
    createSession(classId, data.duration, data.date)
      ?.then(() => isDone(true))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={"100%"}>
          <ModalHeader>Create a session</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "inherit" }}
            >
              <FormInput
                w={["100%"]}
                type="text"
                label="Duration"
                register={register}
                valueAsNumber={true}
              />
              <FormInput
                w={["100%"]}
                type="date"
                label="Date"
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
              {errors.duration && (
                <Text color={"red"}>{errors.duration.message}</Text>
              )}
              {errors.date && <Text color={"red"}>{errors.date.message}</Text>}
              {done && (
                <Text color={"red.500"}>Successfully created the session!</Text>
              )}
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateSessionModal;
