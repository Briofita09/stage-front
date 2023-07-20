import { useState } from "react";
import { AreasContext } from "./areaContext";

export default function AreaProvider({ children }) {
  const [areas, setAreas] = useState([]);

  return (
    <AreasContext.Provider value={{ areas, setAreas }}>
      {children}
    </AreasContext.Provider>
  );
}
