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
  duration: z
    .number({
      required_error: "Duration is required.",
      invalid_type_error: "Duration must be a number(munites).",
    })
    .min(30, { message: "Minimum duration is 30 minutes." })
    .max(180, { message: "Maximum duration is 180 minutes." }),
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
    data.present = [];
    data.classId = classId;
    createSession(data)
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
            <FormInput
              w={"100%"}
              type="text"
              label="Duration"
              register={register}
              valueAsNumber={true}
            />
            <FormInput
              w={"100%"}
              type="datetime-local"
              label="Date"
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
