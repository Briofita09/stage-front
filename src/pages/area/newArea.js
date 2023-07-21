import Form from "@/components/form";
import SideBar from "@/components/sideBar";
import { AreasContext } from "@/context/areaContext";
import { useContext, useState } from "react";
import { GoWorkflow } from "react-icons/go";
import { BsFillTrashFill } from "react-icons/bs";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Link from "next/link";
import axios from "axios";
import Modal from "@/components/modal";

export default function NewAreaPage() {
  const [showModal, setShowModal] = useState(false);
  const [areaId, setAreaId] = useState(null);
  const { areas, setAreas } = useContext(AreasContext);

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:5000/area/${id}`);
      setAreas((prevAreas) => prevAreas.filter((area) => area.id !== id));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-950 ">
      <header className="flex justify-around">
        <SideBar data={areas} />
        <div className="mt-12">
          <Form />
        </div>
        <h1></h1>
      </header>
      <main>
        <h1 className="text-center text-white mt-12">
          Aqui estão as áreas já cadastradas. Clique em alguma para ver os
          processos
        </h1>
        {showModal && <Modal id={areaId} setShowModal={setShowModal} />}
        <div className="flex ml-52 mr-52 gap-4 mt-10 justify-center flex-wrap">
          {areas.map((area) => {
            return (
              <>
                <div className="border rounded-md w-32 h-36">
                  <Link
                    key={area.id}
                    href={{ pathname: "/area/[id]", query: { id: area.id } }}>
                    <div className="flex flex-col justify-around items-center w-30 h-32">
                      <p className="text-white text-center">{area.name}</p>
                      <GoWorkflow size={64} />
                    </div>
                  </Link>
                  <div className="flex justify-between h-12 w-32 pl-1 pr-1">
                    <HiOutlinePencilAlt
                      color="yellow"
                      onClick={() => {
                        setShowModal(true);
                        setAreaId(area.id);
                      }}
                    />
                    <BsFillTrashFill
                      className="pb-1"
                      color="orange"
                      size={18}
                      onClick={() => {
                        handleDelete(area.id);
                      }}
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </main>
    </div>
  );
}
