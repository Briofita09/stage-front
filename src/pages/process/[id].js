import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import axios from "axios";
import "reactflow/dist/style.css";
import { HiOutlinePencilAlt } from "react-icons/hi";
import SideBar from "@/components/sideBar";
import { AreasContext } from "@/context/areaContext";

export default function FlowTeste() {
  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 200, y: 0 }, data: { label: "2" } },
    { id: "3", position: { x: 400, y: 0 }, data: { label: "3" } },
  ];
  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
  const [startNodes, setStartNodes] = useState();
  const [startEdges, setStartEdges] = useState();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { areas } = useContext(AreasContext);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    async function getNodes() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/subprocess/1`
        );
        const firstNodes = res.data.map((node) => {
          return {
            id: node.id.toString(),
            position: { x: 400, y: node.order * 100 },
            data: {
              label: node.name,
            },
          };
        });
        setNodes([...firstNodes]);
        setStartNodes(firstNodes);
      } catch (err) {
        console.log(err);
      }
    }
    async function getEdges() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/edge/1`
        );
        const firstEdges = res.data.map((edge) => {
          return {
            id: edge.id.toString(),
            source: edge.source,
            target: edge.target,
          };
        });
        setEdges([...firstEdges]);
        setStartEdges(firstEdges);
      } catch (err) {
        console.log(err);
      }
    }
    getNodes();
    getEdges();
  }, [setNodes]);

  useEffect(() => {
    onNodesChange(nodes);
    onEdgesChange(edges);
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-blue-600 to-blue-950 flex flex-col justify-center">
      <header className="flex justify-around">
        <SideBar data={areas} />
        <h1 className="text-white text-5xl mb-4">Crie e edite seu processo</h1>
        <h1></h1>
      </header>
      <main className="flex justify-around gap-10">
        <div className="w-1/4"></div>
        <div className="w-1/2 h-[800px] border border-white rounded-md">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}>
            <Background
              gap={20}
              size={1}
              color="#fff"
              className="bg-amber-100"
            />
            <Controls />
          </ReactFlow>
        </div>
        <div className="h-[800px] w-1/4 border rounded-md flex flex-col">
          <form className="flex flex-col items-center gap-4 pt-5">
            {nodes.map((node) => {
              return (
                <div
                  key={node.id}
                  className="border border-white rounded-md flex justify-around w-11/12">
                  <h1>{node.data.label}</h1>
                  <HiOutlinePencilAlt />
                </div>
              );
            })}
          </form>
        </div>
      </main>
    </div>
  );
}
