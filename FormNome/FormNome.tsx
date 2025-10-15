import type { UseFormRegisterReturn } from "react-hook-form";

interface FormNomeProps {
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function FormNome({
  placeholder,
  register,
  error,
}: FormNomeProps) {
  return (
    <div>
      <input placeholder={placeholder} {...register} />
      {error && <p className="error">{error}</p>}
    </div>
  );
}
