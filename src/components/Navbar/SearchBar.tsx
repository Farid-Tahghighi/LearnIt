import { Input } from "@chakra-ui/react";

interface Props {
  w: string[];
  display: string;
}

const SearchBar = ({ w, display }: Props) => {
  return (
    <Input
      type="text"
      placeholder="Search"
      w={w}
      alignSelf={"center"}
      borderRadius={"full"}
      display={display}
    />
  );
};

export default SearchBar;
