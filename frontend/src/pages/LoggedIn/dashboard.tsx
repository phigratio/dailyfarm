import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { Sprout, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateGeminiContent, createFarm } from "../../../services/userService/userService";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [farmName, setFarmName] = useState("");
  const [farmType, setFarmType] = useState("SMALL_GARDEN");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [village, setVillage] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      setUserName(JSON.parse(storedUserId));
    }
  }, []);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateFarm = async (e) => {
    e.preventDefault();

    if (
      !farmName.trim() ||
      !division.trim() ||
      !district.trim() ||
      !upazila.trim() ||
      !area.trim()
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const textPrompt = `For the location in Bangladesh:
Division: ${division}
District: ${district}
Upazila: ${upazila}
Village: ${village}

Provide only the following information. Do not add any extra words, sentences, or explanations. The output must be in the exact format shown below, with no deviation.

Latitude: [latitude]

Longitude: [longitude]

Soil Type: [one option from CLAY, LOAMY, SANDY, SILT, CHALKY, PEAT, SALINE, BLACK_SOIL, RED_SOIL, ALLUVIAL]

Irrigation Type: [one option from RAIN_FED, TUBE_WELL, SURFACE_WATER, SPRINKLER, DRIP, FLOOD, CANAL, SUBSURFACE, MANUAL]`;

    try {
      // Get AI-generated data
      const geminiResponse = await generateGeminiContent(textPrompt);

      const lines = geminiResponse.split('\n').map(line => line.trim());
      const latitudeLine = lines.find(line => line.startsWith('Latitude:'));
      const longitudeLine = lines.find(line => line.startsWith('Longitude:'));
      const soilTypeLine = lines.find(line => line.startsWith('Soil Type:'));
      const irrigationTypeLine = lines.find(line => line.startsWith('Irrigation Type:'));

      const lat = latitudeLine ? latitudeLine.split(':')[1].trim() : '';
      const lon = longitudeLine ? longitudeLine.split(':')[1].trim() : '';
      const soil = soilTypeLine ? soilTypeLine.split(':')[1].trim() : '';
      const irrigation = irrigationTypeLine ? irrigationTypeLine.split(':')[1].trim() : '';

      const ownerId = localStorage.getItem("user"); // Retrieve the ownerId from local storage
      if (!ownerId) {
        throw new Error("User not authenticated.");
      }

      // Construct the payload to match the Farm entity
      const farmPayload = {
        farmName: farmName,
        ownerId: JSON.parse(ownerId), // Parse the stored user ID
        farmType: farmType,
        totalArea: area, // Matches totalArea in the entity, but as a string. Spring should convert this.
        cultivatedArea: 0, // Assuming cultivatedArea is the same as totalArea for now
        division: division,
        district: district,
        upazila: upazila,
        village: village,
        latitude: lat,
        longitude: lon,
        soilType: soil,
        irrigationType: irrigation,
        isActive: true,
        isOrganic: false
      };

      console.log("Payload to be sent:", farmPayload);

      //Make the POST request to your backend
      await createFarm(farmPayload); // If throws, goes to catch

      toast({
        title: "Farm Created",
        description: `Farm "${farmName}" has been successfully created.`,
      });

      closeModal();
    } catch (error) {
      console.error("Failed to create farm:", error);
      toast({
        title: "Error",
        description: "Failed to create farm. Please check your data and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const FARM_TYPE_OPTIONS = [
    "SMALL_GARDEN",
    "LARGE_AREA",
    "ROOFTOP",
    "GREENHOUSE",
    "CROP",
    "LIVESTOCK",
    "POULTRY",
    "FISHERY",
    "DAIRY",
    "MIXED",
    "ORGANIC",
    "HYDROPONIC",
  ];

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

        <div className="flex flex-col items-center justify-center max-w-5xl mx-auto py-8 px-4 space-y-8 relative z-10">
          <Card className="w-full max-w-3xl shadow-xl border-2 border-border/50 bg-card/95 backdrop-blur-sm">
            <CardHeader className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-gradient-to-br from-primary to-accent">
                  <Sprout className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground">Welcome back!!</CardTitle>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-lg text-center">
                This is your farming dashboard where you can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>View and manage your farms and plots</li>
                <li>Get AI-based crop recommendations for your lands</li>
                <li>Track your crops and harvest timelines</li>
                <li>Manage your farming activities and animal husbandry</li>
              </ul>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                onClick={() => navigate("/manageFarm")}
                className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:from-primary/90 hover:to-accent/90 transition-transform hover:scale-[1.05]"
              >
                Manage Farms
              </Button>
              <Button
                className="px-8 py-3 bg-gradient-to-r from-secondary to-accent text-primary-foreground font-semibold hover:from-secondary/90 hover:to-accent/90 transition-transform hover:scale-[1.05] flex items-center space-x-2"
                onClick={openModal}
              >
                <Plus className="h-5 w-5" />
                <span>Create Farm</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-card rounded-lg max-w-md w-full p-6 relative shadow-lg border border-border/50 backdrop-blur-sm transform transition-all duration-300 ease-out scale-100 opacity-100">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 text-foreground">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-primary border-r-primary border-b-primary"></div>
                <p className="mt-4 text-lg font-semibold text-center">Creating your farm...</p>
                <p className="text-sm text-muted-foreground text-center">This may take a few moments.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Create New Farm</h2>
                <form onSubmit={handleCreateFarm} className="space-y-4 text-foreground">
                  <div>
                    <label htmlFor="farmName" className="block font-semibold mb-1">
                      Farm Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="farmName"
                      type="text"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      className="w-full rounded border border-border/50 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter farm name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="farmType" className="block font-semibold mb-1">
                      Farm Type
                    </label>
                    <select
                      id="farmType"
                      value={farmType}
                      onChange={(e) => setFarmType(e.target.value)}
                      className="w-full rounded border border-border/50 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {FARM_TYPE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="division" className="block font-semibold mb-1">
                      Division <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="division"
                      type="text"
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      className="w-full rounded border border-border/50 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter division"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="district" className="block font-semibold mb-1">
                      District <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="district"
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full rounded border border-border/50 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter district"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="upazila" className="block font-semibold mb-1">
                      Upazila <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="upazila"
                      type="text"
                      value={upazila}
                      onChange={(e) => setUpazila(e.target.value)}
                      className="w-full rounded border border-border/50 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter upazila"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="village" className="block font-semibold mb-1">
                      Village
                    </label>
                    <input
                      id="village"
                      type="text"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full rounded border border-border/50 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter village"
                    />
                  </div>

                  <div>
                    <label htmlFor="area" className="block font-semibold mb-1">
                      Area (acres)<span className="text-destructive">*</span>
                    </label>
                    <input
                      id="area"
                      type="number"
                      min="0"
                      step="0.01"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full rounded border border-border/50 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="E.g., 2.5"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <Button variant="outline" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      Create Farm
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;