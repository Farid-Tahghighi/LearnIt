import { Input } from "@chakra-ui/react";
interface Props {
  width?: string[]|string;
  display?: string;
  submit: (submitted: string) => void;
}

const SearchBar = ({ display="block", submit, width=["75%", "80%", "100%"] }: Props) => {
  return (
      <Input
        name="search"
        type="text"
        placeholder="Search"
        w={width}
        alignSelf={"center"}
        borderRadius={"full"}
        display={display}
        onChange={(e) => submit(e.target.value)} 
      />
  );
};

export default SearchBar;
