import { Box, Stack } from "@chakra-ui/react";
import MenuItem from "./MenuItem";
import Categories from "./Categories";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/auth.service";

interface Props {
  isOpen: boolean;
  categories: string[];
}

interface User {
  type: string;
}

const MenuLinks = ({ isOpen, categories }: Props) => {
  const [user, setUser] = useState<User>(Object);
  useEffect(() => {
    getCurrentUser()?.then((res) => {
      setUser(res);
      console.log("RAQS");
    });
  }, []);
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
        {localStorage.getItem("user") && <Categories categories={categories} />}
        {user.type == "Teacher" ? (
          <MenuItem size="md" to="classes/create">
            Create Class
          </MenuItem>
        ) : null}
        {localStorage.getItem("user") && (
          <MenuItem size="md" to="me/learning">
            My Learning
          </MenuItem>
        )}
        {localStorage.getItem("user") && (
          <MenuItem size="lg" to="user/me">
            Profile
          </MenuItem>
        )}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
