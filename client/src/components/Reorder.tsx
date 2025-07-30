import { useState, useEffect } from "react"
import { Package, AlertTriangle, TrendingUp, DollarSign, RefreshCw, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useInventory } from "../context/Context"
import { Link } from "react-router-dom"

interface ReorderItem {
  productId: string
  name: string
  reorderQty: number
  estimatedCost: number
  criticality: "Low" | "Medium" | "High" | "Critical"
}

const getCriticalityColor = (criticality: string) => {
  switch (criticality.toLowerCase()) {
    case "critical":
      return "bg-gradient-to-r from-red-500 to-pink-600 text-white border-0"
    case "high":
      return "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
    case "medium":
      return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
    case "low":
      return "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
    default:
      return "bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0"
  }
}

const getCriticalityIcon = (criticality: string) => {
  switch (criticality.toLowerCase()) {
    case "critical":
    case "high":
      return <AlertTriangle className="h-4 w-4" />
    case "medium":
      return <TrendingUp className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

const ReorderSkeleton = () => (
  <div className="space-y-6">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-32 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </div>
    ))}
  </div>
)

export const ReorderReport = () => {
  const { report } = useInventory()
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const totalEstimatedCost = report.reduce((sum: number, item: ReorderItem) => sum + item.estimatedCost, 0)
  const criticalItems = report.filter(
    (item: ReorderItem) => item.criticality.toLowerCase() === "critical" || item.criticality.toLowerCase() === "high",
  ).length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <section className="container mx-auto p-6 space-y-8">
          {/* Header Skeleton */}
          <div className="text-center mb-8">
            <Skeleton className="h-8 w-64 mx-auto mb-2" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ReorderSkeleton />
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <section className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Package className="h-4 w-4" />
            Inventory Management
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-w-4xl mx-auto">
            <div className="text-center sm:text-left">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Reorder Report</h2>
              <p className="text-gray-600">Monitor inventory levels and manage reorder requirements</p>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-3xl font-bold text-gray-800">{report.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Items</p>
                <p className="text-3xl font-bold text-gray-800">{criticalItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cost</p>
                <p className="text-3xl font-bold text-gray-800">₹{totalEstimatedCost.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-6">
          {report.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <Package className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">All Good!</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  No products need reordering currently. Your inventory levels are healthy and well-maintained.
                </p>
              </div>
            </div>
          ) : (
            report.map((item: ReorderItem) => (
              <div
                key={item.productId}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                      <p className="text-purple-100 text-sm font-mono">ID: {item.productId}</p>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${getCriticalityColor(item.criticality)}`}
                    >
                      {getCriticalityIcon(item.criticality)}
                      {item.criticality}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border border-blue-200">
                      <p className="text-sm font-medium text-blue-600 mb-2">Reorder Quantity</p>
                      <div className="flex items-center space-x-2">
                        <Package className="h-5 w-5 text-blue-600" />
                        <span className="text-xl font-bold text-blue-700">{item.reorderQty} units</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl border border-green-200">
                      <p className="text-sm font-medium text-green-600 mb-2">Estimated Cost</p>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="text-xl font-bold text-green-700">₹{item.estimatedCost.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-4 rounded-xl border border-purple-200">
                      <p className="text-sm font-medium text-purple-600 mb-2">Priority Level</p>
                      <div className="flex items-center space-x-2">
                        {getCriticalityIcon(item.criticality)}
                        <span className="text-xl font-bold text-purple-700">{item.criticality}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 flex-1 sm:flex-none">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Create Order
                    </Button>
                    <Link to={`/product-detail/${item.productId}`}>
                      <Button
                        variant="outline"
                        className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 flex-1 sm:flex-none bg-transparent"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default ReorderReport
