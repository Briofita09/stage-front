import { AreasContext } from "@/context/areaContext";
import axios from "axios";
import { useContext, useState } from "react";

export default function Modal({ id, setShowModal }) {
  const [name, setName] = useState("");
  const { areas, setAreas } = useContext(AreasContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/area/${id}`, { name });
      setAreas((prevAreas) =>
        prevAreas.map((area) =>
          area.id === id ? { ...area, name: name } : area
        )
      );
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      className="mt-5 flex flex-col border-2 rounded-md h-44 w-44 m-auto bg-blue-400"
      onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <p></p>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
      <p className="text-center self-center">Digite o novo nome para a area</p>
      <input
        className="w-36 self-center rounded-md mt-5"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-green-400 rounded-md mt-6" type="submit">
        Adicionar
      </button>
    </form>
  );
}
