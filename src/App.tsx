import { Controller, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./App.css";

interface FormData {
  nome: string;
  email: string;
  data: Date | null;
}

function App() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      email: "",
      data: null,
    },
  });

  const enviarDados = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(enviarDados)}>
        
        <input 
          {...register("nome", { required: "Nome obrigatorio" })}
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

        <Controller
          name="data"
          control={control}
          render={({ field }) => (
            <DatePicker 
              placeholderText="Selecione uma data"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              dateFormat="dd/MM/yyyy"
              className="inputText"
            />
          )}
        />

        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default App;
