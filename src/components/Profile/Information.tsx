import { Box, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Information = ({ children }: Props) => {
  return (
    <Flex
      w={"100%"}
      direction={"column"}
      justify={"center"}
      align={"center"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        py={"6"}
        border={"1px solid rgb(210, 210, 210)"}
        borderBottom={"none"}
        w={"inherit"}
      >
        <Text size={"xl"} fontWeight={"700"} color={"#141414"}>
          Farid's Profile
        </Text>
        <Text size={"md"} color={"gray"}>
          Information about yourself.
        </Text>
      </Box>
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        mb={"3"}
        py={"6"}
        w={"inherit"}
        border={"1px solid rgb(210, 210, 210)"}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default Information;
