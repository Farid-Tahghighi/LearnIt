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
      mb={8}
      py={4}
      px={5}
      bg={["red.600", "red.600", "red.600", "red.600"]}
      color={["white", "white", "primary.700", "primary.700"]}
    >
      {children}
    </Flex>
  );
};

export default NavbarContainer;
