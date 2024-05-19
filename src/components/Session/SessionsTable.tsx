// import { Flex, Text } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import ParticipantsModal from "../User/ParticipantsModal";
import { useRef, useState } from "react";
import { editPresent } from "../../api/services/session.service";

interface User {
  name: string;
  email: string;
}
interface Session {
  _id: string;
  duration: number;
  present: User[];
  date: Date;
}

interface Props {
  sessions: Session[];
  participants: User[];
  classId: string;
}

const SessionTable = ({ sessions, participants, classId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [present, setPresent] = useState<User[]>([]);
  const sessionId = useRef<string>("");
  return (
    <TableContainer w={"100%"}>
      <Table w={"100%"} m={0} p={0}>
        <Thead w={"100%"}>
          <Tr>
            <Th>Date</Th>
            <Th>Time</Th>
            <Th>Present</Th>
            <Th isNumeric>Duration</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sessions.map((s) => (
            <Tr key={s._id}>
              <Td>{s.date.toString().split("T", 1)}</Td>
              <Td>{s.date.toString().split("T", 2)[1]}</Td>
              <Td
                textDecoration={"underline"}
                onClick={() => {
                  onOpen();
                  setPresent(s.present);
                  sessionId.current = s._id;
                }}
              >
                Present
              </Td>
              <Td isNumeric>{s.duration}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ParticipantsModal
        onClose={onClose}
        isOpen={isOpen}
        users={participants}
        participants={present}
        submit={(data) => {
          editPresent(
            classId,
            data.map((d) => d["email"]),
            sessionId.current
          );
        }}
      />
    </TableContainer>
  );
};

export default SessionTable;
