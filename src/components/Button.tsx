import { Button as Btn } from "@chakra-ui/react";
import { ReactElement } from "react";

interface Props {
  onClick?: () => Promise<void>;
  children: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  bg?: string;
  size?: string;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
}

const Button = ({
  onClick,
  children,
  leftIcon,
  rightIcon,
  bg,
  size,
  disabled,
  type,
}: Props) => {
  return (
    <Btn
      bg={bg} 
      color={"white"}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      size={size}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </Btn>
  );
};

export default Button;
