import { useEffect, useState } from "react";
import Logo from "../Logo";
import MenuLinks from "./MenuLinks";
import MenuToggle from "./MenuToggle";
import NavbarContainer from "./NavbarContainer";
import SearchBar from "./SearchBar";
import Categories from "./Categories";
import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const nav = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/statics/categories")
      .then((res) => setCategories(res.data));
  });
  return (
    <>
      <NavbarContainer>
        <Flex
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignContent={"center"}
          w={"55%"}
        >
          <Logo width="60px" />
          <Categories categories={categories} />
          {(window.location.href == "http://localhost:5173/user/login" ||
            "http://localhost:5173/user/singup" ||
            "http://localhost:5173/user/profile") && (
            <SearchBar
              w={["80%", "40%", "70%"]}
              display={isOpen ? "none" : "block"}
            />
          )}
        </Flex>
        {localStorage.getItem("user") && (
          <Text
            onClick={() => nav("/me/learning")}
            color={"#141414"}
            _hover={{ color: "red.500" }}
          >
            My Learning
          </Text>
        )}
        <MenuToggle toggle={() => setOpen(!isOpen)} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
      </NavbarContainer>
    </>
  );
};

export default Navbar;
