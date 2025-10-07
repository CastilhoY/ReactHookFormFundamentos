import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";

const schema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().toLowerCase().pipe(z.email("Formato de email inválido")),
});

type FormData = z.infer<typeof schema>;

function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
    },
  });

  const enviarDados = (data: FormData) => {
    console.log("Dados enviados:", data);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(enviarDados)}>
        <input
          {...register("nome")}
          type="text"
          placeholder="Nome"
          className="inputText"
        />
        <p>{errors.nome?.message}</p>

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="inputText"
        />
        <p>{errors.email?.message}</p>

        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default App;
