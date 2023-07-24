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

import SideBar from "@/components/sideBar";
import NodeCard from "@/components/nodeCard";
import { AreasContext } from "@/context/areaContext";
import { useRouter } from "next/router";

export default function FlowTeste() {
  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 200, y: 0 }, data: { label: "2" } },
    { id: "3", position: { x: 400, y: 0 }, data: { label: "3" } },
  ];
  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
  const [startNodes, setStartNodes] = useState();
  const [startEdges, setStartEdges] = useState();
  const [newSub, setNewSub] = useState();
  const [refresh, setRefresh] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { areas } = useContext(AreasContext);
  const router = useRouter();
  const mainProcessId = router.query.id;

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  function addNewNode() {
    const newNode = {
      id: crypto.randomUUID(),
      position: { x: 0, y: 0 },
      data: {
        label: newSub,
      },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    setNewSub("");
  }

  useEffect(() => {
    async function getNodes() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/subprocess/${mainProcessId}`
        );
        const firstNodes = res.data.map((node) => {
          return {
            id: node.id.toString(),
            position: { x: node.xCoord, y: node.yCoord },
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
        console.log(res.data);
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
  }, [setNodes, refresh]);

  useEffect(() => {
    onNodesChange(nodes);
    onEdgesChange(edges);
  }, []);

  async function updateProcess() {
    const correctNodes = nodes.map((node) => {
      return {
        id: node.id,
        mainProcessId,
        name: node.data.label,
        xCoord: node.position.x,
        yCoord: node.position.y,
      };
    });
    const nodesBody = { subprocess: correctNodes };
    const correctEdges = edges.map((edge) => {
      return {
        id: edge.id,
        processId: mainProcessId,
        target: edge.target,
        source: edge.source,
      };
    });
    const edgesBody = { edges: correctEdges };
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/edge/${mainProcessId}`
    );
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/subprocess/${mainProcessId}`
    );
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/subprocess/${mainProcessId}`,
      nodesBody
    );
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/edge/${mainProcessId}`,
      edgesBody
    );
  }
  console.log(nodes);
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#6200ed] to-[#310077] flex flex-col justify-center">
      <header className="flex justify-around">
        <SideBar data={areas} />
        <div className="flex flex-col">
          <h1 className="text-white text-5xl mb-4">
            Crie e edite seu processo
          </h1>
          <div className="flex">
            <input
              className="mt-4 mb-4 w-60 rounded-md"
              value={newSub}
              onChange={(e) => setNewSub(e.target.value)}
              placeholder="Nome do subprocesso"
            />
            <button
              className="text-white ml-4 rounded-md bg-green-500 h-fit"
              onClick={addNewNode}>
              Adicionar
            </button>
          </div>
        </div>
        <button
          className="h-fit bg-green-500 rounded-md"
          onClick={() => updateProcess()}>
          Salvar
        </button>
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
              className="bg-slate-200"
            />
            <Controls />
          </ReactFlow>
        </div>
        <div className="h-[800px] w-1/4 border rounded-md flex flex-col">
          <form className="flex flex-col items-center gap-4 pt-5">
            {nodes.map((node) => {
              return (
                <NodeCard
                  key={node.id}
                  node={node}
                  name={node.data.label}
                  mainProcessId={mainProcessId}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              );
            })}
          </form>
        </div>
      </main>
    </div>
  );
}
