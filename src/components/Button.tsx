import { Button as Btn } from "@chakra-ui/react";
import { ReactElement } from "react";

interface Props {
  onClick?: () => void;
  children: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  bg?: string;
  w?: string;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  color?: string;
}

const Button = ({
  onClick,
  children,
  leftIcon,
  rightIcon,
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
      leftIcon={leftIcon}
      rightIcon={rightIcon}
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
