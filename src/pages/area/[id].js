import Form from "@/components/form";
import SideBar from "@/components/sideBar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { AreasContext } from "@/context/areaContext";
import Modal from "@/components/modal";
import Card from "@/components/card";

export default function AreaPage() {
  const [areaName, setAreaName] = useState("");
  const [processes, setProcesses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [processId, setProcessId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const router = useRouter();
  const id = router.query.id;

  const { areas } = useContext(AreasContext);

  async function handleDelete(id) {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/process/${id}`);
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getAreaName() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/area/${id}`
        );
        setAreaName(res.data.name);
      } catch (err) {
        console.log(err);
      }
    }
    async function getProcesses() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/process/${id}`
        );
        setProcesses(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAreaName();
    getProcesses();
  }, [id, refresh]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-950 ">
      <header className="flex justify-around">
        <SideBar data={areas} />
        <div>
          <h1 className="text-4xl text-white text-center mt-12">
            Bem vindo a area de
          </h1>
          <h1 className="text-4xl text-white text-center">{areaName}</h1>
          <div className="w-[40rem] flex flex-col items-center mt-10">
            <Form
              area={areaName}
              id={id}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </div>
        </div>
        <h1></h1>
      </header>
      <main>
        <h1 className="text-white mt-12 text-center">
          Estes são os processos já cadastrados para área de {areaName}
        </h1>
        {showModal && (
          <Modal
            id={processId}
            area="process"
            setShowModal={setShowModal}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
        <div className="flex ml-52 mr-52 gap-4 mt-10 justify-center flex-wrap">
          {processes.map((process) => {
            return (
              <>
                <Card
                  key={process.id}
                  process="process"
                  handleDelete={handleDelete}
                  el={process}
                  setAreaId={setProcessId}
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
