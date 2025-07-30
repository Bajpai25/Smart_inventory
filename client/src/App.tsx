import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InventoryProvider } from "./context/Context"
import { Dashboard } from "./pages/Dashboard";
import { SimulateSpike } from "./components/Simulate";

function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/simulate" element={<SimulateSpike />} />
        </Routes>
      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;
