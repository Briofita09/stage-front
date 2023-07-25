import { AreasContext } from "@/context/areaContext";
import axios from "axios";
import { useContext, useState } from "react";

export default function Form({ area, id, refresh, setRefresh, renderToast }) {
  const [name, setName] = useState("");

  const { setAreas } = useContext(AreasContext);

  async function getAreas() {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/area`);
      setAreas(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (area) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/process/${id}`, {
          name,
        });
        renderToast("success");
        setRefresh(!refresh);
        setName("");
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/area`, { name });
        renderToast("success");
        setRefresh(!refresh);
        getAreas();
        setName("");
      }
    } catch (err) {
      console.log(err);
      renderToast("error");
    }
  }

  return (
    <div>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        {area ? (
          <label className="text-white">
            Adicione um novo processo para a area de {area}
          </label>
        ) : (
          <label className="text-white text-4xl mb-4">
            Adicione uma nova area para a sua empresa
          </label>
        )}
        <input
          className="w-80 rounded-md mt-3 justify-center text-center focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-950"
          type="text"
          placeholder={area ? "Nome do processo" : "Nome da area"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="text-white border rounded-md w-24 bg-blue-400 mt-5">
          Adicionar
        </button>
      </form>
    </div>
  );
}
