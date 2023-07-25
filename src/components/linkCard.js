import axios from "axios";
import { useState } from "react";
import {
  BsThreeDotsVertical,
  BsFillTrashFill,
  BsCheckSquare,
} from "react-icons/bs";

export default function LinkCard({ link }) {
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
      <div className="flex h-fit w-9/12 border rounded-md justify-around items-center">
        <div className="flex gap-0">
          <BsThreeDotsVertical
            className="mr-[-10px]"
            color="#fff"
            onClick={() => setShowModal(true)}
          />
          <BsThreeDotsVertical
            className="pl-0"
            color="#fff"
            onClick={() => setShowModal(true)}
          />
        </div>
        <a href={link.link} target="_blank" className="text-white">
          {link.title}
        </a>
        <div></div>
      </div>
      <div className="w-9/12">{showModal && renderModal(link.id)}</div>
    </>
  );
}
