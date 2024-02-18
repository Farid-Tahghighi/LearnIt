import { Box, Stack } from "@chakra-ui/react";
import MenuItem from "./MenuItem";

interface Props {
  isOpen: boolean;
}

const MenuLinks = ({ isOpen }: Props) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        {!localStorage.getItem("user") && (
          <MenuItem size="lg" to="user/signup">
            Sign Up
          </MenuItem>
        )}
        {!localStorage.getItem("user") && (
          <MenuItem size="lg" to="user/login">
            Login
          </MenuItem>
        )}
        {localStorage.getItem("user") && <div>Profile</div>}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
