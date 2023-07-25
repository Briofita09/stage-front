import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
} from "reactflow";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reactflow/dist/style.css";

import SideBar from "@/components/sideBar";
import NodeCard from "@/components/nodeCard";
import { useRouter } from "next/router";
import LinkCard from "@/components/linkCard";

export default function Flow() {
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLink, setNewLink] = useState("");
  const [links, setLinks] = useState([]);
  const [newSub, setNewSub] = useState();
  const [refresh, setRefresh] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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
    async function getEdges() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/edge/${mainProcessId}`
        );
        const firstEdges = res.data.map((edge) => {
          return {
            id: edge.id.toString(),
            source: edge.source,
            target: edge.target,
          };
        });
        setEdges([...firstEdges]);
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
    getNodes();
    getEdges();
  }, [setNodes, refresh, mainProcessId, setEdges]);

  useEffect(() => {
    onNodesChange(nodes);
    onEdgesChange(edges);
  }, []);

  useEffect(() => {
    async function getLinks() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/link/${mainProcessId}`
        );
        setLinks(res.data);
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
    getLinks();
  }, [refresh]);

  async function updateProcess() {
    try {
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
      toast.success("Etapas salvas com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
  async function handleSubmitLink() {
    try {
      const body = { link: newLink, title: newLinkTitle };
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/link/${mainProcessId}`,
        body
      );
      setNewLink("");
      setNewLinkTitle("");
      setRefresh(!refresh);
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

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#6200ed] to-[#310077] flex flex-col justify-center">
      <ToastContainer />
      <header className="flex justify-around">
        <SideBar />
        <div className="flex flex-col">
          <h1 className="text-white text-5xl mb-4">
            Crie e edite seu processo
          </h1>
          <div className="flex items-center justify-center gap-4">
            <button
              className="h-fit bg-green-500 rounded-md text-white p-2"
              onClick={() => updateProcess()}>
              Salvar etapas
            </button>
            <input
              className="mt-4 mb-4 w-60 rounded-md text-center"
              value={newSub}
              onChange={(e) => setNewSub(e.target.value)}
              placeholder="Nome da etapa"
            />
            <button
              className="text-white rounded-md bg-green-500 h-fit p-2"
              onClick={addNewNode}>
              Adicionar
            </button>
          </div>
        </div>
        <div className="w-10"></div>
      </header>
      <main className="flex justify-around gap-10">
        <div className="h-[800px] w-1/4 border rounded-md">
          <div className="flex gap-2 justify-around mt-2">
            <input
              className="1/3 rounded-md text-center"
              value={newLink}
              placeholder="Link"
              onChange={(e) => setNewLink(e.target.value)}
            />
            <input
              className="1/3 rounded-md text-center"
              placeholder="Titulo"
              value={newLinkTitle}
              onChange={(e) => setNewLinkTitle(e.target.value)}
            />
            <button
              className="border rounded-md bg-green-500 text-white"
              onClick={handleSubmitLink}>
              Salvar
            </button>
          </div>
          {links.map((link) => {
            return (
              <div
                key={link.id}
                className="flex h-fit w-full items-center flex-col mt-2">
                <LinkCard
                  link={link}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              </div>
            );
          })}
        </div>
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
