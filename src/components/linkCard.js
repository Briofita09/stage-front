import axios from "axios";
import { useState } from "react";
import {
  BsThreeDotsVertical,
  BsFillTrashFill,
  BsCheckSquare,
} from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LinkCard({ link, refresh, setRefresh }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(link.title);
  const [newLink, setNewLink] = useState(link.link);

  function renderModal(id) {
    return (
      <div className="border rounded-md bg-white flex-col">
        <div className="flex justify-between">
          <button onClick={() => setShowModal(false)}>X</button>
          <div className="flex gap-2">
            <BsFillTrashFill onClick={() => handleDelete(id)} />
            <BsCheckSquare
              color="green"
              onClick={() => handleUpdate(id)}
              className="mr-2"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <input
            className="border-2 border-black rounded-md mt-2 mb-2 w-11/12"
            placeholder="título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <input
            className="border-2 border-black rounded-md mb-2 w-11/12"
            placeholder="link"
            value={link.link}
            onChange={(e) => setNewLink(e.target.value)}
          />
        </div>
      </div>
    );
  }

  async function handleUpdate(id) {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/link/${id}`, {
        title,
        link: newLink,
      });
      toast.error("Link modificado com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setRefresh(!refresh);
      setShowModal(false);
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

  async function handleDelete(id) {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/link/${id}`);
      toast.success("Link deletado com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setRefresh(!refresh);
      setShowModal(false);
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
    <>
      <div className="flex h-fit w-9/12 border rounded-md justify-between items-center">
        <a
          href={link.link}
          target="_blank"
          className="text-white text-center pl-5">
          {link.title}
        </a>
        <div className="flex gap-0 pr-5">
          <BsThreeDotsVertical
            className="mr-[-10px]"
            color="#fff"
            onClick={() => setShowModal(true)}
          />
          <BsThreeDotsVertical
            color="#fff"
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
      <ToastContainer />
      <div className="w-9/12">{showModal && renderModal(link.id)}</div>
    </>
  );
}
