import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { updateUser, getCurrentUserDetail } from "../../../services/userService/userService";
import { useToast } from "../../hooks/use-toast";

const PROFILE_FIELDS = [
  "userName",
  "email",
  "phoneNumber",
  "division",
  "district",
  "upazila",
  "village",
  "about",
];

const capitalizeLabel = (str: string) => (str === "userName" ? "Username" : str.charAt(0).toUpperCase() + str.slice(1));

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const navigate = useNavigate();
  const { toast } = useToast(); 

  // Fetch user details on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUserDetail();
        if (userData) {
          const mappedData = {
            userId: userData.userId, // keep for PUT
            userName: userData.userName || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            division: userData.division || "",
            district: userData.district || "",
            upazila: userData.upazila || "",
            village: userData.village || "",
            about: userData.about || "",
          };
          setUser(mappedData);
          setFormData(mappedData);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Only send editable fields + userId
      const updatedUser = await updateUser({
        userId: user.userId,
        userName: formData.userName,
        phoneNumber: formData.phoneNumber,
        division: formData.division,
        district: formData.district,
        upazila: formData.upazila,
        village: formData.village,
        about: formData.about,
      });

      setUser(updatedUser);
      setFormData(updatedUser);
      toast({
      title: "Updated",
      description: "Profile Updated Succesfully"
    });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    }
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4 pt-20">
        <div className="max-w-3xl w-full bg-card/95 backdrop-blur-sm border-2 border-border/50 rounded-lg shadow-xl p-8 text-foreground">
          <div className="flex flex-col items-center space-y-4 mb-8">
            <div className="p-4 rounded-full bg-gradient-to-br from-primary to-accent">
              <User className="h-14 w-14 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">{user.userName || "User"}</h1>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-6"
          >
            {PROFILE_FIELDS.map((key) => {
              const isEmail = key === "email";
              const isAbout = key === "about";

              return (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="mb-2 font-medium capitalize text-foreground">
                    {capitalizeLabel(key)}
                  </label>

                  {isAbout ? (
                    <textarea
                      id={key}
                      name={key}
                      rows={4}
                      value={formData[key] || ""}
                      onChange={handleChange}
                      className="resize-none rounded-md border border-border px-3 py-2 text-foreground bg-card/50 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tell us something about yourself..."
                    />
                  ) : (
                    <input
                      id={key}
                      name={key}
                      type="text"
                      value={formData[key] || ""}
                      onChange={handleChange}
                      className={`rounded-md border border-border px-3 py-2 text-foreground bg-card/50 focus:outline-none focus:ring-2 focus:ring-primary ${
                        isEmail ? "cursor-not-allowed bg-muted text-muted-foreground" : ""
                      }`}
                      readOnly={isEmail}
                    />
                  )}
                </div>
              );
            })}

            <div className="flex justify-center">
              <Button variant="harvest" size="lg" className="min-w-48">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
