import { useContext, useEffect, useState } from "react";
import "burger-menu/lib/index.css";
import axios from "axios";

import SideBar from "@/components/sideBar";
import { AreasContext } from "@/context/areaContext";

export default function Home() {
  const [allAreas, setAllAreas] = useState([]);
  const { setAreas } = useContext(AreasContext);
  useEffect(() => {
    async function getAreas() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/area`);
        const areas = res.data;
        setAllAreas(allAreas);
        setAreas(areas);
      } catch (err) {
        console.log(err);
      }
    }
    getAreas();
  }, [allAreas, setAreas]);
  return (
    <main className="flex min-h-screen justify-around bg-gradient-to-b from-[#6200ed] to-[#310077]">
      <SideBar data={allAreas} />
      <div className="p-12 self-center text-6xl text-center text-white">
        <h1>Bem vindo a Stage Processes!</h1>
        <h1>A aplicação para acompanhar os processos da sua empresa</h1>
      </div>

      <h1></h1>
    </main>
  );
}
