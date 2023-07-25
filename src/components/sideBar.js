import { GiHamburgerMenu } from "react-icons/gi";
import { Menu, Item } from "burger-menu";
import Link from "next/link";
import { useContext, useState } from "react";
import { AreasContext } from "@/context/areaContext";

export default function SideBar({ data }) {
  const { areas } = useContext(AreasContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="mt-12" onClick={() => setIsOpen(!isOpen)}>
        <GiHamburgerMenu color="#fff" size={32} />
      </div>
      <Menu
        className="burger-menu overflow-y-scroll"
        isOpen={isOpen}
        side="left"
        noOverlay="true"
        onClose={() => setIsOpen(false)}>
        <Link href="/">
          <Item key={"home"} itemKey={"home"} text={"Home"} />
        </Link>
        <Link href="/area/newArea">
          <Item
            key={"newArea"}
            itemKey={"newArea"}
            text={"Adicionar nova area"}
          />
        </Link>
        {areas.map((el) => {
          return (
            <Link
              key={el.id}
              href={{ pathname: "/area/[id]", query: { id: el.id } }}>
              <Item itemKey={el.id} text={el.name}></Item>
            </Link>
          );
        })}
      </Menu>
    </>
  );
}
