import { useForm } from "react-hook-form";
import "./App.css";

interface FormData {
  nome: string;
  email: string;
  senha: string;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const enviarDados = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(enviarDados)}>
        <input
          type="text"
          placeholder="Nome"
          {...register("nome", { required: "O nome é Obrigatório" })}
        />
        {errors.nome && <p style={{color: "red"}}>{errors.nome.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "O email é Obrigatório",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Formato de Email Inválido",
            },
          })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Senha"
          {...register("senha", {
            required: "A senha é obrigatória",
            minLength: {
              value: 6,
              message: "Mínimo de 6 Caracteres",
            },
          })}
        />
        {errors.senha && <p style={{ color: "red" }}>{errors.senha.message}</p>}

        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default App;
