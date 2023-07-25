import Form from "@/components/form";
import SideBar from "@/components/sideBar";
import { AreasContext } from "@/context/areaContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Modal from "@/components/modal";
import Card from "@/components/card";

export default function NewAreaPage() {
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [areaId, setAreaId] = useState(null);
  const { areas, setAreas } = useContext(AreasContext);

  async function handleDelete(id) {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/area/${id}`);
      setAreas((prevAreas) => prevAreas.filter((area) => area.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getAreas() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/area`);
        const areas = res.data;
        setAreas(areas);
      } catch (err) {
        console.log(err);
      }
    }
    getAreas();
  }, [setAreas]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-950 ">
      <header className="flex justify-around">
        <SideBar />
        <div className="mt-12">
          <Form refresh={refresh} setRefresh={setRefresh} />
        </div>
        <h1></h1>
      </header>
      <main>
        <h1 className="text-center text-white mt-12">
          Aqui estão as áreas já cadastradas. Clique em alguma para ver os
          processos
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
