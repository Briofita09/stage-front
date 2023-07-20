import Form from "@/components/form";
import SideBar from "@/components/sideBar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { AreasContext } from "@/context/areaContext";

export default function AreaPage() {
  const [areaName, setAreaName] = useState("");
  const router = useRouter();
  const id = router.query.id;
  const { areas } = useContext(AreasContext);
  useEffect(() => {
    async function getAreaName() {
      try {
        const res = await axios.get(`http://localhost:5000/area/${id}`);
        setAreaName(res.data.name);
      } catch (err) {
        console.log(err);
      }
    }
    getAreaName();
  }, [id]);
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
            <Form area={areaName} id={id} />
          </div>
        </div>
        <h1></h1>
      </header>
    </div>
  );
}
