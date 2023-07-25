import Form from "@/components/form";
import SideBar from "@/components/sideBar";
import { AreasContext } from "@/context/areaContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Modal from "@/components/modal";
import Card from "@/components/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewAreaPage() {
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [areaId, setAreaId] = useState(null);
  const { areas, setAreas } = useContext(AreasContext);

  async function handleDelete(id) {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/area/${id}`);
      toast.success("Área deletada com sucesso", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setAreas((prevAreas) => prevAreas.filter((area) => area.id !== id));
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

  function renderToast(result) {
    if (result === "success") {
      toast.success("Nova area adicionada com sucesso!", {
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
    if (result === "error") {
      toast.error("Falha na requisição!", {
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
    <div className="min-h-screen bg-gradient-to-b from-[#6200ed] to-[#310077] ">
      <header className="flex justify-around">
        <SideBar />
        <div className="mt-12">
          <Form
            refresh={refresh}
            setRefresh={setRefresh}
            renderToast={renderToast}
          />
        </div>
        <h1>
          <ToastContainer />
        </h1>
      </header>
      <main>
        <h1 className="text-center text-white mt-12 text-xl">
          Aqui estão as áreas já cadastradas. Clique em alguma para ver os
          processos!
        </h1>
        {showModal && (
          <Modal id={areaId} setShowModal={setShowModal} area="area" />
        )}
        <div className="flex ml-52 mr-52 gap-4 mt-10 justify-center flex-wrap">
          {areas.map((area) => {
            return (
              <>
                <Card
                  key={area.id}
                  process="area"
                  handleDelete={handleDelete}
                  el={area}
                  setAreaId={setAreaId}
                  setShowModal={setShowModal}
                />
              </>
            );
          })}
        </div>
      </main>
    </div>
  );
}
