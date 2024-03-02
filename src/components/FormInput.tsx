import { Flex, FormLabel, Input } from "@chakra-ui/react";

interface Props {
  label: string;
  register: any;
  type: string;
  valueAsNumber?: boolean;
  placeholder?: string;
  w?: string[];
}

const FormInput = ({
  label,
  register,
  type,
  valueAsNumber,
  placeholder,
  w = ["70%", "45%", "45%", "30%"],
}: Props) => {
  return (
    <Flex
      flexDirection={["column", "column", "row"]}
      justifyContent={["space-between"]}
      alignItems={"center"}
      w={w}
      mb={3}
    >
      <FormLabel
        htmlFor={label.toLowerCase()}
        mb={["2", "2", "0"]}
        flex={1}
        alignSelf={["start", "start", "center"]}
      >
        {label}
      </FormLabel>
      <Input
        type={type}
        w={["100%", "100%", "70%"]}
        id={label.toLowerCase()}
        {...register(label.toLowerCase(), { valueAsNumber: valueAsNumber })}
        placeholder={placeholder}
      />
    </Flex>
  );
};

export default FormInput;
