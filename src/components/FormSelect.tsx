import { Select } from "@chakra-ui/react";

interface Props {
  values: string[];
  defaultVal: string;
  onSelect: (selected: string) => void;
  // register: any;
}

const FormSelect = ({ values, defaultVal, onSelect }: Props) => {
  return (
    <Select
      // ref={register({
      //   required: "select one option",
      // })}
      w={["70%", "45%", "45%", "30%"]}
      mb={3}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="Default" disabled selected>
        {defaultVal}
      </option>
      {values.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </Select>
  );
};

export default FormSelect;
