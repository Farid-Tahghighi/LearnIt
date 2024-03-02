import { Select } from "@chakra-ui/react";

interface Props {
  subjects: { title: string }[];
  defaultVal: string;
  onSelect: (selected: string) => void;
}

const FormSelect = ({ subjects, defaultVal, onSelect }: Props) => {
  return (
    <Select
      w={["70%", "45%", "45%", "30%"]}
      mb={3}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="Default" disabled selected>
        {defaultVal}
      </option>
      {subjects.map((s) => (
        <option key={s.title} value={s.title}>
          {s.title}
        </option>
      ))}
    </Select>
  );
};

export default FormSelect;
