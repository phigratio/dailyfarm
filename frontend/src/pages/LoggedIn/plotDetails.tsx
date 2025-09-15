import { useEffect, useState } from "react";
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
  const [labValues, setLabValues] = useState({
    soilPh: "",
    organicMatter: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    waterPh: "",
  });

  useEffect(() => {
  const fetchData = async () => {
    if (!plotId) return;
    setLoading(true);
    try {
      // 1. Fetch Plot details
      const plotResponse = await privateAxios.get(`/farms/plots/${plotId}`);
      setPlot(plotResponse.data);

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
          <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
            Back
          </Button>

          <Card className="shadow-md border border-border/50 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Plot Details - {plot.plotNumber}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-3">
              <p><strong>Area:</strong> {plot.area} acres</p>
              <p><strong>Status:</strong> {plot.status ?? "Unknown"}</p>
              <p><strong>Soil pH:</strong> {plot.soilPh ?? "N/A"}</p>
              <p><strong>Organic Matter:</strong> {plot.organicMatter ?? "N/A"}</p>
              <p><strong>Nitrate:</strong> {plot.nitrogen ?? "N/A"}</p>
              <p><strong>Phosphorus:</strong> {plot.phosphorus ?? "N/A"}</p>
              <p><strong>Potassium:</strong> {plot.potassium ?? "N/A"}</p>
              <p><strong>Plot Type:</strong> {plot.plotType ?? "N/A"}</p>
              <p><strong>Notes:</strong> {plot.notes ?? "None"}</p>
              <p className={`font-semibold ${plot.isActive ? "text-green-600" : "text-red-600"}`}>
                {plot.isActive ? "Active" : "Inactive"}
              </p>

              {shouldShowLabTestMessage(plot) && (
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

              <Button
                onClick={() => navigate(`/add-${getAddItems(plot.plotType)}/${plot.plotId}/${farmId}`)}
                className="mt-4 px-6 py-3 rounded-lg shadow-md bg-primary text-white hover:bg-primary-dark transition-colors duration-300 font-semibold"
              >
                {getAddButtonLabel(plot.plotType)}
              </Button>
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
      </div>
    </>
  );
};

export default PlotDetails;
