import { useEffect, useState } from "react";
import ClassCard from "../components/Class/ClassCard";
import { Flex } from "@chakra-ui/react";
import { getClasses } from "../api/services/class.service";

interface User {
  name: string;
}

interface Class {
  subject: { title: string };
  presenter: User;
  startDate: Date;
  description: string;
  _id: string;
}

interface Props {
  search: string;
}

const Home = ({ search }: Props) => {
  const [data, setData] = useState<Class[]>([]);
  let classes = data;
  if (search != "") {
    classes = data.filter((c) => {
      return c.subject.title.includes(search);
    });
  }
  useEffect(() => {
    getClasses()
      .then((res) => {
        setData(res);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <Flex flexWrap={"wrap"} alignItems={"center"} justify={"center"} mx={"5%"}>
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
  );
};

export default Home;
