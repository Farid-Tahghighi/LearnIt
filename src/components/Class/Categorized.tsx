import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import { getClassesByCat } from "../../api/services/auth.service";

interface Subject {
  title: string;
  credit: number;
  resources: string[];
}

interface User {
  name: string;
}

interface Class {
  _id: string;
  subject: Subject;
  presenter: User;
  startTime: Date;
  description: string;
  image: string;
}

const Categorized = () => {
  const url = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const [classes, setClasses] = useState<Class[]>([]);
  useEffect(() => {
    getClassesByCat(url)?.then((res) => {
      setClasses(res);
    });
  }, []);
  return (
    <>
      <Flex
        flexDirection={"row"}
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
              startTime={c.startTime.toString()}
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

export default Categorized;
