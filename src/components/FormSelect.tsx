import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  values: string[];
  defaultVal?: string;
  onSelect: (selected: string) => void;
}

const FormSelect = ({ values, defaultVal, onSelect }: Props) => {
  const [value, setValue] = useState<string | undefined>(defaultVal);
  useEffect(() => {
    setValue(defaultVal);
  }, [defaultVal]);
  return (
    <Select
      w={["70%", "45%", "45%", "30%"]}
      mb={3}
      onChange={(e) => onSelect(e.target.value)}
      key={`${Math.floor((Math.random() * 1000))}-min`}
    >
      <option value="Default" disabled selected>
        {value}
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
