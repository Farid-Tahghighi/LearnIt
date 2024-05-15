// import { Flex, Text } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

interface Session {
  _id: string;
  duration: number;
  date: Date;
}

interface Props {
  sessions: Session[];
}

const SessionCard = ({ sessions }: Props) => {
  return (
    <TableContainer px={"10%"}>
      <Table variant="simple">
        <TableCaption>Class Sessions</TableCaption>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th isNumeric>Duration</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sessions.map((s) => (
            <Tr key={s._id}>
              <Td>{s.date.toString()}</Td>
              <Td isNumeric>{s.duration}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SessionCard;
