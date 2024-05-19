import { Flex, useDisclosure } from "@chakra-ui/react";
import SessionTable from "../Session/SessionsTable";
import Button from "../Button";
import CreateSessionModal from "../Session/CreateSessionModal";

interface User {
  name: string;
  email: string;
}

interface Session {
  _id: string;
  present: User[];
  duration: number;
  date: Date;
}

interface Lclass {
  participants: User[];
  _id: string;
}

interface Props {
  selectedClass: Lclass | undefined;
  sessions: Session[];
}

const SessionsSettingsForm = ({ selectedClass, sessions }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        direction={"column"}
        align={"center"}
        border={"1px solid rgb(210, 210, 210)"}
        borderRadius={6}
        mb={3}
        p={1}
        w={["70%", "45%", "45%", "70%"]}
        height={"200px"}
        overflow={"hidden"}
        overflowY={"scroll"}
      >
        <SessionTable
          sessions={sessions}
          participants={selectedClass ? selectedClass.participants : []}
          classId={selectedClass ? selectedClass?._id : ""}
        />
      </Flex>
      <Button
        type="button"
        disabled={selectedClass ? false : true}
        onClick={onOpen}
      >
        Add
      </Button>
      <CreateSessionModal
        isOpen={isOpen}
        onClose={onClose}
        classId={selectedClass ? selectedClass._id : ""}
      />
    </>
  );
};

export default SessionsSettingsForm;
