import { Flex } from "@chakra-ui/react";
import MenuItem from "../Navbar/MenuItem";

const SideBar = () => {
  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      py={3}
      w={["100%", "100%", "25%", "20%"]}
      border={"1px solid rgb(210, 210, 210)"}
      borderRight={[
        "1px solid rgb(210, 210, 210)",
        "1px solid rgb(210, 210, 210)",
        "none",
      ]}
      borderBottom={["none", "none", "1px solid rgb(210, 210, 210)"]}
    >
      <MenuItem to={`adminpanel`} size="sm">
        Users Setting
      </MenuItem>
      <MenuItem to={"adminpanel/classes"} size="sm">
        Classes Setting
      </MenuItem>
      <MenuItem to={"adminpanel/subjects"} size="sm">
        Subjects Settings
      </MenuItem>
      <MenuItem to={"adminpanel/sessions"} size="sm">
        Sessions Settings
      </MenuItem>
    </Flex>
  );
};

export default SideBar;
