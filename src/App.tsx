import { useForm } from "react-hook-form";
import "./App.css";

interface FormData {
  nome: string;
  email: string;
  senha: string;
  sexo: string;
  pais: string;
  termos: boolean;
}

function App() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      sexo: "Masculino",
      pais: "Brasil",
      termos: false,
    },
  });

  const enviarDados = (data: FormData) => {
    console.log(data);
  };

  function resetar() {
    return reset();
  }

  function preencher() {
    setValue("nome", "Yãry");
    setValue("sexo", "Masculino");
    setValue("pais", "Brasil");
    setValue("termos", true);
  }

  function mostrarValores() {
    const valores = getValues();
    console.log(valores);
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit(enviarDados)}>
        <input
          type="text"
          placeholder="Nome"
          className="inputText"
          {...register("nome", { required: "O nome é Obrigatório" })}
        />
        {errors.nome && <p style={{ color: "red" }}>{errors.nome.message}</p>}

        <input
          type="email"
          placeholder="Email"
          className="inputText"
          {...register("email", {
            required: "O email é Obrigatório",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email Inválido",
            },
          })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Senha"
          className="inputText"
          {...register("senha", {
            required: "A Senha é Obrigatória",
            minLength: {
              value: 6,
              message: "Mínimo 6 Caracteres"
            }
          })}
        />
        {errors.senha && <p style={{ color: "red" }}>{errors.senha.message}</p>}

        <div className="radio-group">
          <input
            type="radio"
            id="masculino"
            {...register("sexo")}
            value="Masculino"
          />
          <label htmlFor="masculino">Masculino</label>
        </div>

        <div className="radio-group">
          <input
            type="radio"
            id="feminino"
            {...register("sexo")}
            value="Feminino"
          />
          <label htmlFor="feminino">Feminino</label>
        </div>

        <select className="radio-group" {...register("pais")}>
          <option value="Brasil">Brasil</option>
          <option value="Portugal">Portugal</option>
          <option value="Espanha">Espanha</option>
        </select>

        <div className="radio-group">
          <input type="checkbox" id="termo" {...register("termos")} />
          <label htmlFor="termo">Li e aceito os termos de contrato.</label>
        </div>

        <button type="submit">Enviar</button>
      </form>
      <button onClick={resetar}>resetar</button>
      <button onClick={preencher}>preencher</button>
      <button onClick={mostrarValores}>mostrar valores</button>
    </>
  );
}

export default App;
