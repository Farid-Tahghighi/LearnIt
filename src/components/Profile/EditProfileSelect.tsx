import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MenuItem from "../Navbar/MenuItem";
import { getCurrentUser, logout } from "../../api/services/auth.service";

const EditProfileSelect = () => {
  const [user, setUser] = useState(Object);
  useEffect(() => {
    getCurrentUser()?.then((res) => setUser(res));
  }, []);
  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      py={["4", "4", "0"]}
      w={["100%", "100%", "25%", "20%"]}
      border={"1px solid rgb(210, 210, 210)"}
      borderRight={["1px solid rgb(210, 210, 210)", "1px solid rgb(210, 210, 210)", "none"]}
      borderBottom={["none", "none", "1px solid rgb(210, 210, 210)"]}
    >
      <MenuItem to={`user/${user._id}`} size="sm">
        Public Profile
      </MenuItem>
      <MenuItem to={"user/me/profile"} size="sm">
        Edit Information
      </MenuItem>
      <MenuItem onClick={() => logout()} to={`/`} size="sm">
        Logout
      </MenuItem>
    </Flex>
  );
};

export default EditProfileSelect;
