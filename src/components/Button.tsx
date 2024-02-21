import { Button as Btn } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  onClick?: () => void;
  children: ReactNode;
  bg?: string;
  w?: string;
  disabled?: boolean;
  type: "submit" | "button" | "reset";
  color?: string;
}

const Button = ({
  onClick,
  children,
  bg,
  w,
  disabled,
  type,
  color="white",
}: Props) => {
  return (
    <Btn
      bg={bg}
      color={color}
      w={w}
      onClick={onClick}
      disabled={disabled}
      type={type}
      colorScheme="red"
    >
      {children}
    </Btn>
  );
};

export default Button;
