import { Flex, Text } from "@chakra-ui/react";
import SideBar from "../components/AdminPanel/SideBar";
import UsersSettingsForm from "../components/AdminPanel/UsersSettingsForm";
import SearchBar from "../components/Navbar/SearchBar";
import AdminPanelCard from "../components/AdminPanel/AdminPanelCard";
import { useEffect, useState } from "react";
import { getUsers } from "../api/services/user.service";

interface User {
  name: string;
  email: string;
  age: number;
  type: string;
  gender: string;
}

const AdminPanel = () => {
  const [filtered, setFiltered] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <Flex w="95%" m={"auto"} pb={4} direction={["column", "column", "row"]}>
      <SideBar />
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        width={"100%"}
        border={"1px solid rgb(210, 210, 210)"}
      >
        <Text
          fontWeight={"700"}
          fontSize={"large"}
          borderBottom={"1px solid rgb(210, 210, 210)"}
          textAlign={"center"}
          p={4}
          mb={4}
          w={"inherit"}
        >
          Users Setting Section
        </Text>
        <SearchBar
          width={"50%"}
          submit={(data) => {
            if (data != "") {
              const filteredUsers = users.filter((u) => {
                return u.name.toLowerCase().includes(data.toLowerCase());
              });
              setFiltered(filteredUsers);
            } else {
              setFiltered([]);
            }
          }}
        />
        <Flex justify={"center"} align={"center"} wrap={"wrap"} my={4}>
          {filtered.map((u) => (
            <AdminPanelCard
              key={u.email}
              title={u.name}
              desc={u.email}
              onClick={() => setSelectedUser(u)}
            />
          ))}
        </Flex>
        <UsersSettingsForm selectedUser={selectedUser} />
      </Flex>
    </Flex>
  );
};

export default AdminPanel;
