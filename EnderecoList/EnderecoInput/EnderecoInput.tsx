import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormData } from "../../src/App";

interface EnderecoInputProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  index: number;
}

export default function EnderecoInput({
  register,
  errors,
  index,
}: EnderecoInputProps) {
  return (
    <div>
      <input placeholder="Rua" {...register(`endereco.${index}.rua`)} />
      {errors.endereco?.[index]?.rua?.message && (
        <p className="error">{errors.endereco[index]?.rua?.message}</p>
      )}
    </div>
  );
}
