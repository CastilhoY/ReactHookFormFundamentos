import { useForm } from "react-hook-form";
import "./App.css";

interface FormData {
  email: string;
  senha: string;
}

function App() {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const email = watch("email") || "";
  const senha = watch("senha") || "";
  const emailValido = email.includes("@");

  const enviarDados = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(enviarDados)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "O email é Obrigatório" })}
        />
        {!emailValido && email.length > 0 && (
          <p style={{ color: "red" }}>Digite um Email Válido</p>
        )}
        <input type="password" placeholder="Senha" {...register("senha", {minLength: 5})} />
        {senha.length > 0 && senha.length < 5 && (
          <p style={{ color: "red" }}>Mínimo de 5 Caracteres</p>
        )}
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default App;
