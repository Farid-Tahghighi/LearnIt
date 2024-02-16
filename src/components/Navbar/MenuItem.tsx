import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: string;
  size: string;
}

const MenuItem = ({ to, children, size }: Props) => {
  return (
    <Link to={`/${to}`}>
      <Text color={"white"} fontSize={size} m={0}>
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
