import { Box, Stack } from "@chakra-ui/react";
import MenuItem from "./MenuItem";

interface Props {
    isOpen: boolean;
}

const MenuLinks = ({isOpen} : Props) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem size="lg" to="signup">Sign Up</MenuItem>
        <MenuItem size="lg" to="login">Login</MenuItem>
      </Stack>
    </Box>
  );
};

export default MenuLinks;
