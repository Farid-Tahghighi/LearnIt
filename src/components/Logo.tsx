import { Box } from "@chakra-ui/react";
import LearnItWhite from "../../assets/LearnIt_NoBG_White.svg";
import { Link } from "react-router-dom";

interface Props {
  color?: string[];
  width?: string;
}

const Logo = ({ color, width }: Props) => {
  return (
    <Box color={color} w={width}>
      <Link to={"/"}>
        <img src={LearnItWhite} alt="LearnIt_Logo" />
      </Link>
    </Box>
  );
};

export default Logo;
