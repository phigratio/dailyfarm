import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Profile from "./pages/LoggedIn/profile";
import Dashboard from "./pages/LoggedIn/dashboard";
import ManageFarms from "./pages/LoggedIn/manageFarm";
import ManagePlots from "./pages/LoggedIn/managePlot";
import PlotDetails from "./pages/LoggedIn/plotDetails";
import Plants from "./pages/LoggedIn/plants";
import Animal from "./pages/LoggedIn/animals";
import Fishes from "./pages/LoggedIn/fishesh";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manageFarm" element={<ManageFarms />} />
          <Route path="/manage-plots/:farmId" element={<ManagePlots />} />
          <Route path="/plot-details/:plotId/:farmId" element={<PlotDetails />} />
          <Route path="/add-plants/:plotId/:farmId" element={<Plants />} />
          <Route path="/add-fishes/:plotId/:farmId" element={<Fishes />} />
          <Route path="/add-animals/:plotId/:farmId" element={<Animal />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
