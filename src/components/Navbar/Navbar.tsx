import { useState } from "react";
import Logo from "../Logo";
import MenuLinks from "./MenuLinks";
import MenuToggle from "./MenuToggle";
import NavbarContainer from "./NavbarContainer";



const Navbar = () => {
    const[isOpen, setOpen] = useState(false);
  return (
    <NavbarContainer>
      <Logo
        width="60px"
        color={["white", "white", "primary.500", "primary.500"]}
      />
      <MenuToggle toggle={() => setOpen(!isOpen)} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavbarContainer>
  );
};

export default Navbar;
