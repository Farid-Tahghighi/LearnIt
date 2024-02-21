import { Box } from "@chakra-ui/react";
import LearnIt from "../../assets/LearnIt_NoBG_Color.svg";
import { Link } from "react-router-dom";

interface Props {
  width: string[];
}

const Logo = ({ width }: Props) => {
  return (
    <Box w={width}>
      <Link to={"/home"}>
        <img src={LearnIt} alt="LearnIt_Logo" />
      </Link>
    </Box>
  );
};

export default Logo;
