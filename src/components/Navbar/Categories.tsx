import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  categories: string[];
}

const Categories = ({ categories }: Props) => {
  const nav = useNavigate();
  return (
    <Menu>
      <MenuButton
        bg={"transparent"}
        color={"#141414"}
        _hover={{ color: "red.500" }}
        display={{ base: "none", md: "block" }}
      >
        Categories
      </MenuButton>
      <MenuList>
        {categories.map((c) => {
          return (
            <MenuItem key={c}
              _hover={{ color: "red.500", backgroundColor: "transparent" }}
              onClick={() => nav(`/classes/${c.toLowerCase()}`)}
            >
              {c}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default Categories;
