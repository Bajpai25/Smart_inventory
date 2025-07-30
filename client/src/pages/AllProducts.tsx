import { useEffect, useState } from "react";
import axios from "../api/api";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

interface Product {
  id: string;
  name: string;
  stockLevel: number;
  avgDailySales: number;
  supplierLeadTime: number;
  minReorderQty: number;
  costPerUnit: number;
  criticality: string;
  incomingOrderQty: number;
}

export const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios.get("/products");
      setProducts(res.data);
    };
    fetchAll();
  }, []);

  return (
    <div>
        <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <section className="container mx-auto p-6 space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">📦 All Products</h2>
          <p className="text-gray-600">Complete list of inventory products</p>
        </div>

        <div className="grid gap-6">
          {products.length === 0 ? (
            <p className="text-gray-600">No products found.</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 font-mono">ID: {product.id}</p>
                  </div>
                  <Link to={`/product-detail/${product.id}`}>
                    <Button
                      variant="outline"
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
    </div>
  );
};
