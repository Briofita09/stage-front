import axios from "axios";
import { useState } from "react";
import { BsThreeDots, BsFillTrashFill, BsCheckSquare } from "react-icons/bs";

export default function LinkCard({ link }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [newLink, setNewLink] = useState("");

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
            className="border-2 rounded-md mt-2 mb-2"
            placeholder="título"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <input
            className="border-2 rounded-md mb-2"
            placeholder="link"
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
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/link/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="flex h-fit w-9/12 border rounded-md justify-around">
        <BsThreeDots color="#fff" onClick={() => setShowModal(true)} />
        <a href={link.link} target="_blank" className="text-white">
          {link.title}
        </a>
        <div></div>
      </div>
      <div>{showModal && renderModal(link.id)}</div>
    </>
  );
}
