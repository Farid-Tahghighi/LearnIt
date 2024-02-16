import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

interface Props {
  label: string;
  register: any;
}

const FormInput = ({ label, register }: Props) => {
  return (
    <FormControl w="50%" mb={3}>
      <Flex flexDirection={"row"} justifyContent={"space-between"}>
        <FormLabel
          htmlFor={label.toLowerCase()}
          mb={0}
          flex={1}
          alignSelf={"center"}
        >
          {label}
        </FormLabel>
        <Input
          w="75%"
          id={label.toLowerCase()}
          {...register(label.toLowerCase())}
        />
      </Flex>
    </FormControl>
  );
};

export default FormInput;
