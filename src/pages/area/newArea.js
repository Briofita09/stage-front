import Form from "@/components/form";
import SideBar from "@/components/sideBar";
import { AreasContext } from "@/context/areaContext";
import { useContext, useEffect, useState } from "react";
import { GoWorkflow } from "react-icons/go";
import Link from "next/link";

export default function NewAreaPage() {
  const { areas } = useContext(AreasContext);
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
        <div className="flex ml-10 mr-10 gap-4 mt-5">
          {areas.map((area) => {
            return (
              <Link
                key={area.id}
                href={{ pathname: "/area/[id]", query: { id: area.id } }}>
                <div className="border w-32 h-32 flex flex-col justify-center items-center">
                  <p className="text-white text-center">{area.name}</p>
                  <GoWorkflow size={64} />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
