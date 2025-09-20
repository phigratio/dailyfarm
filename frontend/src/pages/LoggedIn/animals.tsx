import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { privateAxios, generateGeminiContent } from "../../../services/userService/userService";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const animalCategories = [
  "LIVESTOCK",
  "POULTRY",
  "AQUACULTURE",
  "DAIRY",
  "DRAFT",
  "COMPANION",
  "SPECIALTY",
  "RESEARCH",
];

const genders = ["MALE", "FEMALE", "UNKNOWN"];

const Animal: React.FC = () => {
  const { plotId, farmId } = useParams<{ plotId: string; farmId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const ownerId = localStorage.getItem("user") || "";

  // Form state
  const [animalName, setAnimalName] = useState("");
  const [breed, setBreed] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [purchasePrice, setPurchasePrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  // AI suggestion states
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // AI food recommendation states
  const [foodName, setFoodName] = useState("");
  const [foodQuantity, setFoodQuantity] = useState("");

  const handleAISuggestion = async () => {
    if (!plotId || !farmId) {
      toast({
        title: "Missing IDs",
        description: "Plot or farm ID is missing",
        variant: "destructive",
      });
      return;
    }
    setIsAiModalOpen(true);
    setAiLoading(true);
    setAiSuggestions([]);
    try {
      const prompt = `
Suggest 3-5 common animal types suitable for farming given the following farm and plot information (Bangladesh):
Plot ID: ${plotId}
Farm ID: ${farmId}
Respond only with a list of animal types, one per line, no extra text.
      `;
      const response = await generateGeminiContent(prompt.trim());
      const suggestions = response.split("\n").map(l => l.trim()).filter(l => l.length);
      setAiSuggestions(suggestions);
    } catch {
      toast({ title: "AI Error", description: "Failed to get AI suggestions.", variant: "destructive" });
      setIsAiModalOpen(false);
    } finally {
      setAiLoading(false);
    }
  };

  const fetchFoodRecommendation = async (animal: string) => {
    if (!animal) {
      setFoodName("");
      setFoodQuantity("");
      return;
    }
    setAiLoading(true);
    try {
      const prompt = `
Provide recommended food name and daily quantity for feeding a ${animal}.
Format your answer exactly as:
FoodName: <food name>
FoodQuantity: <quantity per day>
No extra text.
`;
      const response = await generateGeminiContent(prompt.trim());
      const lines = response.split("\n");
      let food = "";
      let quantity = "";
      lines.forEach(line => {
        const [key, ...rest] = line.split(":");
        if (key && rest.length) {
          const val = rest.join(":").trim();
          if (key.trim() === "FoodName") food = val;
          else if (key.trim() === "FoodQuantity") quantity = val;
        }
      });
      setFoodName(food);
      setFoodQuantity(quantity);
    } catch {
      setFoodName("");
      setFoodQuantity("");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodRecommendation(animalName);
  }, [animalName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !animalName ||
      quantity === "" ||
      Number(quantity) <= 0 ||
      !category ||
      !gender ||
      !plotId ||
      !farmId ||
      !ownerId
    ) {
      toast({
        title: "Invalid Input",
        description: "Please fill all required fields properly.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await privateAxios.post("/api/animals", {
        ownerId,
        animalName,
        breed: breed || null,
        category,
        gender,
        height: height === "" ? null : height,
        weight: weight === "" ? null : weight,
        purchasePrice: purchasePrice === "" ? null : purchasePrice,
        age: age === "" ? null : age,
        number: quantity,
        notes: notes || null,
        plotId,
        farmId,
        food: foodName,
        foodQuantity,
        status: "ACTIVE"
      });
      fetch(`http://127.0.0.1:5000/context/${plotId}`, {  // POST endpoint
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
         
    context:  {
       ownerId,
        animalName,
        breed: breed || null,
        category,
        gender,
        height: height === "" ? null : height,
        weight: weight === "" ? null : weight,
        purchasePrice: purchasePrice === "" ? null : purchasePrice,
        age: age === "" ? null : age,
        number: quantity,
        notes: notes || null,
        plotId,
        farmId,
        food: foodName,
        foodQuantity,
        status: "ACTIVE"
      }// send the context text
  })
})
      toast({ title: "Success", description: "Animal(s) added successfully.", variant: "success" });
      navigate(`/plot-details/${plotId}/${farmId}`);
    } catch {
      toast({ title: "Error", description: "Failed to add animal(s).", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-10 px-4 mt-16 max-w-2xl mx-auto">
        <Card className="shadow-lg border border-border/50 bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <CardTitle className="text-2xl font-bold">Add Animal</CardTitle>
              <Button size="sm" variant="outline" onClick={handleAISuggestion} disabled={aiLoading}>
                {aiLoading ? "Loading AI..." : "AI Suggestion"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="animalName">Animal Type *</Label>
                <Input
                  id="animalName"
                  type="text"
                  value={animalName}
                  onChange={(e) => setAnimalName(e.target.value)}
                  required
                  placeholder="e.g. Goat, Cow"
                  className="mt-1"
                />
                {foodName && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended Food: <strong>{foodName}</strong> {foodQuantity && `(${foodQuantity})`}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="breed">Breed</Label>
                <Input id="breed" type="text" value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="e.g. Saanen, Jersey" />
              </div>

              <div>
                <Label htmlFor="age">Age (years) *</Label>
                <Input
                  id="age"
                  type="number"
                  min={0}
                  value={age}
                  onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                  required
                  placeholder="Age of the animal"
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {animalCategories.map(cat => (
                      <SelectItem value={cat} key={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map(g => (
                      <SelectItem value={g} key={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" min={0} value={height} onChange={e => setHeight(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Height" />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" type="number" min={0} value={weight} onChange={e => setWeight(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Weight" />
                </div>
              </div>

              <div>
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <Input id="purchasePrice" type="number" min={0} value={purchasePrice} onChange={e => setPurchasePrice(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Purchase price" />
              </div>

              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input id="quantity" type="number" min={1} value={quantity} onChange={e => setQuantity(e.target.value === "" ? "" : Number(e.target.value))} required placeholder="Number of animals" />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" rows={4} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Additional information" />
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12">
                {loading ? "Adding..." : "Add Animal"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Dialog open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>AI Animal Suggestions</DialogTitle>
            </DialogHeader>
            <div className="p-4 space-y-4 max-h-[60vh] overflow-auto">
              {aiLoading && <p className="text-center">Loading suggestions...</p>}
              {!aiLoading && aiSuggestions.length === 0 && <p className="text-center">No suggestions found.</p>}
              {!aiLoading && aiSuggestions.map((s, i) => (
                <Card key={i} className="p-3 cursor-pointer border rounded-md hover:bg-gray-100" onClick={() => { setAnimalName(s); setIsAiModalOpen(false); }}>{s}</Card>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={() => setIsAiModalOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
};

export default Animal;
