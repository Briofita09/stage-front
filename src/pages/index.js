import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    getAreas();
  }, [allAreas, setAreas]);
  return (
    <main className="flex min-h-screen justify-around bg-gradient-to-b from-[#6200ed] to-[#310077]">
      <SideBar data={allAreas} />
      <div className="p-12 self-center text-6xl text-center text-white">
        <h1>Bem vindo a Stage Processes!</h1>
        <h1>A aplicação para acompanhar os processos da sua empresa</h1>
      </div>

      <h1>
        <ToastContainer />
      </h1>
    </main>
  );
}
