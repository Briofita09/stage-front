import { AreasContext } from "@/context/areaContext";
import axios from "axios";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Modal({ id, setShowModal, area, setRefresh, refresh }) {
  const [name, setName] = useState("");
  const { setAreas } = useContext(AreasContext);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (area === "area") {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/area/${id}`, {
          name,
        });
        setAreas((prevAreas) =>
          prevAreas.map((area) =>
            area.id === id ? { ...area, name: name } : area
          )
        );
        toast.success("Área atualizada com sucesso", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setShowModal(false);
      } else if (area === "process") {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/process/${id}`, {
          name,
        });
        toast.success("Processo atualizado com sucesso!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setShowModal(false);
        setRefresh((refresh) => !refresh);
      }
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
