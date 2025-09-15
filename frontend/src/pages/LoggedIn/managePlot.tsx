import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { privateAxios } from "../../../services/userService/userService";
import { useParams, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip } from "@/components/ui/tooltip"; // Optional tooltip component import
import { InfoIcon } from "lucide-react"; // Import an info icon from your icon library


interface Plot {
  plotId: string;
  plotNumber: string;
  area: number | string;
  status?: string;
  soilPh?: number | string;
  organicMatter?: number | string;
  nitrate?: number | string;
  phosphorus?: number | string;
  potassium?: number | string;
  notes?: string;
  plotType?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Farm {
  farmId: string;
  farmName: string;
  ownerId: string;
  farmType: string;
  totalArea: number | string;
  cultivatedArea: number | string;
  division: string;
  district: string;
  upazila: string;
  village?: string;
  latitude?: number | string;
  longitude?: number | string;
  soilType?: string;
  irrigationType?: string;
  isActive: boolean;
  isOrganic?: boolean;
}

const plotTypeOptionsMap: Record<string, string[]> = {
  SMALL_GARDEN: ["Vegetable Bed", "Herb Patch", "Fruit Patch", "Flower Bed"],
  LARGE_AREA: ["Crop Field", "Orchard", "Pasture"],
  ROOFTOP: ["Container Bed", "Raised Bed", "Hydroponic System"],
  GREENHOUSE: ["Seedling Tray", "Vegetable Bed", "Hydroponic Channel"],
  CROP: ["Cereal Field", "Vegetable Field", "Legume Field"],
  LIVESTOCK: ["Grazing Paddock", "Exercise Yard", "Shelter Area"],
  POULTRY: ["Chicken Pen", "Free-Range Run"],
  FISHERY: ["Fish Pond", "Hatchery Tank"],
  DAIRY: ["Pasture Plot", "Feed Crop Plot"],
  MIXED: ["Crop Field", "Pasture", "Orchard", "Pen"],
  ORGANIC: ["Organic Vegetable Bed", "Cover Crop", "Orchard"],
  HYDROPONIC: ["NFT Channel", "Drip Tray", "Vertical Bed"],
};

const ManagePlots = () => {
  const { farmId } = useParams<{ farmId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [farmDetails, setFarmDetails] = useState<Farm | null>(null);
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loadingFarm, setLoadingFarm] = useState(false);
  const [loadingPlots, setLoadingPlots] = useState(false);
  const [availableArea, setAvailableArea] = useState(0);

  // Modal state and fields
  const [isAddPlotOpen, setAddPlotOpen] = useState(false);
  const [newPlotNumber, setNewPlotNumber] = useState("");
  const [newPlotArea, setNewPlotArea] = useState<number | "">("");
  const [newPlotType, setNewPlotType] = useState<string | undefined>(undefined);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch farm details function
  const fetchFarmDetails = async () => {
    if (!farmId) return;
    setLoadingFarm(true);
    try {
      const response = await privateAxios.get(`/farms/${farmId}`);
      setFarmDetails(response.data);
      setAvailableArea(response.data.totalArea - response.data.cultivatedArea);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load farm details.",
        variant: "destructive",
      });
      setFarmDetails(null);
    } finally {
      setLoadingFarm(false);
    }
  };

  // Fetch plots function
  const fetchPlots = async () => {
    if (!farmId) return;
    setLoadingPlots(true);
    try {
      const response = await privateAxios.get(`/farms/plots/farm/${farmId}`);
      setPlots(response.data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load plots.",
        variant: "destructive",
      });
      setPlots([]);
    } finally {
      setLoadingPlots(false);
    }
  };

  useEffect(() => {
    fetchFarmDetails();
  }, [farmId, toast]);

  useEffect(() => {
    fetchPlots();
  }, [farmId, toast]);

  const handleAddPlot = () => {
    setAddPlotOpen(true);
  };

  const handlePlotAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value === "" ? "" : Number(e.target.value);
    if (typeof value === "number" && value > availableArea) {
      value = availableArea;
      toast({
        title: "Invalid Area",
        description: `Plot area cannot exceed available farm area (${availableArea} acres).`,
        variant: "destructive",
      });
    }
    setNewPlotArea(value);
  };

  const isPlotAreaValid =
    typeof newPlotArea === "number" && newPlotArea > 0 && newPlotArea <= availableArea;

  // AI info handler for Plot Type
  const plotTypeInfoMap: Record<string, string> = {
    // SMALL_GARDEN types
    "Vegetable Bed": "A vegetable bed is a designated area for growing vegetables in a small garden.",
    "Herb Patch": "An herb patch is a plot for cultivating culinary or medicinal herbs.",
    "Fruit Patch": "A fruit patch is a garden section where fruit-bearing plants are grown.",
    "Flower Bed": "A flower bed is a garden area dedicated to ornamental flowers.",

    // LARGE_AREA types
    "Crop Field": "Crop fields are large areas cultivated with cereal, vegetables, or other crops.",
    "Orchard": "An orchard is a large area planted with fruit or nut trees.",
    "Pasture": "A pasture is land covered with grass used for grazing livestock.",

    // ROOFTOP types
    "Container Bed": "A container bed is a garden bed made from containers, ideal for rooftops.",
    "Raised Bed": "Raised beds are elevated planting areas for better soil and drainage.",
    "Hydroponic System": "A hydroponic system is soil-less plant growing using nutrient solutions.",

    // GREENHOUSE types
    "Seedling Tray": "Seedling trays are compartments for growing young plants in protection.",
    "Hydroponic Channel": "Hydroponic channels support flowing water culture for plants indoors.",

    // CROP types
    "Cereal Field": "A cereal field is grown with grains like wheat, corn, or barley.",
    "Vegetable Field": "Vegetable fields are large-scale outdoor plantings of vegetables.",
    "Legume Field": "Fields cultivated with legumes like beans and peas for nitrogen fixation.",

    // LIVESTOCK types
    "Grazing Paddock": "Enclosed area where livestock graze on grass.",
    "Exercise Yard": "Outdoor area where animals exercise freely.",
    "Shelter Area": "Protected space where livestock take refuge.",

    // POULTRY types
    "Chicken Pen": "Enclosure where chickens are raised safely.",
    "Free-Range Run": "Open area allowing free movement for poultry.",

    // FISHERY types
    "Fish Pond": "Man-made or natural pond for raising fish.",
    "Hatchery Tank": "Controlled tanks for breeding and hatching fish.",

    // DAIRY types
    "Pasture Plot": "Dairy grazing area cultivated for feed.",
    "Feed Crop Plot": "Plots growing fodder crops for dairy animals.",

    // MIXED types
    "Pen": "Area enclosed for keeping or feeding animals.",

    // ORGANIC types
    "Organic Vegetable Bed": "Organic plots cultivated without synthetic chemicals.",
    "Cover Crop": "Plants grown to protect and nourish soil.",
    "Orchard": "Organic orchard for fruits grown with organic methods.",

    // HYDROPONIC types
    "NFT Channel": "Nutrient Film Technique hydroponic channel system.",
    "Drip Tray": "Tray-based hydroponic drip irrigation setup.",
    "Vertical Bed": "Vertical farming bed maximizing space usage."
  };

  const handleShowPlotTypeInfo = () => {
    if (!newPlotType) {
      toast({
        title: "Info",
        description: "Please select a plot type first.",
        variant: "default",
      });
      return;
    }
    const message = plotTypeInfoMap[newPlotType];
    if (message) {
      toast({
        title: `About "${newPlotType}"`,
        description: message,
        variant: "default",
      });
    } else {
      toast({
        title: "Info",
        description: "No description available for this plot type.",
        variant: "default",
      });
    }
  };



  const handleSubmitNewPlot = async () => {
    if (!farmId) return;
    if (!newPlotNumber || !isPlotAreaValid || !newPlotType) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields correctly.",
        variant: "destructive",
      });
      return;
    }
    setSubmitLoading(true);
    try {
      await privateAxios.post("/farms/plots", {
        plotNumber: newPlotNumber,
        area: newPlotArea,
        plotType: newPlotType,
        farm: { farmId },
        status: "VACANT",
        isActive: true,
      });

      const updatedCultivatedArea =
        (typeof farmDetails?.cultivatedArea === "number"
          ? farmDetails.cultivatedArea
          : Number(farmDetails?.cultivatedArea || 0)) + Number(newPlotArea);

      // Call farm update API to update cultivatedArea
      await privateAxios.put(`/farms/${farmId}`, {
        ...farmDetails,
        cultivatedArea: updatedCultivatedArea,
      });

      // Refresh plots list and farm details after adding a plot
      await Promise.all([fetchPlots(), fetchFarmDetails()]);

      // Reset modal fields and close
      setNewPlotNumber("");
      setNewPlotArea("");
      setNewPlotType(undefined);
      setAddPlotOpen(false);
    } catch {
      toast({
        title: "Error",
        description: "Failed to add plot.",
        variant: "destructive",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loadingFarm) {
    return <p className="text-center mt-10">Loading farm details...</p>;
  }

  if (!farmDetails) {
    return <p className="text-center mt-10 text-destructive">Farm not found.</p>;
  }

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

        <div className="max-w-6xl mx-auto py-8 px-4 space-y-6 relative z-10">
          {/* Farm Details */}
          <Card className="shadow-md border border-border/50 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                {farmDetails.farmName}
              </CardTitle>
              <Separator className="my-2" />
            </CardHeader>
            <CardContent className="text-foreground space-y-1">
              <p>Type: {farmDetails.farmType.replace("_", " ")}</p>
              <p>
                Location: {farmDetails.village ? `${farmDetails.village}, ` : ""}
                {farmDetails.upazila}, {farmDetails.district}, {farmDetails.division}
              </p>
              <p>Area: {farmDetails.totalArea} acres</p>
              <p>Cultivated Area: {farmDetails.cultivatedArea} acres</p>
              <p>Latitude: {farmDetails.latitude}</p>
              <p>Longitude: {farmDetails.longitude}</p>
              <p>Soil Type: {farmDetails.soilType}</p>
              <p>Irrigation Type: {farmDetails.irrigationType}</p>
              <p
                className={`font-semibold ${farmDetails.isActive ? "text-green-600" : "text-red-600"
                  }`}
              >
                {farmDetails.isActive ? "Active" : "Inactive"}
              </p>
              <p>Organic: {farmDetails.isOrganic ? "Yes" : "No"}</p>
            </CardContent>
          </Card>

          {/* Plots List */}
          <Card className="shadow-xl border-2 border-border/50 bg-card/95 backdrop-blur-sm">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold text-foreground">Plots</CardTitle>
              <Button onClick={handleAddPlot}>Add Plot</Button>
            </CardHeader>
            <Separator />
            <CardContent>
              {loadingPlots ? (
                <p className="text-center text-foreground">Loading plots...</p>
              ) : plots.length === 0 ? (
                <p className="text-center text-muted-foreground">No plots found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plots.map((plot) => (
                    <Card
                      key={plot.plotId}
                      className="border border-border/50 bg-background shadow-sm flex flex-col justify-between"
                    >
                      <CardContent>
                        <h3 className="text-xl font-semibold text-foreground">
                          Plot {plot.plotNumber}
                        </h3>
                        <p className="text-muted-foreground mt-1">Area: {plot.area} acres</p>
                        <p className="text-muted-foreground mt-1">
                          Status: {plot.status ?? "Unknown"}
                        </p>
                        {plot.soilPh !== undefined && (
                          <p className="text-muted-foreground mt-1">Soil pH: {plot.soilPh}</p>
                        )}
                        {plot.organicMatter !== undefined && (
                          <p className="text-muted-foreground mt-1">
                            Organic Matter: {plot.organicMatter}
                          </p>
                        )}
                        {plot.nitrate !== undefined && (
                          <p className="text-muted-foreground mt-1">Nitrate: {plot.nitrate}</p>
                        )}
                        {plot.phosphorus !== undefined && (
                          <p className="text-muted-foreground mt-1">
                            Phosphorus: {plot.phosphorus}
                          </p>
                        )}
                        {plot.potassium !== undefined && (
                          <p className="text-muted-foreground mt-1">Potassium: {plot.potassium}</p>
                        )}
                        {plot.plotType && (
                          <p className="text-muted-foreground mt-1">Plot Type: {plot.plotType}</p>
                        )}
                        {plot.notes && (
                          <p className="text-muted-foreground mt-1">Notes: {plot.notes}</p>
                        )}
                        <p
                          className={`mt-2 font-semibold ${plot.isActive ? "text-green-600" : "text-red-600"
                            }`}
                        >
                          {plot.isActive ? "Active" : "Inactive"}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          size="sm"
                          onClick={() => alert(`Details for plot ${plot.plotNumber}`)}
                        >
                          Details
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => navigate(`/plot-details/${plot.plotId}/${farmId}`)}

                        >
                          Manage Plot
                        </Button>
                      </CardFooter>

                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Plot Type select with AI info icon */}
          <Dialog open={isAddPlotOpen} onOpenChange={setAddPlotOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Plot</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="plotNumber"
                    className="block mb-1 font-medium text-sm text-gray-700"
                  >
                    Plot Number
                  </label>
                  <Input
                    id="plotNumber"
                    value={newPlotNumber}
                    onChange={(e) => setNewPlotNumber(e.target.value)}
                    placeholder="Enter plot number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="area"
                    className="block mb-1 font-medium text-sm text-gray-700"
                  >
                    Area (acres)
                  </label>
                  <Input
                    type="number"
                    id="area"
                    value={newPlotArea}
                    onChange={handlePlotAreaChange}
                    placeholder={`Max: ${availableArea} acres`}
                    min={0}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <label
                      htmlFor="plotType"
                      className="block mb-1 font-medium text-sm text-gray-700"
                    >
                      Plot Type
                    </label>
                    <Select
                      value={newPlotType}
                      onValueChange={(value) => setNewPlotType(value)}
                    >
                      <SelectTrigger id="plotType" className="w-full">
                        <SelectValue placeholder="Select plot type" />
                      </SelectTrigger>
                      <SelectContent>
                        {(plotTypeOptionsMap[farmDetails?.farmType ?? ""] ?? []).map(
                          (type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <Tooltip content="Get AI details about selected plot type">
                    <button
                      type="button"
                      onClick={() => {
                        if (!newPlotType) {
                          toast({
                            title: "Info",
                            description: "Please select a plot type first.",
                            variant: "default",
                          });
                          return;
                        }
                        handleShowPlotTypeInfo();

                      }}
                      className="p-1 rounded-full hover:bg-muted transition"
                      aria-label="Plot type info"
                    >
                      <InfoIcon className="w-5 h-5 text-primary" />
                    </button>
                  </Tooltip>
                </div>
              </div>

              <DialogFooter>
                <Button
                  disabled={
                    !newPlotNumber || !isPlotAreaValid || !newPlotType || submitLoading
                  }
                  onClick={handleSubmitNewPlot}
                >
                  {submitLoading ? "Adding..." : "Add Plot"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default ManagePlots;
