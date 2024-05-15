import { Flex, Heading, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  teacher: string;
  category: string;
}

const ClassHeader = ({ title, teacher, category }: Props) => {
  return (
    <>
      <Flex direction={"row"} align={"center"} mb={"4"}>
        <Text fontSize={"large"} mx={4}>
          Categoty:{" "}
        </Text>
        <Heading>{category}</Heading>
      </Flex>
      <Flex
        direction={"column"}
        justify={"start"}
        align={"center"}
        bg={"red.500"}
        color={"rgb(251, 251, 251)"}
      >
        <Heading py={4} fontSize={["x-large", "xx-large"]}>
          {title}
        </Heading>
        <Heading as={"h5"} fontSize={"lg"} py={3} bg={"red.500"}>
          By {teacher}
        </Heading>
      </Flex>
    </>
  );
};

export default ClassHeader;
