import { useEffect, useState } from "react";
import ClassHeader from "../components/Class/ClassHeader";
import ClassInformation from "../components/Class/ClassInformation";
import { Flex } from "@chakra-ui/react";
import Button from "../components/Button";
import { getClass } from "../api/services/class.service";

interface Class {
  title: string;
  credit: number;
  presenter: string;
  startDate: string;
  finishDate: string;
  description: string;
  category: string;
  location: string;
}

const Class = () => {
  const id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const [clss, setClss] = useState<Class>(Object);
  useEffect(() => {
    getClass(id)
      .then((res) => {
        res.title = res.subject.title;
        res.credit = res.subject.credit;
        setClss(res);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <Flex>
      <ClassHeader
        title={clss.title}
        teacher={clss.presenter}
        category={clss.category}
      ></ClassHeader>
      <ClassInformation
        description={clss.description}
        subject={clss.title}
        credit={clss.credit}
        startDate={clss.startDate}
        finishDate={clss.finishDate}
        location={clss.location}
      ></ClassInformation>
      <Button type="button">Enroll</Button>
    </Flex>
  );
};

export default Class;
