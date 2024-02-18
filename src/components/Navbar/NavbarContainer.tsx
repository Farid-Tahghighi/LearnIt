import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const NavbarContainer = ({ children }: Props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={4}
      py={3}
      px={5}
      bg={"white"}
      boxShadow={"md"}
    >
      {children}
    </Flex>
  );
};

export default NavbarContainer;
