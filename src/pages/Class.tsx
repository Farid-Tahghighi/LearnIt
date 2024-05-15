import { useEffect, useState } from "react";
import ClassHeader from "../components/Class/ClassHeader";
import ClassInformation from "../components/Class/ClassInformation";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import Button from "../components/Button";
import { enroll, getClass } from "../api/services/class.service";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/services/user.service";
import { getSessions } from "../api/services/session.service";
import SessionsTable from "../components/Session/SessionsTable";
import CreateSessionModal from "../components/Session/CreateSessionModal";

interface Class {
  title: string;
  credit: number;
  presenterName: string;
  startDate: string;
  finishDate: string;
  description: string;
  category: string;
  location: string;
}

interface Session {
  _id: string;
  duration: number;
  date: Date;
}

const Class = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let nav = useNavigate();
  const localUser = localStorage.getItem("user");
  const id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const [clss, setClss] = useState<Class>(Object);
  const [user, setUser] = useState<{ _id: string; type: string }>(Object);
  const [isDone, setDone] = useState<boolean>(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    getClass(id)
      .then((res) => {
        res.title = res.subject.title;
        res.credit = res.subject.credit;
        res.presenterName = res.presenter.name;
        setClss(res);
      })
      .catch((e) => console.log(e));
    getCurrentUser()
      ?.then((res) => setUser(res))
      .catch((e) => console.log(e));
    getSessions(id)
      .then((res) => {
        setSessions(res);
      })
      .catch((e) => console.log(e));
  }, []);
  const enrollClass = () => {
    enroll(id, user._id)
      ?.then(() => {
        setDone(true);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Flex direction={"column"}>
        <ClassHeader
          title={clss.title}
          teacher={clss.presenterName}
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
        <Flex
          direction={"row"}
          justify={"space-around"}
          align={"center"}
          px={"10%"}
          pb={8}
          pt={4}
        >
          <Button
            w={"20%"}
            type="button"
            onClick={() => (localUser ? enrollClass() : nav("/user/login"))}
          >
            Enroll
          </Button>
          {user.type == "Teacher" && (
            <Button w={"20%"} type="button" onClick={onOpen}>
              Create Session
            </Button>
          )}
        </Flex>
        {isDone && (
          <Text color={"red.500"} fontWeight={"650"} textAlign={"center"}>
            You've enrolled in this class.
          </Text>
        )}
        <SessionsTable sessions={sessions} />
      </Flex>
      <CreateSessionModal isOpen={isOpen} onClose={onClose} classId={id} />
    </>
  );
};

export default Class;
