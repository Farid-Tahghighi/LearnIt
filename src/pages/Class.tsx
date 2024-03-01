import { useEffect, useState } from "react";
import ClassHeader from "../components/Class/ClassHeader";
import { getClass } from "../services/auth.service";
import ClassInformation from "../components/Class/ClassInformation";
import { Flex } from "@chakra-ui/react";
import Button from "../components/Button";

interface Class {
  subject: { title: string; credit: number };
  presenter: string;
  startDate: string;
  finishDate: string;
  description: string;
  image: string;
  category: string;
  location: string;
}

const Class = () => {
  const id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const [clss, setClss] = useState<Class>(Object);
  useEffect(() => {
    console.log("Aaaaaa");
    getClass(id)
      .then((res) => {
        console.log("AAAAAAAAAAAAAAA");
        setClss(res);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <Flex>
      <ClassHeader
        title={clss.subject.title}
        teacher={clss.presenter}
        image="Image Some Image Here"
        category={clss.category}
      ></ClassHeader>
      <ClassInformation
        description={clss.description}
        subject={clss.subject.title}
        credit={clss.subject.credit}
        startDate={clss.startDate}
        finishDate={clss.finishDate}
        location={clss.location}
      ></ClassInformation>
      <Button type="button">Enroll</Button>
    </Flex>
  );
};

export default Class;
