import { Flex, Text } from "@chakra-ui/react";
import SideBar from "../components/AdminPanel/SideBar";
import SearchBar from "../components/Navbar/SearchBar";
import AdminPanelCard from "../components/AdminPanel/AdminPanelCard";
import { useEffect, useState } from "react";
import { getClasses } from "../api/services/class.service";
import { getSessions } from "../api/services/session.service";
import SessionsSettingsForm from "../components/AdminPanel/SessionsSettingsForm";

interface User {
  name: string;
  email: string;
}

interface Lclass {
  subject: { title: string };
  category: string;
  participants: User[];
  _id: string;
}

interface Session {
  _id: string;
  date: Date;
  duration: number;
  present: User[];
}

const AdminPanelSessions = () => {
  const [classes, setClasses] = useState<Lclass[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedClass, setSelectedClass] = useState<Lclass | undefined>();
  const [filtered, setFiltered] = useState<Lclass[]>([]);
  useEffect(() => {
    getClasses()
      .then((res) => {
        setClasses(res);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    if (selectedClass)
      getSessions(selectedClass._id)
        .then((res) => {
          setSessions(res);
          console.log(res);
        })
        .catch((e) => console.log(e));
  }, [selectedClass]);
  return (
    <Flex w="95%" m={"auto"} pb={4} direction={["column", "column", "row"]}>
      <SideBar />
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        width={"100%"}
        border={"1px solid rgb(210, 210, 210)"}
        pb={4}
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
          Classes Settings Section
        </Text>
        <SearchBar
          width={"50%"}
          submit={(data) => {
            if (data != "") {
              const filteredClasses = classes.filter((c) => {
                return c.subject.title
                  .toLowerCase()
                  .includes(data.toLowerCase());
              });
              setFiltered(filteredClasses);
            } else {
              setFiltered([]);
            }
          }}
        />
        <Flex
          align={"center"}
          wrap={"wrap"}
          my={4}
        >
          {filtered.map((c) => (
            <AdminPanelCard
              key={c._id}
              title={c.subject.title}
              desc={c.category}
              onClick={() => setSelectedClass(c)}
            />
          ))}
        </Flex>
        <SessionsSettingsForm
          selectedClass={selectedClass}
          sessions={sessions}
        />
      </Flex>
    </Flex>
  );
};

export default AdminPanelSessions;
