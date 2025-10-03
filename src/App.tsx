import { useForm } from "react-hook-form";
import "./App.css";

interface FormData {
  nome: string;
  sexo: string;
  pais: string;
  termos: boolean;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      sexo: "Masculino",
      pais: "brasil",
      termos: false,
    }
  });

  const enviarDados = (data: FormData) => {
    console.log(data);
  };

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
          <option value="brasil">Brasil</option>
          <option value="portugal">Portugal</option>
          <option value="espanha">Espanha</option>
        </select>

        <div className="radio-group">
          <input type="checkbox" id="termo" {...register("termos")} />
          <label htmlFor="termo">Li e aceito os termos de contrato.</label>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default App;
