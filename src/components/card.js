import Link from "next/link";
import { GoWorkflow } from "react-icons/go";
import { BsFillTrashFill } from "react-icons/bs";
import { HiOutlinePencilAlt } from "react-icons/hi";

export default function Card({
  setShowModal,
  setAreaId,
  handleDelete,
  el,
  process,
}) {
  return (
    <div className="border rounded-md w-32 h-36">
      <Link
        key={el.id}
        href={{ pathname: `/${process}/[id]`, query: { id: el.id } }}>
        <div className="flex flex-col justify-around items-center w-30 h-32">
          <p className="text-white text-center">{el.name}</p>
          <GoWorkflow size={64} />
        </div>
      </Link>
      <div className="flex justify-between h-12 w-32 pl-1 pr-1">
        <HiOutlinePencilAlt
          color="yellow"
          onClick={() => {
            setShowModal(true);
            setAreaId(el.id);
          }}
        />
        <BsFillTrashFill
          className="pb-1"
          color="orange"
          size={18}
          onClick={() => {
            handleDelete(el.id);
          }}
        />
      </div>
    </div>
  );
}
