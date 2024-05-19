import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Input,
  Flex,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";

interface User {
  name: string;
  email: string;
}

type Inputs = {
  search: string;
};

interface Props {
  users: User[];
  participants: User[] | undefined;
  isOpen: boolean;
  onClose: () => void;
  submit: (data: User[]) => void;
}

const ParticipantsModal = ({
  users,
  isOpen,
  onClose,
  submit,
  participants,
}: Props) => {
  const [students, setStudents] = useState<User[]>([]);
  const [selected, setSelected] = useState<User[]>([]);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setStudents(users.filter((s) => s.name.includes(data.search)));
  };
  useEffect(() => {
    setSelected(participants ? participants : []);
  }, [participants]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select the students you want to add</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            {...register("search")}
            name="search"
            type="text"
            placeholder="Search Students"
            w={"90%"}
            onChange={handleSubmit(onSubmit)}
            alignSelf={"center"}
            borderRadius={"full"}
          />
          <Flex
            height={"200px"}
            overflow={"hidden"}
            overflowY={"scroll"}
            direction={"column"}
            align={"center"}
            p={1}
            my={3}
          >
            {students.map((p) => (
              <Text
                key={p.email}
                p={1}
                mb={1}
                w={"100%"}
                borderBottom={"1px solid rgb(210, 210, 210)"}
                _hover={{ backgroundColor: "rgb(210, 210, 210)" }}
                onClick={() => setSelected([...selected, p])}
              >
                {p.name}
              </Text>
            ))}
          </Flex>
          <HStack spacing={3}>
            {selected.map((s) => (
              <Tag
                key={s.email}
                borderRadius="full"
                variant="solid"
                colorScheme="red"
              >
                <TagLabel>{s.name}</TagLabel>
                <TagCloseButton
                  onClick={() =>
                    setSelected(selected.filter((ss) => ss.email != s.email))
                  }
                />
              </Tag>
            ))}
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Flex justify={"space-between"} align={"center"} w={"100%"}>
            <Button
              type="button"
              onClick={() => {
                submit(selected);
                onClose();
              }}
            >
              Ok
            </Button>
            <Button type="button" onClick={onClose}>
              Close
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ParticipantsModal;
