import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
    to: string,
    children: string,

}

const MenuItem = ({ to, children } : Props) => {
  return (
    <Link to={`/${to}`}>
      <Text display="block" color={"white"}>
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
