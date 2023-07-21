import { useContext, useEffect } from "react";
import "burger-menu/lib/index.css";
import axios from "axios";

import SideBar from "@/components/sideBar";
import { AreasContext } from "@/context/areaContext";

export default function Home({ areas }) {
  const { setAreas } = useContext(AreasContext);
  useEffect(() => {
    setAreas(areas);
  }, [areas, setAreas]);
  return (
    <main className="flex min-h-screen justify-around bg-gradient-to-b from-blue-600 to-blue-950 ">
      <SideBar data={areas} />
      <div className="p-12 self-center text-6xl text-center text-white">
        <h1>Bem vindo a Stage Processes!</h1>
        <h1>A aplicação para acompanhar os processos da sua empresa</h1>
      </div>

      <h1></h1>
    </main>
  );
}

export async function getStaticProps() {
  const res = await axios.get("http://localhost:5000/area");
  const areas = res.data;
  return {
    props: {
      areas,
    },
  };
}
