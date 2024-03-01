import { Input } from "@chakra-ui/react";

interface Props {
  display: string;
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const SearchBar = ({ display }: Props) => {
  return (
    <form
      onSubmit={handleSubmit}
      style={{ height: "inherit", width: "inherit", display: "inherit" }}
    >
      <Input
        type="text"
        placeholder="Search"
        w={["75%", "80%", "100%"]}
        alignSelf={"center"}
        borderRadius={"full"}
        display={display}
      />
    </form>
  );
};

export default SearchBar;
