import { Input } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  search: string;
};

interface Props {
  display: string;
  submit: (submitted: string) => void;
}

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
// };

const SearchBar = ({ display, submit }: Props) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => submit(data.search);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ height: "inherit", width: "inherit", display: "inherit" }}
    >
      <Input
        {...register("search")}
        name="search"
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
