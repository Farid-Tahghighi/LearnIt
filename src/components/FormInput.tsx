import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

interface Props {
  label: string;
}

const FormInput = ({ label }: Props) => {
  return (
    <FormControl w="25%" mb={3}>
      <Flex flexDirection={"row"} justifyContent={"space-between"}>
        <FormLabel mb={0} flex={1} alignSelf={"center"}>{label}</FormLabel>
        <Input type="email" w="75%" />
      </Flex>
    </FormControl>
  );
};

export default FormInput;
