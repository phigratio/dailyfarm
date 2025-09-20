import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { privateAxios } from "../../../services/userService/userService";

interface MarketPlaceItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  contact: string;
  userId: number;
}

const MarketPlace = () => {
  const [items, setItems] = useState<MarketPlaceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMyInventory, setShowMyInventory] = useState(false);

  const fetchMarketPlaceItems = async (userSpecific = false) => {
    setLoading(true);
    try {
      let response;
      if (userSpecific) {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user) throw new Error("User not found in localStorage");
        response = await privateAxios.get<MarketPlaceItem[]>(`/api/marketplace/by-user/${JSON.parse(localStorage.getItem("user"))}`);
      } else {
        response = await privateAxios.get<MarketPlaceItem[]>("/api/marketplace");
      }
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch marketplace items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketPlaceItems(showMyInventory);
  }, [showMyInventory]);

  const handleToggleInventory = () => {
    setShowMyInventory((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <div className="h-24" />
      <main className="p-4 max-w-7xl mx-auto">
        <div className="flex justify-center mb-6">
          <Button
            onClick={handleToggleInventory}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {showMyInventory ? "See Global Inventory" : "See Your Inventory"}
          </Button>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">
          {showMyInventory ? "My Marketplace Products" : "Global Marketplace Products"}
        </h1>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : items.length === 0 ? (
          <p className="text-center">No products available.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <Card key={item.id} className="shadow-md hover:shadow-lg transition duration-300">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded mb-4" />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <p className="mb-2">{item.description}</p>
                  <p className="mb-2 font-semibold">Price: ৳{item.price.toFixed(2)}</p>
                  <p className="mb-2">Contact: {item.contact}</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">Contact Seller</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default MarketPlace;
