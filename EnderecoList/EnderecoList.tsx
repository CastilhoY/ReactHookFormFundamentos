import type { FieldErrors, UseFormRegister, UseFieldArrayRemove, FieldArrayWithId } from "react-hook-form";
import type { FormData } from "../src/App";
import EnderecoInput from "./EnderecoInput/EnderecoInput";
import NumeroInput from "./EnderecoInput/NumeroInput";

interface EnderecoListProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  fields: FieldArrayWithId<FormData, "endereco", "id">[]; // 👈 vem do useFieldArray
  remove: UseFieldArrayRemove; // 👈 função remove() do useFieldArray
}

export default function EnderecoList({
  fields,
  register,
  errors,
  remove,
}: EnderecoListProps) {
  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id}>
          <EnderecoInput register={register} errors={errors} index={index} />
          <NumeroInput register={register} errors={errors} index={index} />

          <button type="button" onClick={() => remove(index)}>
            Remover
          </button>
        </div>
      ))}
    </>
  );
}
