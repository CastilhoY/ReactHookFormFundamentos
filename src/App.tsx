import { useFieldArray, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";

const schema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  produtos: z.array(
    z.object({
      nome: z
        .string()
        .min(3, "O nome do produto deve ter pelo menos 3 caracteres"),
      quantidade: z.number().min(1, "A quantidade deve ser no mínimo 1"),
    })
  ),
});

type FormData = z.infer<typeof schema>;

function App() {
  const { control, handleSubmit, register } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      produtos: [{ nome: "", quantidade: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "produtos",
  });

  const enviarDados = (data: FormData) => {
    console.log("Dados enviados:", data);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(enviarDados)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input placeholder="Produto" {...register(`produtos.${index}.nome`)} />
            <input
              type="number"
              {...register(`produtos.${index}.quantidade`, {
                valueAsNumber: true,
              })}
            />
            <button type="button" onClick={() => remove(index)}>
              Remover
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({
            nome: "",
            quantidade: 1,
          })}
        >
          Adicionar Produto
        </button>
      </form>
    </>
  );
}

export default App;
