import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/api";

const InventoryContext = createContext<any>(null);

export const InventoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [report, setReport] = useState([]);

  useEffect(() => {
    axios.get("/reorder-report").then((res) => setReport(res.data));
  }, []);

  return (
    <InventoryContext.Provider value={{ report }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
