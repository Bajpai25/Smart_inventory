import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
  Package,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Clock,
  Shield,
  ArrowLeft,
  ShoppingCart,
  Target,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInventory } from "../context/Context"
import Navbar from "./Navbar"

interface ProductDetail {
  productId: string
  name: string
  reorderQty: number
  estimatedCost: number
  criticality: "low" | "medium" | "high" | "critical"
  daysRemaining: number
  safetyThreshold: number
  shouldReorder: boolean
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
      return <AlertTriangle className="h-5 w-5" />
    case "medium":
      return <TrendingUp className="h-5 w-5" />
    default:
      return <Package className="h-5 w-5" />
  }
}

const getUrgencyColor = (daysRemaining: number) => {
  if (daysRemaining <= 2) return "text-red-600"
  if (daysRemaining <= 5) return "text-orange-600"
  if (daysRemaining <= 10) return "text-yellow-600"
  return "text-green-600"
}

export const ProductDetail = () => {
  const { id } = useParams()
  const { report } = useInventory()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and find product
    const timer = setTimeout(() => {
      const foundProduct = report.find((item: ProductDetail) => item.productId === id)
      setProduct(foundProduct || null)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [id, report])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Loading product details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mb-6">
              <XCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Reports
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/reorder-report">
            <Button
              variant="outline"
              className="mb-4 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 bg-transparent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reports
            </Button>
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              <Package className="h-4 w-4" />
              Product Details
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 font-mono text-sm">ID: {product.productId}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Overview
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Product Name</label>
                      <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Product ID</label>
                      <p className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-lg inline-block">
                        {product.productId}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Reorder Status</label>
                      <div className="flex items-center gap-2 mt-1">
                        {product.shouldReorder ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className={`font-medium ${product.shouldReorder ? "text-green-600" : "text-red-600"}`}>
                          {product.shouldReorder ? "Reorder Required" : "No Reorder Needed"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Priority Level</label>
                      <div className="mt-1">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 w-fit ${getCriticalityColor(product.criticality)}`}
                        >
                          {getCriticalityIcon(product.criticality)}
                          {product.criticality.charAt(0).toUpperCase() + product.criticality.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Metrics */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Inventory Metrics
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Days Remaining</span>
                    </div>
                    <p className={`text-2xl font-bold ${getUrgencyColor(product.daysRemaining)}`}>
                      {product.daysRemaining} days
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Until stock depletion</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-100 p-4 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium text-orange-600">Safety Threshold</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-700">{product.safetyThreshold}</p>
                    <p className="text-xs text-gray-500 mt-1">Minimum stock level</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-4 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">Reorder Quantity</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-700">{product.reorderQty} units</p>
                    <p className="text-xs text-gray-500 mt-1">Recommended order amount</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-600">Estimated Cost</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">₹{product.estimatedCost.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">For recommended quantity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Summary */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                <h3 className="text-lg font-bold text-white">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-4">
                <Link to={`/create-order/${product.productId}`}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Create Order
                  </Button>
                </Link>
                
              </div>
            </div>

            {/* Status Summary */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6">
                <h3 className="text-lg font-bold text-white">Status Summary</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Urgency Level:</span>
                  <span className={`font-semibold ${getUrgencyColor(product.daysRemaining)}`}>
                    {product.daysRemaining <= 2
                      ? "Critical"
                      : product.daysRemaining <= 5
                        ? "High"
                        : product.daysRemaining <= 10
                          ? "Medium"
                          : "Low"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Action Required:</span>
                  <span className={`font-semibold ${product.shouldReorder ? "text-red-600" : "text-green-600"}`}>
                    {product.shouldReorder ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Cost Impact:</span>
                  <span className="font-semibold text-purple-600">
                    {product.estimatedCost > 50000 ? "High" : product.estimatedCost > 10000 ? "Medium" : "Low"}
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                <h3 className="text-lg font-bold text-white">Recommendations</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {product.daysRemaining <= 5 && (
                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-800">Urgent Action Required</p>
                        <p className="text-xs text-red-600">Stock will run out in {product.daysRemaining} days</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Order {product.reorderQty} units</p>
                      <p className="text-xs text-blue-600">Recommended quantity based on usage patterns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
