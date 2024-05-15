import { Flex, Text } from "@chakra-ui/react";
import AdminPanelCard from "../components/AdminPanel/AdminPanelCard";
import SearchBar from "../components/Navbar/SearchBar";
import { useEffect, useState } from "react";
import { getSubjects } from "../api/services/subject.service";
import SideBar from "../components/AdminPanel/SideBar";
import SubjectsSettingsForm from "../components/AdminPanel/SubjectsSettingsForm";

interface Subject {
  title: string;
  credit: number;
  resource: string;
}

const AdminPanelSubjects = () => {
  const [filtered, setFiltered] = useState<Subject[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject>();
  useEffect(() => {
    getSubjects()
      .then((res) => {
        setSubjects(res);
      })
      .catch((e) => console.log(e));
  });
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
          Subjects Setting Section
        </Text>
        <SearchBar
          width={"50%"}
          submit={(data) => {
            if (data != "") {
              const filteredSubjects = subjects.filter((s) => {
                return s.title.toLowerCase().includes(data.toLowerCase());
              });
              setFiltered(filteredSubjects);
            } else {
              setFiltered([]);
            }
          }}
        />
        <Flex
          direction={"row"}
          justify={"start"}
          align={"center"}
          wrap={"wrap"}
          my={4}
        >
          {filtered.map((s) => (
            <AdminPanelCard
              key={s.title}
              title={s.title}
              desc={s.credit.toString()}
              onClick={() => setSelectedSubject(s)}
            />
          ))}
        </Flex>
        <SubjectsSettingsForm selectedSubject={selectedSubject} />
      </Flex>
    </Flex>
  );
};

export default AdminPanelSubjects;
