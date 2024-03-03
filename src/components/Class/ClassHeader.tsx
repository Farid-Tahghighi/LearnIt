import { Box, Flex, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  teacher: string;
  category: string;
}

const ClassHeader = ({ title, teacher, category }: Props) => {
  return (
    <Flex
      h={["50%", "30%"]}
      bg={"red.500"}
      direction={["column", "row"]}
      justify={["center", "space-between"]}
      align={"center"}
    >
      <Flex direction={"column"} justify={"start"} align={"center"}>
        <Text>{category}</Text>
        <Text>{title}</Text>
        <Text>By {teacher}</Text>
      </Flex>
    </Flex>
  );
};

export default ClassHeader;
