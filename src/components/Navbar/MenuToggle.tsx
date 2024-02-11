import { Box } from "@chakra-ui/react";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const MenuToggle = ({ isOpen, toggle }: Props) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle} fontSize={"170%"}>
      {isOpen ? <IoCloseSharp /> : <IoIosMenu />}
    </Box>
  );
};

export default MenuToggle;
