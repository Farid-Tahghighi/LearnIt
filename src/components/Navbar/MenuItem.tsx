import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: ReactNode;
  size: string;
}

const MenuItem = ({ to, children, size }: Props) => {
  return (
    <Link to={`/${to}`}>
      <Text color={"#141414"} _hover={{color:"red.500"}} fontSize={size} fontWeight={600}>
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
