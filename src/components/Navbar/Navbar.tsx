import { useEffect, useState } from "react";
import Logo from "../Logo";
import MenuLinks from "./MenuLinks";
import MenuToggle from "./MenuToggle";
import NavbarContainer from "./NavbarContainer";
import SearchBar from "./SearchBar";
import { Stack } from "@chakra-ui/react";
import { getCategories } from "../../api/services/class.service";

interface Props {
  search: (s: string) => void;
}

const Navbar = ({ search }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);
  return (
    <>
      <NavbarContainer>
        <Stack
          flexDirection={"row"}
          spacing={["4", "8"]}
          justifyContent={"flex-start"}
          alignContent={"center"}
          w={["85%", "80%", "60%", "55%"]}
        >
          <Logo width={["50px", "60px"]} />
          {!(
            window.location.href == "http://localhost:5173/user/login" ||
            window.location.href == "http://localhost:5173/user/signup" ||
            window.location.href == "http://localhost:5173/user/me"
          ) && (
            <SearchBar
              submit={(s) => {
                search(s);
              }}
              display={isOpen ? "none" : "block"}
            />
          )}
        </Stack>
        <MenuToggle toggle={() => setOpen(!isOpen)} isOpen={isOpen} />
        <MenuLinks categories={categories} isOpen={isOpen} />
      </NavbarContainer>
    </>
  );
};

export default Navbar;
