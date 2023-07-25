import { useState } from "react";
import axios from "axios";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NodeCard({
  name,
  mainProcessId,
  node,
  refresh,
  setRefresh,
}) {
  const [nodeName, setNodeName] = useState(name);
  const [selected, setSelected] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(e);
    try {
      const updatedNode = {
        id: node.id,
        name: nodeName,
        mainProcessId: mainProcessId,
      };
      const body = { subProcess: [updatedNode] };
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/subprocess/${node.id}`,
        body
      );
      setSelected(false);
      setRefresh(!refresh);
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
    <div className="border border-white rounded-md flex justify-between items-center w-11/12 p-2">
      <ToastContainer />
      {selected ? (
        <>
          <button className=" text-white" onClick={() => setSelected(false)}>
            X
          </button>
          <input
            type="text"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            className="w-8/12 rounded-md"
          />
          <button
            className="bg-green-500 border rounded-md text-white p-2"
            onClick={handleSubmit}>
            Salvar
          </button>
        </>
      ) : (
        <>
          <h1 className="text-white">{nodeName}</h1>
          <HiOutlinePencilAlt color="white" onClick={() => setSelected(true)} />
        </>
      )}
    </div>
  );
}
