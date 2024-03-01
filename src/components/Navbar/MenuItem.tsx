import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to?: string;
  children: ReactNode;
  size: string;
  onClick?: () => void;
}

const MenuItem = ({ to, children, size, onClick }: Props) => {
  return (
    <Link to={`/${to}`} onClick={onClick}>
      <Text
        color={"#141414"}
        _hover={{ color: "red.500" }}
        fontSize={size}
        fontWeight={600}
      >
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
