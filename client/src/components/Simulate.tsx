import { useState, type ReactNode } from "react"
import axios from "../api/api"
import { useInventory } from "../context/Context"
import { ClipboardCopy, Zap, TrendingUp, Calendar, Package, Loader2 } from "lucide-react"
import Navbar from "./Navbar"

export const SimulateSpike = () => {
  const { report } = useInventory()
  const [multiplier, setMultiplier] = useState(3)
  const [days, setDays] = useState(7)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleSimulate = async (productId: string) => {
    setSelectedProductId(productId)
    setLoading(true)
    setResult(null)

    try {
      const res = await axios.post("/simulate-spike", {
        productId,
        multiplier,
        days,
      })
      setResult(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(text)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Copy failed, try again", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Demand Spike Simulator
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Simulate Market Spikes</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Test how your inventory performs under sudden demand increases and get actionable insights for restocking.
          </p>
        </div>

        {/* Controls Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Demand Multiplier</label>
                <input
                  type="number"
                  value={multiplier}
                  onChange={(e) => setMultiplier(Number(e.target.value))}
                  className="w-20 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-20 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  min="1"
                  max="30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {report.map((item: { productId: string; name: ReactNode }) => (
            <div
              key={item.productId}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-white" />
                    <h3 className="text-lg font-semibold text-white truncate">{item.name}</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.productId)}
                    className={`p-2 rounded-lg transition-all ${
                      copiedId === item.productId
                        ? "bg-green-500 text-white"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                    title="Copy Product ID"
                  >
                    <ClipboardCopy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-purple-100 text-xs mt-1 font-mono">ID: {item.productId.slice(0, 8)}...</p>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <button
                  onClick={() => handleSimulate(item.productId)}
                  disabled={loading && selectedProductId === item.productId}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && selectedProductId === item.productId ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Simulating...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Simulate Spike
                    </>
                  )}
                </button>

                {/* Results */}
                {selectedProductId === item.productId && result && !loading && (
                  <div className="mt-4 space-y-3">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-3 rounded-lg border border-green-200">
                        <p className="text-xs text-green-600 font-medium mb-1">Simulated Sales</p>
                        <p className="text-lg font-bold text-green-700">{result.simulatedSales.toFixed(0)}</p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-sky-100 p-3 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-600 font-medium mb-1">Days Remaining</p>
                        <p className="text-lg font-bold text-blue-700">{result.daysRemaining.toFixed(1)}</p>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-3 rounded-lg border border-orange-200">
                        <p className="text-xs text-orange-600 font-medium mb-1">Reorder Qty</p>
                        <p className="text-lg font-bold text-orange-700">{result.reorderQty}</p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-3 rounded-lg border border-purple-200">
                        <p className="text-xs text-purple-600 font-medium mb-1">Est. Cost</p>
                        <p className="text-lg font-bold text-purple-700">₹{result.estimatedCost.toFixed(0)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading State */}
                {loading && selectedProductId === item.productId && (
                  <div className="mt-4 flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-purple-600 mb-2">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span className="font-medium">Processing simulation...</span>
                      </div>
                      <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {report.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Add some products to your inventory to start simulating spikes.</p>
          </div>
        )}
      </div>
    </div>
  )
}
