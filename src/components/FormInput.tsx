import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

interface Props {
  label: string;
  register: any;
  type: string;
  valueAsNumber?: boolean;
}

const FormInput = ({ label, register, type, valueAsNumber }: Props) => {
  return (
    <FormControl w={["70%", "45%", "45%", "30%"]} mb={3}>
      <Flex
        flexDirection={["column", "column", "row"]}
        justifyContent={["space-between"]}
        alignItems={"center"}
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
          {...register(label.toLowerCase(), {valueAsNumber: valueAsNumber})}
        />
      </Flex>
    </FormControl>
  );
};

export default FormInput;
