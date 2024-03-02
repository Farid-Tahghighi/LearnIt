import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { getUser } from "../api/services/auth.service";

interface User {
  name: string;
  age: number;
  email: string;
  type: string;
  description: string;
}

const PublicProfile = () => {
  const [user, setUser] = useState<User>({
    name: "",
    age: 0,
    email: "",
    type: "",
    description: "",
  });
  const id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  useEffect(() => {
    getUser(id)
      ?.then((res) => setUser(res.data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <Flex
      direction={"column"}
      justify={"start"}
      align={"center"}
      border={"1px solid rgb(210, 210, 210)"}
      px={"10%"}
      mx={"10%"}
    >
      <Text size={"2xl"} fontWeight={"650"} color={"#141414"}>
        {user.name}
      </Text>
      <Text size={"md"} fontWeight={"400"} color={"gray"}>
        About me
      </Text>
      <Text size={"sm"} fontWeight={"500"}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
        temporibus porro mollitia maiores saepe eligendi quas architecto maxime
        quod id modi officia dolorum sint sapiente dignissimos ad laudantium
        quam, voluptates repellat iusto consectetur autem? Aspernatur a,
        similique fugiat provident at quis, velit neque cumque illum optio
        commodi quae cupiditate ex tempore impedit voluptate perferendis
        molestias in beatae reiciendis ipsa esse, molestiae ut. Doloremque
        veritatis dolores repudiandae aliquid laborum, quisquam dolore amet
        alias odit fugiat, possimus, molestias nobis consequatur. Suscipit
        dolores dicta inventore accusamus veritatis, ab amet ea consequatur
        blanditiis deserunt. Ex facilis quam illo dicta, nostrum cum! Facere
        nobis error rerum tenetur perferendis sint alias esse voluptates
        nesciunt ab fugiat praesentium, voluptate natus harum repudiandae
        dolorum laboriosam quo dolores magnam, dolor a beatae exercitationem.
        Amet ex voluptatum architecto eaque, labore enim quidem necessitatibus
        libero fugit cupiditate quae. Iusto placeat autem cum ut earum eos
        doloremque, ratione fuga eligendi enim officiis vel repellat eum vitae
        vero quis. Expedita dignissimos pariatur obcaecati, aperiam architecto
        repellat, laborum, magni officia tempora eligendi ad et quis iure
        aspernatur dolor alias excepturi dolorem. Aperiam blanditiis facere esse
        illum obcaecati nisi laborum nostrum! Aliquam enim vero quidem atque
        porro aperiam eius quaerat, fugit ex harum ea voluptate!
      </Text>
    </Flex>
  );
};

export default PublicProfile;
