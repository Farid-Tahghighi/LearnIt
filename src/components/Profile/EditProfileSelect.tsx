import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/auth.service";

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
      w={"20%"}
      border={"1px solid rgb(210, 210, 210)"}
      borderRight={"none"}
    >
      <Link to={`/user/${user._id}`}>Public Profile</Link>
      <Link to={`/user/me/profile}`}>Edit Information</Link>
      <Link onClick={() => logout()} to={`/home`}>
        Logout
      </Link>
    </Flex>
  );
};

export default EditProfileSelect;
