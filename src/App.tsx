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
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
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

  function mostrarValores(){
    const valores = getValues();
    console.log(valores)
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
