import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { privateAxios, generateGeminiContent, publicAxios } from "../../../services/userService/userService";
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
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";


const plotTypeToCategoriesMap = {
  "Vegetable Bed": ["VEGETABLE"],
  "Herb Patch": ["HERB"],
  "Fruit Patch": ["FRUIT"],
  "Flower Bed": ["FLOWER"],
  "Crop Field": ["GRAIN", "LEGUME", "ROOT", "CASH_CROP"],
  "Orchard": ["FRUIT"],
  "Container Bed": ["VEGETABLE", "HERB"],
  "Raised Bed": ["VEGETABLE", "HERB"],
  "Hydroponic System": ["VEGETABLE", "HERB"],
  "Seedling Tray": ["VEGETABLE", "HERB"],
  "Hydroponic Channel": ["VEGETABLE", "HERB"],
  "Cereal Field": ["GRAIN"],
  "Vegetable Field": ["VEGETABLE"],
  "Legume Field": ["LEGUME"],
  "Feed Crop Plot": ["FORAGE"],
  "Organic Vegetable Bed": ["VEGETABLE", "HERB"],
  "Cover Crop": ["LEGUME", "FORAGE"],
};

const allCategories = [
  "VEGETABLE", "FRUIT", "GRAIN", "LEGUME", "ROOT",
  "HERB", "FORAGE", "CASH_CROP", "FLOWER"
];

const Plants = () => {
  const { plotId, farmId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [plotDetails, setPlotDetails] = useState(null);
  const [farmDetails, setFarmDetails] = useState(null);

  const [plantName, setPlantName] = useState("");
  const [category, setCategory] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [plantingDate] = useState(today);
  const [variety, setVariety] = useState("");
  const [seedCost, setSeedCost] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [notes, setNotes] = useState("");

  const [expectedHarvestDate, setExpectedHarvestDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [availableCategories, setAvailableCategories] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  const [pestResistance, setPestResistance] = useState("");
  const [fertilizerNeeds, setFertilizerNeeds] = useState("");
  const [irrigationNeeds, setIrrigationNeeds] = useState("");

  useEffect(() => {
    if (!plotId || !farmId) return;

    const fetchDetails = async () => {
      try {
        const plotRes = await privateAxios.get(`/farms/plots/${plotId}`);
        setPlotDetails(plotRes.data);
        const plotType = plotRes.data.plotType;
        const allowedCategories = plotTypeToCategoriesMap[plotType] ?? allCategories;
        setAvailableCategories(allowedCategories);
        setCategory(allowedCategories.length > 0 ? allowedCategories[0] : "");
      } catch {
        toast({
          title: "Error",
          description: "Failed to load plot details.",
          variant: "destructive",
        });
      }
      try {
        const farmRes = await privateAxios.get(`/farms/${farmId}`);
        setFarmDetails(farmRes.data);
      } catch {
        toast({
          title: "Error",
          description: "Failed to load farm details.",
          variant: "destructive",
        });
      }
    };

    fetchDetails();
    
  }, [plotId, farmId, toast]);

  const handleAISuggestion = async () => {
    if (!plotDetails || !farmDetails) {
      toast({
        title: "Missing Data",
        description: "Plot or farm details not loaded yet.",
        variant: "destructive",
      });
      return;
    }

    setIsAiModalOpen(true);
    setAiLoading(true);
    setAiSuggestions([]);

    try {
      const prompt = `
        Based on plot type "${plotDetails?.plotType}", area ${plotDetails?.area} acres,
        farm type "${farmDetails?.farmType}", soil pH ${plotDetails?.soilPh ?? "N/A"},
        nitrogen ${plotDetails?.nitrogen ?? "N/A"} mg,
        phosphorus ${plotDetails?.phosphorus ?? "N/A"} mg,
        potassium ${plotDetails?.potassium ?? "N/A"} mg,
        and category "${category}",
        suggest 3-5 optimal plants to grow in Bangladesh.
        Provide output in the format: plant Name: explanation (no JSON).
        Include pest resistance, fertilizer needs, and irrigation needs info.
        No extra information, header, footer
        output format, (example)
        :Guava
        Ferilizer Need-
        Pest Resistance-
        Irrigation Type-
        Why it is good choice-
      `;

      const response = await generateGeminiContent(prompt.trim());

      const suggestions = response
        .split("\n\n")
        .map(block => {
          const lines = block.trim().split("\n").filter(Boolean);
          if (lines.length === 0) return null;
          let plantName = "";
          if (lines[0].startsWith(":")) {
            plantName = lines[0].slice(1).trim();
            lines.shift();
          }
          return {
            plant_name: plantName,
            explanation: lines.join("\n").trim(),
          };
        })
        .filter(Boolean);

      setAiSuggestions(suggestions);
      toast({ title: "AI Suggestions loaded", variant: "default" });
    } catch {
      toast({ title: "AI Error", description: "Failed to get AI suggestions.", variant: "destructive" });
      setIsAiModalOpen(false);
    } finally {
      setAiLoading(false);
    }
  };

  const handleAiModalClose = () => {
    setIsAiModalOpen(false);
  };

  const fetchAILandscape = async (plantName, category) => {
    const prompt = `
Provide expected harvest date, pest resistance, fertilizer needs (name + amount)/day, and irrigation needs (amount/day) for planting ${plantName} today in category ${category}. 
Format your answer as:
ExpectedHarvestDate: YYYY-MM-DD
PestResistance: <text>
FertilizerNeeds: <text>
IrrigationNeeds: <text>
No extra explanation.
`;

    try {
      const response = await generateGeminiContent(prompt.trim());
      const lines = response.split("\n");
      const mapped = {};
      lines.forEach(line => {
        const [key, ...rest] = line.split(":");
        if (key && rest.length) {
          mapped[key.trim()] = rest.join(":").trim();
        }
      });
      return {
        expectedHarvestDate: mapped.ExpectedHarvestDate || "",
        pestResistance: mapped.PestResistance || "",
        fertilizerNeeds: mapped.FertilizerNeeds || "",
        irrigationNeeds: mapped.IrrigationNeeds || "",
      };
    } catch (error) {
      toast({
        title: "AI Error",
        description: "Failed to get AI data.",
        variant: "destructive",
      });
      return {};
    }
  };
   const contextToPlainText = (context: any): string => {
  return `
Crop Name: ${context.cropName}
Farm ID: ${context.farmId}
Plot ID: ${context.plotId}
Owner ID: ${context.ownerId}
Variety: ${context.variety || "N/A"}
Category: ${context.category}
Status: ${context.status}
Planting Date: ${context.plantingDate}
Expected Harvest Date: ${context.expectedHarvestDate || "N/A"}
Planted Area: ${context.plantedArea}
Seed Cost: ${context.seedCost || "N/A"}
Current Value: ${context.currentValue || "N/A"}
Batch Number: ${context.batchNumber || "N/A"}
Pest Resistance: ${context.pestResistance || "N/A"}
Fertilizer Needs: ${context.fertilizerNeeds || "N/A"}
Irrigation Needs: ${context.irrigationNeeds || "N/A"}
Notes: ${context.notes || "N/A"}
Disease: ${context.disease || "N/A"}
Treatment: ${context.treatment || "N/A"}
Health Notes: ${context.healthNotes || "N/A"}
Yield Amount: ${context.yieldAmount || "N/A"}
Growth Rate: ${context.growthRate || "N/A"}
Productivity Notes: ${context.productivityNotes || "N/A"}
Is Active: ${context.isActive}
Is Organic: ${context.isOrganic}
Productivity Record Date: ${context.productivityRecordDate}
`.trim();
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const area = plotDetails?.area;
    const ownerId = localStorage.getItem("user");

    if (!plantName || !category || !plantingDate || !area || area <= 0 || !farmId || !plotId) {
      toast({
        title: "Invalid Input",
        description: "Please fill all required fields properly.",
        variant: "destructive",
      });
      return;
    }

    setSubmitModalOpen(true);

    try {
      const aiData = await fetchAILandscape(plantName, category);
      setPestResistance(aiData.pestResistance);
      setFertilizerNeeds(aiData.fertilizerNeeds);
      setIrrigationNeeds(aiData.irrigationNeeds);

      setExpectedHarvestDate(aiData.expectedHarvestDate);

      await privateAxios.post(`/crops`, {
        cropName: plantName,
        farmId,
        plotId,
        ownerId,
        variety: variety || undefined,
        category,
        status: "PLANTED",  // Status is always 'PLANTED' on creation
        plantingDate,
        expectedHarvestDate: aiData.expectedHarvestDate || undefined,
        plantedArea: area,
        seedCost: seedCost ? parseFloat(seedCost) : undefined,
        currentValue: currentValue ? parseFloat(currentValue) : undefined,
        batchNumber: batchNumber || undefined,
        pestResistance: aiData.pestResistance || undefined,
        fertilizerNeeds: aiData.fertilizerNeeds || undefined,
        irrigationNeeds: aiData.irrigationNeeds || undefined,
        notes: notes || undefined,

        disease: null,
        treatment: null,
        healthNotes: null,
        yieldAmount: null,
        growthRate: null,
        productivityNotes: null,
        isActive: true,
        isOrganic: false,

        productivityRecordDate: new Date().toISOString(),
      });
      const plainTextContext = contextToPlainText({
        cropName: plantName,
        farmId,
        plotId,
        ownerId,
        variety: variety || undefined,
        category,
        status: "PLANTED",  // Status is always 'PLANTED' on creation
        plantingDate,
        expectedHarvestDate: aiData.expectedHarvestDate || undefined,
        plantedArea: area,
        seedCost: seedCost ? parseFloat(seedCost) : undefined,
        currentValue: currentValue ? parseFloat(currentValue) : undefined,
        batchNumber: batchNumber || undefined,
        pestResistance: aiData.pestResistance || undefined,
        fertilizerNeeds: aiData.fertilizerNeeds || undefined,
        irrigationNeeds: aiData.irrigationNeeds || undefined,
        notes: notes || undefined,

        disease: null,
        treatment: null,
        healthNotes: null,
        yieldAmount: null,
        growthRate: null,
        productivityNotes: null,
        isActive: true,
        isOrganic: false,

        productivityRecordDate: new Date().toISOString(),
      });

await fetch(`http://127.0.0.1:5000/context/${plotId}`, {
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
  },
  body: plainTextContext,
});

      
      const updatedPlot = {
    ...plotDetails,
    farm: { farmId },
    status:"PLANTED"
  };


    // PUT plot update
    await privateAxios.put(`/farms/plots/${plotId}`, updatedPlot);

      toast({
        title: "Success",
        description: "Plant added successfully.",
        variant: "success",
      });

      setSubmitModalOpen(false);
      navigate(`/plot-details/${plotId}/${farmId}`);
    } catch {
      setSubmitModalOpen(false);
      toast({
        title: "Error",
        description: "Failed to add plant.",
        variant: "destructive",
      });
    }
  };

  if (!plotId || !farmId) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-destructive px-4">
          Missing plotId or farmId parameter in URL.
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-10 px-4 mt-16 max-w-2xl mx-auto">
        <Card className="shadow-lg border border-border/50 bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Add Plant</CardTitle>
              <Button size="sm" variant="outline" onClick={handleAISuggestion} disabled={aiLoading}>
                {aiLoading ? "Loading AI..." : "AI Suggestion"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="plantName" className="text-sm font-medium">Plant Name *</Label>
                <Input
                  id="plantName"
                  type="text"
                  value={plantName}
                  onChange={e => setPlantName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                <select
                  id="category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="mt-1 w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  {availableCategories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0) + cat.slice(1).toLowerCase().replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="variety" className="text-sm font-medium">Variety</Label>
                <Input
                  id="variety"
                  value={variety}
                  onChange={e => setVariety(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="plantingDate" className="text-sm font-medium">Planting Date *</Label>
                <Input
                  id="plantingDate"
                  type="date"
                  value={plantingDate}
                  disabled
                />
              </div>

              <div>
                <Label htmlFor="expectedHarvestDate" className="text-sm font-medium">Expected Harvest Date</Label>
                <Input
                  id="expectedHarvestDate"
                  type="date"
                  value={expectedHarvestDate}
                  disabled
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Planted Area (acres) *</Label>
                <div className="mt-1 px-3 py-2 bg-muted rounded-md border border-border">
                  {plotDetails?.area ?? "Loading..."}
                </div>
              </div>

              <div>
                <Label htmlFor="seedCost" className="text-sm font-medium">Seed Cost</Label>
                <Input
                  id="seedCost"
                  type="number"
                  value={seedCost}
                  onChange={e => setSeedCost(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="currentValue" className="text-sm font-medium">Current Value</Label>
                <Input
                  id="currentValue"
                  type="number"
                  value={currentValue}
                  onChange={e => setCurrentValue(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="batchNumber" className="text-sm font-medium">Batch Number</Label>
                <Input
                  id="batchNumber"
                  value={batchNumber}
                  onChange={e => setBatchNumber(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  className="mt-1 w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Any additional information..."
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12">
                {loading ? "Adding..." : "Add Plant"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Dialog open={submitModalOpen} onOpenChange={() => {}}>
          <DialogContent className="max-w-md flex flex-col items-center justify-center py-10">
            
            <p className="mt-4 text-center font-medium">Adding plant, please wait...</p>
          </DialogContent>
        </Dialog>

        <Dialog open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
          <DialogContent className="max-w-xl max-h-[60vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>AI Plant Suggestions</DialogTitle>
            </DialogHeader>
            <div className="p-4 space-y-4">
              {aiLoading && <p className="text-center">Loading suggestions...</p>}
              {!aiLoading && aiSuggestions.length === 0 && <p className="text-center">No suggestions found.</p>}
              {!aiLoading && aiSuggestions.map(({ plant_name, explanation }, idx) => (
                <Card key={idx} className="p-4 flex flex-col justify-between border rounded-md">
                  <div>
                    <h3 className="font-semibold">{plant_name}</h3>
                    <p className="text-sm mt-1" style={{ whiteSpace: "pre-line" }}>{explanation}</p>
                  </div>
                </Card>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={handleAiModalClose}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
};

export default Plants;
