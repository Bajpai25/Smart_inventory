import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InventoryProvider } from "./context/Context"
import { Dashboard } from "./pages/Dashboard";
import { SimulateSpike } from "./components/Simulate";
import { CreateOrder } from "./components/CreateOrder";
import { ProductDetail } from "./components/Details";

function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/simulate" element={<SimulateSpike />} />
          <Route path="/create-order/:id" element={<CreateOrder/>}/>
          <Route path="/product-detail/:id" element={<ProductDetail/>}/>
        </Routes>
      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;
