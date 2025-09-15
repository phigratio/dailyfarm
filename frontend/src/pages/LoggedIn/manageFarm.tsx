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
import { useNavigate } from "react-router-dom";

interface Farm {
  farmId: string;
  farmName: string;
  farmType: string;
  division: string;
  district: string;
  upazila: string;
  village?: string;
  totalArea?: number | string;
  isActive: boolean;
}

const ManageFarms = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFarms = async () => {
      setLoading(true);
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          toast({
            title: "Error",
            description: "User ID not found in local storage.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        // Parse stored user to remove extra quotes if any
        let ownerId: string;
        try {
          ownerId = JSON.parse(storedUser);
        } catch {
          ownerId = storedUser; // fallback if not JSON stringified
        }
        if (!ownerId) {
          toast({
            title: "Error",
            description: "User ID is empty.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const response = await privateAxios.get(`/farms/owner/${ownerId}`);
        console.log("Raw response data:", response.data);
        // Axios should parse JSON automatically if backend and Axios config are correct

        const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;

        if (Array.isArray(data)) {
          setFarms(data);
        } else {
          toast({
            title: "Error",
            description: `Unexpected response format: expected an array, got ${typeof data}`,
            variant: "destructive",
          });
          setFarms([]);
        }

      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to load farms.",
          variant: "destructive",
        });
        setFarms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, [toast]);

  useEffect(() => {
    console.log("Farms updated:", farms);
  }, [farms]);

  const handleManagePlot = (farmId: string) => {
    navigate(`/manage-plots/${farmId}`);
  };

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
          <Card className="shadow-xl border-2 border-border/50 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-foreground">
                Manage Farms
              </CardTitle>
              <Separator className="my-2" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center text-foreground">Loading farms...</p>
              ) : !Array.isArray(farms) || farms.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No farms found or invalid data.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {farms.map((farm) => (
                    <Card
                      key={farm.farmId}
                      className="border border-border/50 bg-background shadow-sm flex flex-col justify-between"
                    >
                      <CardContent>
                        <h3 className="text-xl font-semibold text-foreground">
                          {farm.farmName}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          Type: {farm.farmType.replace("_", " ")}
                        </p>
                        <p className="text-muted-foreground mt-1">
                          Location:{" "}
                          {farm.village ? `${farm.village}, ` : ""}
                          {farm.upazila}, {farm.district}, {farm.division}
                        </p>
                        {farm.totalArea && (
                          <p className="text-muted-foreground mt-1">
                            Area: {farm.totalArea} acres
                          </p>
                        )}
                        <p
                          className={`mt-2 font-semibold ${farm.isActive ? "text-green-600" : "text-red-600"
                            }`}
                        >
                          {farm.isActive ? "Active" : "Inactive"}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleManagePlot(farm.farmId)}
                        >
                          Manage Plots
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ManageFarms;
