import { useEffect, useState } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import ClassCard from "../components/Class/ClassCard";
import { getUserClasses } from "../api/services/user.service";

interface Subject {
  title: string;
  credit: number;
  resources: string[];
}

interface User {
  name: string;
  _id: string;
}

interface Class {
  subject: Subject;
  presenter: User;
  startDate: Date;
  description: string;
  _id: string;
}

const MyLearning = () => {
  const id = window.location.href.split("/")[6];
  const [classes, setClasses] = useState<Class[]>([]);
  useEffect(() => {
    getUserClasses(id)
      ?.then((res) => {
        setClasses(res);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
    <Heading borderBottom={"2px solid red"} w={"80%"} pb={4} m={"auto"} textAlign={"center"}>Your Classes</Heading>
      <Flex
        flexWrap={"wrap"}
        alignItems={"center"}
        justify={"center"}
        mx={"5%"}
      >
        {classes.map((c) => {
          return (
            <ClassCard
              w={["70%", "68%", "38%", "25%", "19%"]}
              key={c._id}
              subject={c.subject.title}
              teacher={c.presenter.name}
              startTime={c.startDate}
              image={
                "https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg"
              }
              description={c.description}
              id={c._id}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default MyLearning;
