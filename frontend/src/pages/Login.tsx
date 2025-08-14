import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate instead of useRouter
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, Sprout, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { login } from "../../services/authService/auth-service"; // import your login service


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loginDetails = { email, password };
      const response = await login(loginDetails);
      console.log("Login successful:", response);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      }); 
      navigate("/");

      
    } catch (err) {
      setError("Login failed. Please check your credentials and try again!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Sign In",
      description: "OAuth integration coming soon!",
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden pt-16">
        {/* Rain Effect */}
        <div className="rain-container">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${1 + Math.random() * 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/20"></div>
          <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-accent/20"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-secondary/20"></div>
          <div className="absolute bottom-40 right-1/3 w-12 h-12 rounded-full bg-primary/20"></div>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 relative z-10">
          <Card className="w-full max-w-md shadow-xl border-2 border-border/50 bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-gradient-to-br from-primary to-accent">
                  <Sprout className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  Sign in to your farming dashboard
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <Button
                variant="outline"
                className="w-full border-2 hover:bg-muted/50 transition-colors"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <p className="text-sm text-red-600 font-medium text-center">{error}</p>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="farmer@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-2 focus:border-primary transition-colors"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 border-2 focus:border-primary transition-colors"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      disabled={loading}
                    />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold transition-all duration-200 transform hover:scale-[1.02]"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In to Dashboard"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
