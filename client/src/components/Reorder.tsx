import { useState, useEffect } from "react"
import { Package, AlertTriangle, TrendingUp, DollarSign, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useInventory } from "../context/Context"

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
      return "destructive"
    case "high":
      return "destructive"
    case "medium":
      return "default"
    case "low":
      return "secondary"
    default:
      return "outline"
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
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <Card key={i}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-16" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
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
      <section className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-8 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ReorderSkeleton />
      </section>
    )
  }

  return (
    <section className="container mx-auto p-6 space-y-6">
  
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reorder Report</h2>
          <p className="text-muted-foreground">Monitor inventory levels and manage reorder requirements</p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline" className="w-fit bg-transparent">
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{report.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Items</p>
                <p className="text-2xl font-bold">{criticalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">₹{totalEstimatedCost.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      
      <div className="space-y-4">
        {report.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <Package className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">All Good!</h3>
              <p className="text-muted-foreground">
                No products need reordering currently. Your inventory levels are healthy.
              </p>
            </CardContent>
          </Card>
        ) : (
          report.map((item: ReorderItem) => (
            <Card key={item.productId} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                  <Badge variant={getCriticalityColor(item.criticality)} className="flex items-center gap-1">
                    {getCriticalityIcon(item.criticality)}
                    {item.criticality}
                  </Badge>
                </div>
                <CardDescription>Product ID: {item.productId}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Reorder Quantity</p>
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-lg font-semibold">{item.reorderQty} units</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Estimated Cost</p>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-lg font-semibold">₹{item.estimatedCost.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Priority Level</p>
                    <div className="flex items-center space-x-2">
                      {getCriticalityIcon(item.criticality)}
                      <span className="text-lg font-semibold">{item.criticality}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <Button size="sm" className="flex-1 sm:flex-none">
                    Create Order
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-transparent">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  )
}

export default ReorderReport
