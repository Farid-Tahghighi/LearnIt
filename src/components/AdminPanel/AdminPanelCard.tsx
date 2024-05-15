import { Flex, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  desc: string;
  onClick?: () => void;
}

const AdminPanelCard = ({ title, desc, onClick }: Props) => {
  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      border={"1px solid rgb(210, 210, 210)"}
      p={3}
      m={2}
      borderRadius={"10"}
      _hover={{ color: "red.500", transition: "0.2s all" }}
      boxShadow={"md"}
      onClick={onClick}
    >
      <Text fontSize={"medium"}>{title}</Text>
      <Text fontSize={"small"}>{desc}</Text>
    </Flex>
  );
};

export default AdminPanelCard;
