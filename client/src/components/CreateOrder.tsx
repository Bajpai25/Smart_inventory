"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Package, ShoppingCart, CheckCircle, AlertCircle, Loader2, Hash, Plus } from "lucide-react"
import axios from "../api/api"
import Navbar from "./Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const CreateOrder = () => {
  const { id: routeProductId } = useParams()
  const [productId, setProductId] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (routeProductId) {
      setProductId(routeProductId)
    }
  }, [routeProductId])

  const handleOrder = async () => {
    if (!productId.trim()) {
      setError("Product ID is required")
      return
    }

    if (quantity < 1) {
      setError("Quantity must be at least 1")
      return
    }

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      await axios.post("/orders", { productId, quantity })
      setSuccess(true)
      setError("")

      // Reset form if not from URL
      if (!routeProductId) {
        setProductId("")
      }
      setQuantity(1)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create order. Please try again.")
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            <ShoppingCart className="h-4 w-4" />
            Order Management
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Order</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Place a new order for your inventory. Fill in the product details and quantity needed.
          </p>
        </div>

        {/* Order Form */}
        <div className="max-w-lg mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Order Details</h2>
                  <p className="text-purple-100 text-sm">Enter product information below</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Product ID Field */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Hash className="h-4 w-4 text-purple-500" />
                  Product ID
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Enter Product ID"
                    className="h-12 pl-4 pr-4 bg-white/60 backdrop-blur-sm border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all"
                    readOnly={!!routeProductId}
                  />
                  {routeProductId && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full">
                        Auto-filled
                      </div>
                    </div>
                  )}
                </div>
                {routeProductId && (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Product ID pre-filled from selection
                  </p>
                )}
              </div>

              {/* Quantity Field */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Plus className="h-4 w-4 text-purple-500" />
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-12 w-12 rounded-xl border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all bg-transparent"
                  >
                    <Plus className="h-4 w-4 rotate-45" />
                  </Button>

                  <Input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="h-12 text-center text-lg font-semibold bg-white/60 backdrop-blur-sm border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all"
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    className="h-12 w-12 rounded-xl border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Use buttons or type to adjust quantity</p>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleOrder}
                disabled={loading || !productId.trim()}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Order...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Create Order
                  </>
                )}
              </Button>

              {/* Status Messages */}
              {success && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Order Created Successfully!</p>
                      <p className="text-sm text-green-600">Your order has been placed and is being processed.</p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-red-800">Order Failed</p>
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Card */}
          {productId && (
            <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-purple-500" />
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Product ID:</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{productId}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold text-purple-600">{quantity} units</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm rounded-full">
                    Ready to Order
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateOrder
