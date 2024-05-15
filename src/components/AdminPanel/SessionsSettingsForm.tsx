import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { createSession } from "../../api/services/session.service";
import FormInput from "../FormInput";

interface Props {
  selectedClass: string;
}

interface Session {
  classId: string;
  duration: number;
  date: Date;
}

const schema = z.object({
  duration: z
    .number({ required_error: "Duration is required." })
    .min(30, { message: "Duration must at least be 30 minutes." })
    .max(180, { message: "Duration must at most be 180 minutes." }),
  date: z.coerce.date({ required_error: "Date is required." }),
});
type FormData = z.infer<typeof schema>;

const SessionsSettingsForm = ({ selectedClass }: Props) => {
  const [edited, setEdited] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => {
    createSession(selectedClass, data.duration, data.date);
  };
  return (
    <>
      <FormInput
        label="Duration"
        register={register}
        valueAsNumber={true}
        type="number"
      />
      <FormInput
        label="Date"
        register={register}
        valueAsDate={true}
        type="date"
      />
    </>
  );
};

export default SessionsSettingsForm;
