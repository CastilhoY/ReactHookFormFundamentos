import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormData } from "../../src/App";

interface NumeroInputProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  index: number;
}

export default function NumeroInput({
  register,
  errors,
  index,
}: NumeroInputProps) {
  return (
    <div>
      <input
        type="number"
        {...register(`endereco.${index}.numero`, { valueAsNumber: true })}
      />
      {errors.endereco?.[index]?.numero?.message && (
        <p className="error">{errors.endereco[index]?.numero?.message}</p>
      )}
    </div>
  );
}
