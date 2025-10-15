import { useFieldArray, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";
import FormNome from "../FormNome/FormNome";
import EnderecoList from "../EnderecoList/EnderecoList";

const schema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  endereco: z.array(
    z.object({
      rua: z.string().min(3, "A rua deve ter pelo menos 3 caracteres"),
      numero: z.number().min(1, "O número deve ser no mínimo 1"),
    })
  ),
});

export type FormData = z.infer<typeof schema>;

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
        <FormNome
          placeholder="Nome"
          register={register("nome")}
          error={errors.nome?.message}
        />

        <EnderecoList
          fields={fields}
          register={register}
          errors={errors}
          remove={remove}
        />

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
