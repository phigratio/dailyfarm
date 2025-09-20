import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { privateAxios, generateGeminiContent } from "../../../services/userService/userService";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
interface Message {
  from: "user" | "bot";
  text: string;
}

const plotTypeCategoryMap: Record<string, string[]> = {
  "Vegetable Bed": ["Plants"],
  "Herb Patch": ["Plants"],
  "Fruit Patch": ["Plants"],
  "Flower Bed": ["Plants"],
  "Crop Field": ["Plants"],
  "Orchard": ["Plants"],
  "Pasture": ["Animals"],
  "Container Bed": ["Plants"],
  "Raised Bed": ["Plants"],
  "Hydroponic System": ["Plants"],
  "Seedling Tray": ["Plants"],
  "Hydroponic Channel": ["Plants"],
  "Cereal Field": ["Plants"],
  "Vegetable Field": ["Plants"],
  "Legume Field": ["Plants"],
  "Grazing Paddock": ["Animals"],
  "Exercise Yard": ["Animals"],
  "Shelter Area": ["Animals"],
  "Chicken Pen": ["Animals"],
  "Free-Range Run": ["Animals"],
  "Fish Pond": ["Fishes"],
  "Hatchery Tank": ["Fishes"],
  "Pasture Plot": ["Animals"],
  "Feed Crop Plot": ["Plants"],
  "Pen": ["Animals"],
  "Organic Vegetable Bed": ["Plants"],
  "Cover Crop": ["Plants"],
  "NFT Channel": ["Plants"],
  "Drip Tray": ["Plants"],
  "Vertical Bed": ["Plants"],
};

const potContainerPlotTypes = [
  "Container Bed",
  "Raised Bed",
  "Hydroponic System",
  "Seedling Tray",
  "Hydroponic Channel",
  "NFT Channel",
  "Drip Tray",
  "Vertical Bed",
];

const fisheryPlotTypes = ["Fish Pond", "Hatchery Tank"];

const PlotDetails = () => {
  const { plotId, farmId } = useParams<{ plotId: string, farmId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [plot, setPlot] = useState<any>(null);
  const [farmDetails, setFarmDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isLabModalOpen, setLabModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [crops, setCrops] = useState<any[]>([]);
  const [animals, setAnimals] = useState<any[]>([]);
  const [loadingCrops, setLoadingCrops] = useState(false);
  const [loadingAnimals, setLoadingAnimals] = useState(false);
  const [isSurveyModalOpen, setSurveyModalOpen] = useState(false);
  const [instructionsFulfilled, setInstructionsFulfilled] = useState("");
  const [fertilizersGiven, setFertilizersGiven] = useState(false);
  const [irrigationDone, setIrrigationDone] = useState(false);
  const [growthRate, setGrowthRate] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<any | null>(null);
  const [pestResistance, setPestResistance] = useState("");
  const [fertilizerNeeds, setFertilizerNeeds] = useState("");
  const [irrigationNeeds, setIrrigationNeeds] = useState("");
  const [surveyLoading, setSurveyLoading] = useState(false);
  const [harvestModalOpen, setHarvestModalOpen] = useState(false);
  const [selectedHarvestCrop, setSelectedHarvestCrop] = useState<any | null>(null);
  const [extendDays, setExtendDays] = useState("");
  const [harvestLoading, setHarvestLoading] = useState(false);
  const [surveyAnimals, setSurveyAnimals] = useState<any[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<any | null>(null);
  const [growthStatus, setGrowthStatus] = useState("");
  const [fedWell, setFedWell] = useState(false);
  const [surveyNotes, setSurveyNotes] = useState("");
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [loadingSurvey, setLoadingSurvey] = useState(false);
  const [isMarketplaceModalOpen, setMarketplaceModalOpen] = useState(false);



  const [marketplaceFormData, setMarketplaceFormData] = useState({
    name: "",
    price: "",
    description: "",
    contact: "",
    amount: "",
  });
  const [selectedCropId, setSelectedCropId] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ from: "user" | "bot"; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll chat to bottom on messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const openChatModal = () => setChatOpen(true);
  const closeChatModal = () => {
    setChatOpen(false);
    setChatMessages([]);
    setChatInput("");
  };

  // Handle send chat message
  const handleSendMessage = async () => {
    if (!chatInput.trim() || !plotId) {
      // Return if the input is empty or plotId is missing
      return;
    }

    // Add user message to chat immediately
    const userMessage = chatInput;
    setChatMessages((msgs) => [...msgs, { from: "user", text: userMessage }]);

    // Reset input
    setChatInput("");

    try {
      // Send the query to your local RAG service
      const aiServiceUrl = `http://127.0.0.1:5000/query/234`;
      const response = await privateAxios.post(aiServiceUrl, {

        query: userMessage,
      });

      // Extract the bot's response from the API response
      const botResponse = response.data.candidates[0].content.parts[0].text;

      // Add the bot's response to the chat
      setChatMessages((msgs) => [...msgs, { from: "bot", text: botResponse }]);

    } catch (error) {
      console.error("Failed to get bot response:", error);
      // Show an error message if the API call fails
      setChatMessages((msgs) => [...msgs, { from: "bot", text: "Error: Could not retrieve a response. Please try again." }]);
    }
  };

  // Support enter key for sending message
  const handleChatInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openMarketplaceModal = (cropId) => {
    setSelectedCropId(cropId);
    setMarketplaceModalOpen(true);
  };


  const closeMarketplaceModal = () => {
    setMarketplaceModalOpen(false);
    setMarketplaceFormData({
      name: "",
      price: "",
      description: "",
      contact: "",
      amount: "",
    });
    setSelectedCropId(null);
  };

  const handleMarketplaceFormChange = (e) => {
    const { name, value } = e.target;
    setMarketplaceFormData(prev => ({ ...prev, [name]: value }));
  };





  const handleMarketplaceFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare payload with userId
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("User not found in localStorage");

      const payload = {
        ...marketplaceFormData,
        userId: user,
      };

      // Add item to marketplace
      const marketplaceResponse = await privateAxios.post("/api/marketplace", payload);
      console.log("Marketplace item added:", marketplaceResponse.data);

      // Delete the crop from CropService
      if (selectedCropId) {
        const deleteResponse = await privateAxios.delete(`/crops/${selectedCropId}`);
        if (deleteResponse.status === 204) {
          console.log("Crop deleted successfully from CropService");

          // Refresh the page
          window.location.reload();
        } else {
          console.warn("Failed to delete crop after marketplace add");
        }
      } else {
        console.warn("No selectedCropId provided, skipping delete");
      }

      // Close modal (optional if you refresh, but can be kept for instant feedback)
      closeMarketplaceModal();

    } catch (error) {
      console.error("Failed to add marketplace item or delete crop", error);
      // Show error toast or message here
    }
  };







  const handleSurveySubmitCrop = async (crop: any) => {
    console.log(crop)
    if (!crop) return;

    setSurveyLoading(true); // ✅ Start loading

    const cropAge = calculateCropAge(crop.plantingDate);

    const surveyData = {
      instructionsFulfilled,
      fertilizersGiven,
      irrigationDone,
      growthRate,
      notes,
    };

    const prompt = `
Based on the following survey data and crop age, provide new estimates formatted exactly as below with labels:
Provide pest resistance, fertilizer needs (name + amount)/day, and irrigation needs (amount/day) for ${crop.cropName} 

PestResistance: <text>
FertilizerNeeds: <text>
IrrigationNeeds: <text>
No extra explanation.

Survey Data:
- Instructions Fulfilled: ${surveyData.instructionsFulfilled}
- Fertilizers Given Properly: ${surveyData.fertilizersGiven ? "Yes" : "No"}
- Irrigation Done Properly: ${surveyData.irrigationDone ? "Yes" : "No"}
- Growth Rate: ${surveyData.growthRate}
- Notes: ${surveyData.notes}
- soil pH:

Crop Age: ${cropAge}

previous data was
pest resistance: ${selectedCrop.pestResistance}
fertilizer needs: ${selectedCrop.fertilizerNeeds}
irrigation needs: ${selectedCrop.irrigationNeeds}
modify them according to stats
`;

    try {
      const aiResponse = await generateGeminiContent(prompt.trim());
      console.log("AI Response:", aiResponse);

      const mapped: Record<string, string> = {};
      aiResponse.split("\n").forEach(line => {
        const [key, ...rest] = line.split(":");
        if (key && rest.length) {
          mapped[key.trim()] = rest.join(":").trim();
        }
      });

      setPestResistance(mapped["PestResistance"] ?? "");
      setFertilizerNeeds(mapped["FertilizerNeeds"] ?? "");
      setIrrigationNeeds(mapped["IrrigationNeeds"] ?? "");
      console.log("Mapped values:", mapped);
      const updatedCrop = {
        ...crop,
        pestResistance: mapped["PestResistance"] ?? crop.pestResistance,
        fertilizerNeeds: mapped["FertilizerNeeds"] ?? crop.fertilizerNeeds,
        irrigationNeeds: mapped["IrrigationNeeds"] ?? crop.irrigationNeeds,
        status: "GROWING",
        productivityRecordDate: new Date().toISOString(), // or new Date().toISOString().split("T")[0]
      };

      // ✅ Call API to update crop
      await privateAxios.put(`/crops/${crop.cropId}`, updatedCrop);
      const updatedPlot = {
        ...plot,
        farm: { farmId },
        status: "GROWING"
      };


      // PUT plot update
      await privateAxios.put(`/farms/plots/${plotId}`, updatedPlot);

      toast({
        title: "Survey Submitted",
        description: "Crop updated with AI recommendations.",
        variant: "success",
      });

      // ✅ Reload page or refetch crops
      window.location.reload();


      toast({
        title: "Survey Submitted",
        description: "AI-based recommendations have been updated.",
        variant: "success",
      });

    } catch (error) {
      console.error("AI generation failed:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI recommendations.",
        variant: "destructive",
      });
    } finally {
      setSurveyLoading(false); // ✅ Stop loading
      setSurveyModalOpen(false);
    }
  };


  function calculateCropAge(plantingDateString) {
    if (!plantingDateString) return "unknown";
    const plantingDate = new Date(plantingDateString);
    const today = new Date();
    const diffMs = today - plantingDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  }



  function daysSince(dateString: string): number {
    if (!dateString) return Infinity;
    const then = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - then.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  useEffect(() => {
    if (!animals.length) return;

    // Find animals needing survey
    const today = new Date();
    const dueAnimal = animals.find(animal => {
      if (animal.status === "SICK" || !animal.updatedAt) return false;
      return daysSince(animal.updatedAt) > 7;
    });

    if (dueAnimal) {
      setSelectedAnimal(dueAnimal);
      setShowSurveyModal(true);
      // Pre-fill survey states if needed
      setGrowthStatus("");
      setFedWell(false);
      setSurveyNotes("");
    }
  }, [animals]);

  const handleSurveySubmitAnimal = async () => {
    if (!selectedAnimal) return;

    setLoadingSurvey(true);

    try {
      const prompt = `
Update the feeding plan for ${selectedAnimal.animalName} based on following info:
Growth Status: ${growthStatus}
Fed Well: ${fedWell ? "Yes" : "No"}
Additional Notes: ${surveyNotes}

Provide updated food name and quantity in exact format:
FoodName: <food name>
FoodQuantity: <quantity>
No extra text.
    `;
      let foodName = "";
      let foodQuantity = "";

      // Get AI food update
      const aiResponse = await generateGeminiContent(prompt.trim());
      const lines = aiResponse.split("\n");

      lines.forEach(line => {
        const [key, ...rest] = line.split(":");
        if (key && rest.length) {
          const val = rest.join(":").trim();
          if (key.trim() === "FoodName") foodName = val;
          if (key.trim() === "FoodQuantity") foodQuantity = val;
        }
      });

      // Concatenate food name and quantity if both exist
      if (foodName && foodQuantity) {
        foodName = `${foodName} (${foodQuantity})`;
      }

      // Update animal via API
      const updatedAnimal = {
        ...selectedAnimal,
        food: foodName,
        updatedAt: new Date().toISOString(),
      };

      await privateAxios.put(`/api/animals${selectedAnimal.animalId}`, updatedAnimal);

      setShowSurveyModal(false);
      setSelectedAnimal(null);

      // Refresh animals
      const res = await privateAxios.get(`/animals/plot/${selectedAnimal.plotId}`);
      setAnimals(res.data);

      toast({
        title: "Survey Submitted",
        description: `${selectedAnimal.animalName} feeding and growth info updated.`,
        variant: "success",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit survey.",
        variant: "destructive",
      });
    } finally {
      setLoadingSurvey(false);
    }
  };

  const [labValues, setLabValues] = useState({
    soilPh: "",
    organicMatter: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    waterPh: "",
  });

  const getDaysDifference = (date1: string | Date, date2: string | Date) => {
    console.log("Hello")
    // Convert to Date objects if they are strings
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Normalize to midnight (remove time component)
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    // Calculate difference in days
    const diffTime = d2.getTime() - d1.getTime();

    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  };



  useEffect(() => {
    const fetchData = async () => {
      if (!plotId) return;
      setLoading(true);
      try {
        // 1. Fetch Plot details
        const plotResponse = await privateAxios.get(`/farms/plots/${plotId}`);
        setPlot(plotResponse.data);
        console.log(plotResponse.data)

        // 2. Fetch Farm details using farmId from URL if available
        if (farmId) {
          const farmResponse = await privateAxios.get(`/farms/${farmId}`);
          // Store only soilType and irrigationType to state
          setFarmDetails({
            soilType: farmResponse.data.soilType,
            irrigationType: farmResponse.data.irrigationType,
          });
          console.log(farmResponse.data.soilType, farmResponse.data.irrigationType);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load plot or farm details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [plotId, farmId, toast]);

  useEffect(() => {
    if (!plot || !plot.plotId) return;

    const plantTypes = ["Plants"];
    const categories = plotTypeCategoryMap[plot.plotType] || [];

    const fetchCrops = async () => {
      setLoadingCrops(true);
      try {
        const res = await privateAxios.get(`/crops/plot/${plot.plotId}`);
        setCrops(res.data);
        console.log(res.data);
      } catch {
        toast({
          title: "Error",
          description: "Failed to load crops",
          variant: "destructive"
        });
      } finally {
        setLoadingCrops(false);
      }
    };

    const fetchAnimals = async () => {
      setLoadingAnimals(true);
      try {
        const res = await privateAxios.get(`/api/animals/plot/${plot.plotId}`);
        setAnimals(res.data);
        console.log(res.data); // Consider using setAnimals if you want separate state
      } catch {
        toast({
          title: "Error",
          description: "Failed to load animals",
          variant: "destructive"
        });
      } finally {
        setLoadingAnimals(false);
      }
    };

    const fetchData = async () => {
      if (!categories.some(cat => plantTypes.includes(cat))) {
        setCrops([]);
        await fetchAnimals();
      } else {
        await fetchCrops();
      }
    };

    fetchData();

    // Effect dependencies
  }, [plot, toast]);

  useEffect(() => {
    if (crops.length === 0) return;

    const today = new Date();

    for (const crop of crops) {
      if (crop.status === "DISEASED") continue; // skip diseased crops
      if (!crop.expectedHarvestDate) continue;

      const harvestDate = new Date(crop.expectedHarvestDate);
      console.log(today.toDateString());
      console.log(harvestDate.toDateString());

      if (harvestDate.toDateString() === today.toDateString()) {
        setSelectedHarvestCrop(crop);
        setHarvestModalOpen(true);
        break;
      }
    }
  }, [crops]);


  useEffect(() => {
    if (crops.length === 0) return;

    const today = new Date();
    let shouldOpenModal = false;

    for (const crop of crops) {
      console.log(crop);
      if (!crop.productivityRecordDate) continue;
      const recordDate = crop.productivityRecordDate;
      const recordDateObj = new Date(recordDate);
      console.log(recordDateObj.toDateString());
      console.log(today.toDateString());
      setSelectedCrop(crop);

      if (
        
        getDaysDifference(recordDate, today) > 7
      ) {
        console.log("Days Difference:", getDaysDifference(recordDate, today));
        shouldOpenModal = true;
        setSurveyModalOpen(shouldOpenModal);
        break;
      }

    }
    
    setSurveyModalOpen(shouldOpenModal);
  }, [crops]);




  const getCategoryForPlotType = (plotType: string | undefined) => {
    if (!plotType) return [];
    return plotTypeCategoryMap[plotType] ?? [];
  };

  const getAddButtonLabel = (plotType: string | undefined) => {
    const categories = getCategoryForPlotType(plotType);
    if (categories.includes("Plants") && categories.includes("Animals")) {
      return "Add Plants/Animals";
    }
    if (categories.includes("Plants")) {
      return "Add Plants";
    }
    if (categories.includes("Animals")) {
      return "Add Animals";
    }
    if (categories.includes("Fishes")) {
      return "Add Fishes";
    }
    return "Add Items";
  };
  const getAddItems = (plotType: string | undefined) => {
    const categories = getCategoryForPlotType(plotType);
    if (categories.includes("Plants") && categories.includes("Animals")) {
      return "plants";
    }
    if (categories.includes("Plants")) {
      return "plants";
    }
    if (categories.includes("Animals")) {
      return "animals";
    }
    if (categories.includes("Fishes")) {
      return "fishes";
    }
    return "items";
  };

  const shouldShowLabTestMessage = (plot: any) => {
    if (!plot) return false;
    if (potContainerPlotTypes.includes(plot.plotType)) return false;
    if (fisheryPlotTypes.includes(plot.plotType) && (plot.waterPh == null)) {
      return true;
    }
    const soilParamsMissing =
      plot.soilPh == null ||
      plot.organicMatter == null ||
      plot.nitrogen == null ||
      plot.phosphorus == null ||
      plot.potassium == null;
    if (soilParamsMissing && !fisheryPlotTypes.includes(plot.plotType)) return true;
    return false;
  };

  const handleLabSubmit = async () => {
    if (!plot || !plot.plotId) {
      toast({
        title: "Error",
        description: "Plot data is missing.",
        variant: "destructive",
      });
      return;
    }

    const updatedPlot = {
      ...plot,
      farm: { farmId },
      soilPh: labValues.soilPh ? parseFloat(labValues.soilPh) : null,
      organicMatter: labValues.organicMatter ? parseFloat(labValues.organicMatter) : null,
      nitrogen: labValues.nitrogen ? parseFloat(labValues.nitrogen) : null,
      phosphorus: labValues.phosphorus ? parseFloat(labValues.phosphorus) : null,
      potassium: labValues.potassium ? parseFloat(labValues.potassium) : null,
      waterPh: labValues.waterPh ? parseFloat(labValues.waterPh) : null,
    };
    console.log(updatedPlot)

    try {
      await privateAxios.put(`/farms/plots/${plot.plotId}`, updatedPlot);
      toast({
        title: "Success",
        description: "Results submitted successfully.",
        variant: "success",
      });
      setLabModalOpen(false);

      // Refresh plot details after update
      const response = await privateAxios.get(`/farms/plots/${plot.plotId}`);
      setPlot(response.data);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit lab results.",
        variant: "destructive",
      });
    }
  };

  const handleHarvestDecision = async (harvestNow: boolean) => {
    if (!selectedHarvestCrop) return;

    try {
      setHarvestLoading(true);

      if (harvestNow) {
        // ✅ Mark crop as harvested
        const updatedCrop = { ...selectedHarvestCrop, status: "HARVESTED", expectedHarvestDate: "1990-09-11" };
        await privateAxios.put(`/crops/${selectedHarvestCrop.cropId}`, updatedCrop);

        toast({
          title: "Crop Harvested",
          description: `${selectedHarvestCrop.cropName} has been marked as HARVESTED.`,
          variant: "success",
        });
      } else {
        // ✅ Extend harvest date
        const newDate = new Date(selectedHarvestCrop.expectedHarvestDate);
        newDate.setDate(newDate.getDate() + (parseInt(extendDays) || 0));

        const updatedCrop = { ...selectedHarvestCrop, expectedHarvestDate: newDate.toISOString().split("T")[0] };
        await privateAxios.put(`/crops/${selectedHarvestCrop.cropId}`, updatedCrop);

        toast({
          title: "Harvest Date Extended",
          description: `Harvest date updated to ${newDate.toDateString()}.`,
          variant: "default",
        });
      }

      // ✅ Reload crops after update
      window.location.reload();

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update crop harvest status.",
        variant: "destructive",
      });
    } finally {
      setHarvestLoading(false);
      setHarvestModalOpen(false);
      setExtendDays("");
    }
  };



  const handleTrustAIClick = async () => {
    if (!farmDetails || !plot) {
      toast({
        title: "Missing Data",
        description: "Farm or plot details not loaded yet.",
        variant: "destructive",
      });
      return;
    }
    setAiLoading(true);
    setAiContent(null);

    const prompt = `
"Based on the following farm and plot details, provide estimated values formatted exactly as below with labels and corresponding values separated by commas:

Soil pH: [value], Organic Matter (%): [value], Nitrogen (N) ppm: [value], Phosphorus (P) ppm: [value], Potassium (K) ppm: [value], Water pH: [value or 'N/A' if not applicable]

The farm has soil type: ${farmDetails.soilType}, irrigation type: ${farmDetails.irrigationType}, and the plot type is: ${plot.plotType}. Provide only this labeled data in the specified format, no extra text or explanation."
    `;
    try {
      const response = await generateGeminiContent(prompt.trim());
      setAiContent(response);
      toast({
        title: "AI Estimates Generated",
        description: "See the AI-generated soil and water estimates below.",
        variant: "default",
      });
      setLabModalOpen(false);
    } catch {
      toast({
        title: "Error",
        description: "Failed to generate AI estimates.",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading plot details...</p>;
  if (!plot)
    return <p className="text-center mt-10 text-destructive">Plot not found.</p>;

  const isFishery = fisheryPlotTypes.includes(plot.plotType);
  const isPotContainer = potContainerPlotTypes.includes(plot.plotType);
  const categories = plot ? plotTypeCategoryMap[plot.plotType] || [] : [];


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background pt-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/20"></div>
          <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-accent/20"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-secondary/20"></div>
          <div className="absolute bottom-40 right-1/3 w-12 h-12 rounded-full bg-primary/20"></div>
        </div>

        <div className="max-w-4xl mx-auto py-8 px-4 relative z-10">


          <Card className="shadow-md border border-border/50 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Plot Details - {plot.plotNumber}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-3">
              <p><strong>Area:</strong> {plot.area} acres</p>
              <p><strong>Status:</strong> {plot.status ?? "Unknown"}</p>
              {!categories.includes("Animals") && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Soil Information</h3>
                  <p><strong>Soil pH:</strong> {plot.soilPh ?? "N/A"}</p>
                  <p><strong>Potassium:</strong> {plot.potassium ?? "N/A"}</p>
                  <p><strong>Phosphorus:</strong> {plot.phosphorus ?? "N/A"}</p>
                  <p><strong>Nitrogen:</strong> {plot.nitrogen
                    ?? "N/A"}</p>
                  <p><strong>Organic Matter:</strong> {plot.organicMatter
                    ?? "N/A"}</p>
                </div>
              )}
              <p><strong>Notes:</strong> {plot.notes ?? "None"}</p>
              <p className={`font-semibold ${plot.isActive ? "text-green-600" : "text-red-600"}`}>
                {plot.isActive ? "Active" : "Inactive"}
              </p>

              {!categories.includes("Animals") && shouldShowLabTestMessage(plot) && (
                <div className="p-4 mb-4 rounded-md bg-yellow-100 text-yellow-800 border border-yellow-300">
                  <p>
                    Important soil or water quality information is missing. Please consider performing a professional lab test for accurate N, P, K, pH, and organic matter results.
                  </p>
                  {isFishery && (
                    <p className="mt-2 italic">
                      You can optionally trust AI-based estimates but it is recommended to verify with lab results.
                    </p>
                  )}
                  <div className="flex space-x-4 mt-4">
                    <Button onClick={handleTrustAIClick} variant="outline" disabled={aiLoading}>
                      {aiLoading ? "Generating..." : "Trust AI"}
                    </Button>
                    <Button onClick={() => setLabModalOpen(true)} variant="default">
                      Give Result (AI/Lab)
                    </Button>
                  </div>
                  {aiContent && (
                    <pre className="mt-4 whitespace-pre-wrap bg-gray-100 p-3 rounded">{aiContent}</pre>
                  )}
                </div>
              )}

              {crops.length === 0 && (
                <>
                  {categories.includes("Plants") && categories.includes("Animals") ? (
                    <div className="flex space-x-4 mt-4">
                      <Button
                        onClick={() => navigate(`/add-plants/${plot.plotId}/${farmId}`)}
                        className="mt-4 px-6 py-3 rounded-lg shadow-md bg-primary text-white hover:bg-primary-dark transition-colors duration-300 font-semibold"
                      >
                        Add Plants
                      </Button>
                      <Button
                        onClick={() => navigate(`/add-animals/${plot.plotId}/${farmId}`)}
                        className="mt-4 px-6 py-3 rounded-lg shadow-md bg-secondary text-white hover:bg-secondary-dark transition-colors duration-300 font-semibold"
                      >
                        Add Animals
                      </Button>
                    </div>
                  ) : categories.includes("Plants") ? (
                    <Button
                      onClick={() => navigate(`/add-plants/${plot.plotId}/${farmId}`)}
                      className="mt-4 px-6 py-3 rounded-lg shadow-md bg-primary text-white hover:bg-primary-dark transition-colors duration-300 font-semibold"
                    >
                      Add Plants
                    </Button>
                  ) : categories.includes("Animals") ? (
                    <Button
                      onClick={() => navigate(`/add-animals/${plot.plotId}/${farmId}`)}
                      className="mt-4 px-6 py-3 rounded-lg shadow-md bg-secondary text-white hover:bg-secondary-dark transition-colors duration-300 font-semibold"
                    >
                      Add Animals
                    </Button>
                  ) : categories.includes("Fishes") ? (
                    <Button
                      onClick={() => navigate(`/add-fishes/${plot.plotId}/${farmId}`)}
                      className="mt-4 px-6 py-3 rounded-lg shadow-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 font-semibold"
                    >
                      Add Fishes
                    </Button>
                  ) : null}
                </>
              )}

            </CardContent>
          </Card>
        </div>

        <Dialog open={isCategoryOpen} onOpenChange={setCategoryOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Suitable Categories</DialogTitle>
            </DialogHeader>
            <div>
              {plot && (
                <>
                  <p>
                    Based on plot type: <strong>{plot.plotType ?? "Unknown"}</strong>
                  </p>
                  <ul className="list-disc ml-5 mt-2">
                    {getCategoryForPlotType(plot.plotType).map((cat) => (
                      <li key={cat}>{cat}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setCategoryOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isLabModalOpen} onOpenChange={setLabModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Enter Lab Results</DialogTitle>
            </DialogHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLabSubmit();
              }}
              className="space-y-4"
            >
              {!isFishery && !potContainerPlotTypes.includes(plot.plotType) && (
                <>
                  <div>
                    <label htmlFor="soilPh" className="block mb-1 font-medium text-sm">
                      Soil pH
                    </label>
                    <input
                      id="soilPh"
                      type="number"
                      step="0.01"
                      value={labValues.soilPh}
                      onChange={(e) => setLabValues({ ...labValues, soilPh: e.target.value })}
                      required
                      className="w-full rounded border px-2 py-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="organicMatter" className="block mb-1 font-medium text-sm">
                      Organic Matter (%)
                    </label>
                    <input
                      id="organicMatter"
                      type="number"
                      step="0.01"
                      value={labValues.organicMatter}
                      onChange={(e) => setLabValues({ ...labValues, organicMatter: e.target.value })}
                      required
                      className="w-full rounded border px-2 py-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="nitrogen" className="block mb-1 font-medium text-sm">
                      Nitrogen (N) (ppm)
                    </label>
                    <input
                      id="nitrogen"
                      type="number"
                      step="0.01"
                      value={labValues.nitrogen}
                      onChange={(e) => setLabValues({ ...labValues, nitrogen: e.target.value })}
                      required
                      className="w-full rounded border px-2 py-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="phosphorus" className="block mb-1 font-medium text-sm">
                      Phosphorus (P) (ppm)
                    </label>
                    <input
                      id="phosphorus"
                      type="number"
                      step="0.01"
                      value={labValues.phosphorus}
                      onChange={(e) => setLabValues({ ...labValues, phosphorus: e.target.value })}
                      required
                      className="w-full rounded border px-2 py-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="potassium" className="block mb-1 font-medium text-sm">
                      Potassium (K) (ppm)
                    </label>
                    <input
                      id="potassium"
                      type="number"
                      step="0.01"
                      value={labValues.potassium}
                      onChange={(e) => setLabValues({ ...labValues, potassium: e.target.value })}
                      required
                      className="w-full rounded border px-2 py-1"
                    />
                  </div>
                </>
              )}

              {isFishery && (
                <div>
                  <label htmlFor="waterPh" className="block mb-1 font-medium text-sm">
                    Water pH
                  </label>
                  <input
                    id="waterPh"
                    type="number"
                    step="0.01"
                    value={labValues.waterPh}
                    onChange={(e) => setLabValues({ ...labValues, waterPh: e.target.value })}
                    required
                    className="w-full rounded border px-2 py-1"
                  />
                </div>
              )}

              <DialogFooter className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setLabModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {categories.includes("Plants") && (<div className="max-w-4xl mx-auto py-8 px-4 relative z-10">
          <Card className="shadow-md border border-border/50 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Plot Elements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-4">
              {loadingCrops ? (
                <p className="text-center">Loading crops...</p>
              ) : crops.length === 0 ? (
                <p className="text-center">No Elements found for this plot.</p>
              ) : (
                crops.map((crop) => (
                  <div
                    key={crop.cropId}
                    className={`p-4 rounded border bg-card/80 backdrop-blur-md shadow transition mb-4
            ${crop.status === "HARVESTED" ? "border-green-500 bg-green-50/60" : "border-border"}`}
                  >
                    <h3 className="font-semibold text-lg text-center">{crop.plantName}</h3>
                    <div className="space-y-1">
                      <p><strong>Name:</strong> {crop.cropName}</p>
                      <p><strong>Category:</strong> {crop.category}</p>
                      <p><strong>Variety:</strong> {crop.variety ?? "N/A"}</p>
                      <p><strong>Status:</strong> {crop.status}</p>
                      <p><strong>Planting Date:</strong> {crop.plantingDate}</p>
                      <p><strong>Expected Harvest:</strong> {crop.expectedHarvestDate ?? "N/A"}</p>
                      <p><strong>Pest Resistance:</strong> {crop.pestResistance ?? "N/A"}</p>
                      <p><strong>Irrigation Need:</strong> {crop.irrigationNeeds ?? "N/A"}</p>
                      <p><strong>Fertilizer Need:</strong> {crop.fertilizerNeeds ?? "N/A"}</p>
                      <p><strong>Notes:</strong> {crop.notes ?? "None"}</p>
                    </div>

                    {/* Buttons Section */}
                    <div className="flex flex-col items-center mt-3 space-y-2">
                      {crop.status === "HARVESTED" && (
                        <Button
                          onClick={() => openMarketplaceModal(crop.cropId)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Add to Marketplace
                        </Button>
                      )}

                      {(crop.status !== "DISEASED" && crop.status !== "HARVESTED") && (
                        <Button
                          onClick={() => console.log(`Mark ${crop.cropName} as diseased`)}
                          variant="destructive"
                        >
                          Found Disease
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>




        </div>
        )}

        {animals.length > 0 && (
          <div className="max-w-4xl mx-auto py-8 px-4 relative z-10">
            <Card className="shadow-md border border-border/50 bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Animals on Plot
                </CardTitle>
              </CardHeader>
              <CardContent className="text-foreground space-y-4">
                {animals.map((animal) => (
                  <div
                    key={animal.animalId}
                    className={`p-4 rounded border bg-card/80 backdrop-blur-md shadow transition mb-4
              ${animal.status === "HARVESTED" ? "border-green-500 bg-green-50/60" : "border-border"}`}
                  >
                    <h3 className="font-bold text-lg">{animal.animalName}</h3>
                    <div className="space-y-1">
                      <p><strong>Age:</strong> {animal.age ?? "N/A"} years</p>
                      <p><strong>Breed:</strong> {animal.breed ?? "N/A"}</p>
                      <p><strong>Food:</strong> {animal.food ?? "N/A"}</p>
                      <p><strong>Gender:</strong> {animal.gender ?? "N/A"}</p>
                      <p><strong>Height:</strong> {animal.height ?? "N/A"} cm</p>
                      <p><strong>Purchase Price:</strong> {animal.purchasePrice ?? "N/A"} Tk</p>
                      <p><strong>Status:</strong> {animal.status ?? "N/A"}</p>
                      <p><strong>Weight:</strong> {animal.weight ?? "N/A"} kg</p>
                      <p><strong>Notes:</strong> {animal.notes ?? "None"}</p>
                    </div>

                    {/* Buttons Section */}
                    <div className="flex flex-col items-center mt-3 space-y-2">

                      <Button
                        onClick={() => navigate(`/marketplace/add/${animal.animalId}`)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Add to Marketplace
                      </Button>

                      {animal.status !== "DISEASED" && animal.status !== "SICK" && (
                        <Button
                          onClick={() => console.log(`Mark ${animal.animalName} as diseased`)}
                          variant="destructive"
                        >
                          Found Disease
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {showSurveyModal && selectedAnimal && (
          <Dialog open={showSurveyModal} onOpenChange={setShowSurveyModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Animal Survey - {selectedAnimal.animalName}</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSurveySubmitAnimal();
                }}
              >
                <div>
                  <Label>Growth Status</Label>
                  <textarea
                    rows={3}
                    value={growthStatus}
                    onChange={(e) => setGrowthStatus(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Fed Well</Label>
                  <input
                    type="checkbox"
                    checked={fedWell}
                    onChange={(e) => setFedWell(e.target.checked)}
                  />
                </div>
                <div>
                  <Label>Additional Notes</Label>
                  <textarea
                    rows={3}
                    value={surveyNotes}
                    onChange={(e) => setSurveyNotes(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={loadingSurvey}>
                    {loadingSurvey ? "Submitting..." : "Submit"}
                  </Button>
                  <Button onClick={() => setShowSurveyModal(false)}>Cancel</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}





        <Dialog open={isSurveyModalOpen} onOpenChange={setSurveyModalOpen}>
          <DialogContent className="sm:max-w-lg">


            <form className="space-y-4" onSubmit={handleSurveySubmitCrop}>
              <div>
                <label className="block font-medium mb-1">Have all instructions been fulfilled?</label>
                <select
                  className="w-full rounded border px-2 py-1"
                  required
                  value={instructionsFulfilled}
                  onChange={(e) => setInstructionsFulfilled(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="fertilizers"
                  type="checkbox"
                  checked={fertilizersGiven}
                  onChange={(e) => setFertilizersGiven(e.target.checked)}
                />
                <label htmlFor="fertilizers" className="font-medium">
                  Fertilizers given properly
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="irrigation"
                  type="checkbox"
                  checked={irrigationDone}
                  onChange={(e) => setIrrigationDone(e.target.checked)}
                />
                <label htmlFor="irrigation" className="font-medium">
                  Irrigation performed properly
                </label>
              </div>

              <div>
                <label className="block font-medium mb-1">What is the growth rate?</label>
                <input
                  type="text"
                  className="w-full rounded border px-2 py-1"
                  placeholder="Describe growth rate"
                  required
                  value={growthRate}
                  onChange={(e) => setGrowthRate(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Additional notes</label>
                <textarea
                  className="w-full rounded border px-2 py-1"
                  rows={4}
                  placeholder="Enter any additional notes here"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setSurveyModalOpen(false)}>
                  Close
                </Button>
                <Button
                  type="button"
                  variant="default"
                  onClick={() => handleSurveySubmitCrop(selectedCrop)} // pass selected crop here
                >
                  {surveyLoading ? "Submitting..." : "Submit"}
                </Button>


              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={harvestModalOpen} onOpenChange={setHarvestModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Harvest Decision</DialogTitle>
            </DialogHeader>

            {selectedHarvestCrop && (
              <div className="space-y-4">
                <p>
                  Today is the expected harvest date for <strong>{selectedHarvestCrop.cropName}</strong>.
                  Would you like to mark it as ready for harvest?
                </p>

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="default"
                    disabled={harvestLoading}
                    onClick={() => handleHarvestDecision(true)}
                  >
                    {harvestLoading ? "Updating..." : "Yes, Harvest Now"}
                  </Button>

                  <Button
                    variant="outline"
                    disabled={harvestLoading}
                    onClick={() => setExtendDays("")} // Clear input before showing extend option
                  >
                    No, Extend Date
                  </Button>
                </div>

                {extendDays !== undefined && (
                  <div className="mt-4">
                    <label className="block mb-1 font-medium text-sm">Extend by (days)</label>
                    <input
                      type="number"
                      className="w-full rounded border px-2 py-1"
                      value={extendDays}
                      onChange={(e) => setExtendDays(e.target.value)}
                      placeholder="Enter extra days"
                    />
                    <Button
                      className="mt-3"
                      variant="secondary"
                      disabled={harvestLoading || !extendDays}
                      onClick={() => handleHarvestDecision(false)}
                    >
                      {harvestLoading ? "Updating..." : "Update Harvest Date"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>



      </div>
      <Dialog open={isMarketplaceModalOpen} onOpenChange={setMarketplaceModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Crop to Marketplace</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleMarketplaceFormSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={marketplaceFormData.name}
                onChange={handleMarketplaceFormChange}
                required
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={marketplaceFormData.price}
                onChange={handleMarketplaceFormChange}
                required
                min="0"
                step="0.01"
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={marketplaceFormData.description}
                onChange={handleMarketplaceFormChange}
                required
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Contact</label>
              <input
                type="text"
                name="contact"
                value={marketplaceFormData.contact}
                onChange={handleMarketplaceFormChange}
                required
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Amount</label>
              <input
                type="text"
                name="amount"
                value={marketplaceFormData.amount}
                onChange={handleMarketplaceFormChange}
                required

                className="w-full border rounded px-2 py-1"
              />
            </div>

            <DialogFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={closeMarketplaceModal}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>


      {/* Your page content */}


      <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg mb-4 ml-4" onClick={openChatModal}>
        RAG Chat
      </Button>



      {/* Chat Modal */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="flex flex-col max-w-md h-[500px]">
          <DialogHeader>
            <DialogTitle>RAG Chatbot</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-auto px-4 py-2 border border-gray-300 rounded bg-white mb-2 flex flex-col space-y-3">
            {chatMessages.length === 0 && <p className="text-center text-gray-500 mt-10">Start the conversation!</p>}
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] p-2 rounded-lg ${msg.from === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 self-start"
                  }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex space-x-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleChatInputKeydown}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none"
              autoFocus
            />
            <Button onClick={handleSendMessage} disabled={!chatInput.trim()}>
              Send
            </Button>
          </div>


        </DialogContent>
      </Dialog>


    </>




  );
};

export default PlotDetails;
