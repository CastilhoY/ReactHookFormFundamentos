import { useFieldArray, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";

const schema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  endereco: z.array(
    z.object({
      rua: z.string().min(3, "A rua deve ter pelo menos 3 caracteres"),
      numero: z.number().min(1, "O número deve ser no mínimo 1"),
    })
  ),
});

type FormData = z.infer<typeof schema>;

function App() {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      endereco: [{ rua: "", numero: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "endereco",
  });

  const enviarDados = (data: FormData) => {
    console.log("Dados enviados:", data);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(enviarDados)}>
        <input placeholder="Nome" {...register("nome")} />
        {errors.nome && <p className="error">{errors.nome.message}</p>}
        {fields.map((field, index) => (
          <div key={field.id}>
            <input placeholder="Rua" {...register(`endereco.${index}.rua`)} />
            {errors.endereco?.[index]?.rua?.message && (
              <p className="error">{errors.endereco[index]?.rua?.message}</p>
            )}
            <input
              type="number"
              {...register(`endereco.${index}.numero`, {
                valueAsNumber: true,
              })}
            />
            {errors.endereco?.[index]?.numero?.message && (
              <p className="error">{errors.endereco[index]?.numero?.message}</p>
            )}

            <button type="button" onClick={() => remove(index)}>
              Remover
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              rua: "",
              numero: 1,
            })
          }
        >
          Adicionar Endereço
        </button>
        <button
          type="button"
          onClick={() =>
            reset({
              nome: "",
              endereco: [{ rua: "", numero: 0 }],
            })
          }
        >
          Resetar
        </button>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default App;
