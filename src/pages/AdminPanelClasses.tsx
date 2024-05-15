import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCategories, getClasses } from "../api/services/class.service";
import AdminPanelCard from "../components/AdminPanel/AdminPanelCard";
import { getPresenters, getStudents } from "../api/services/user.service";
import { getSubjects } from "../api/services/subject.service";
import ClassesForm from "../components/AdminPanel/ClassesSettingsForm";
import SideBar from "../components/AdminPanel/SideBar";
import SearchBar from "../components/Navbar/SearchBar";

interface User {
  name: string;
  email: string;
}

interface Lclass {
  subject: { title: string };
  presenter: User;
  participants: User[];
  startDate: Date;
  finishDate: Date;
  location: string;
  category: string;
  description: string;
  _id: string;
}

const Classes = () => {
  const [classes, setClasses] = useState<Lclass[]>([]);
  const [selectedClass, setSelectedClass] = useState<Lclass|undefined>();
  const [filtered, setFiltered] = useState<Lclass[]>([]);
  const [presenters, setPresenters] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [categories, setCategores] = useState<string[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  useEffect(() => {
    getClasses()
      .then((res) => {
        setClasses(res);
      })
      .catch((e) => console.log(e));
    getPresenters()
      .then((res) => {
        setPresenters(res);
      })
      .catch((e) => console.log(e));
    getCategories()
      .then((res) => {
        setCategores(res);
      })
      .catch((e) => console.log(e));
    getSubjects()
      .then((res) => {
        setSubjects(res.map((s: { title: string }) => s["title"]));
      })
      .catch((e) => console.log(e));
    getStudents()
      .then((res) => {
        setStudents(res);
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
              const filteredClasses = classes.filter((u) => {
                return u.subject.title
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
          direction={"row"}
          justify={"start"}
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
        <ClassesForm
          selectedClass={selectedClass}
          presenters={presenters}
          categories={categories}
          subjects={subjects}
          students={students}
        />
      </Flex>
    </Flex>
  );
};

export default Classes;
