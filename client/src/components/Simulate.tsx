import { useState, type ReactNode } from "react";
import axios from "../api/api";
import { useInventory } from "../context/Context";
import { ClipboardCopy } from "lucide-react";
import Navbar from "./Navbar";

export const SimulateSpike = () => {
  const { report } = useInventory();
  const [multiplier, setMultiplier] = useState(3);
  const [days, setDays] = useState(7);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleSimulate = async (productId: string) => {
    setSelectedProductId(productId);
    try {
      const res = await axios.post("/simulate-spike", {
        productId,
        multiplier,
        days,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Product ID copied to clipboard!");
    } catch (err) {
      console.error("Copy failed , try again", err);
    }
  };

  return (
    <div>
  <Navbar/>
    <div className="space-y-6">
      <div className="p-4 bg-white rounded shadow flex flex-wrap items-center gap-4">
        <div>
          <label className="font-medium">Multiplier:</label>
          <input
            type="number"
            value={multiplier}
            onChange={(e) => setMultiplier(Number(e.target.value))}
            className="border p-1 w-24 ml-2"
          />
        </div>
        <div>
          <label className="font-medium">Days:</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="border p-1 w-24 ml-2"
          />
        </div>
      </div>

      {report.map((item: { productId: string; name: ReactNode }) => (
        <div
          key={item.productId}
          className="border rounded p-4 shadow bg-gray-50 space-y-2"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{item.name}</h3>
            <button
              onClick={() => copyToClipboard(item.productId)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <ClipboardCopy className="h-4 w-4" /> Copy ID
            </button>
          </div>

          <button
            onClick={() => handleSimulate(item.productId)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Simulate Spike
          </button>

          {selectedProductId === item.productId && result && (
            <div className="mt-4 text-sm bg-white p-4 rounded border">
              <p>Simulated Sales: {result.simulatedSales.toFixed(2)}</p>
              <p>Days Remaining: {result.daysRemaining.toFixed(1)}</p>
              <p>Reorder Qty: {result.reorderQty}</p>
              <p>Estimated Cost: ₹{result.estimatedCost.toFixed(2)}</p>
            </div>
          )}
        </div>
      ))}
    </div>
      </div>
  );
};
