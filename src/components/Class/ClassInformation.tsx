import { Flex, Text } from "@chakra-ui/react";

interface Props {
  description: string;
  startDate: string;
  finishDate: string;
  location: string;
  subject: string;
  credit: number;
}

const ClassInformation = ({
  description,
  startDate,
  location,
  finishDate,
  subject,
  credit,
}: Props) => {
  return (
    <Flex
      direction={["column","column", "row"]}
      justify={["center", "start"]}
      align={"center"}
    >
      <Text w={"70%"} py={4} px={8} textAlign={"center"}>
        {description}
      </Text>
      <Flex
        height={["auto", "unset"]}
        width={["auto", "auto", "30%"]}
        direction={"column"}
        align={"center"}
        py={4}
        px={8}
      >
        <Text fontWeight={"650"}>Subject: {subject}</Text>
        <Text>Credit: {credit}</Text>
        <Text>Start date: {startDate}</Text>
        <Text>Finish date: {finishDate}</Text>
        <Text>Sessions will be held in {location}</Text>
      </Flex>
    </Flex>
  );
};

export default ClassInformation;
