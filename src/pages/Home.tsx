import { useEffect, useState } from "react";
import axios from "axios";
import ClassCard from "../components/ClassCard";
import { Box, Flex } from "@chakra-ui/react";

interface Subject {
  title: string;
  credit: number;
  resources: string[];
}

interface User {
  name: string;
}

interface Class {
  subject: Subject;
  presenter: User;
  startTime: Date;
  description: string;
  image: string;
}

const Home = () => {
  const [data, setData] = useState<Class[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/classes").then((res) => {
      setData(res.data);
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
        {data.map((c) => {
          return (
            <ClassCard
              key={1}
              subject={c.subject.title}
              teacher={c.presenter.name}
              startTime={c.startTime.toString()}
              image={
                "https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg"
              }
              description={c.description}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default Home;
