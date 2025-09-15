import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Send, Bot } from "lucide-react";
import {
  generateGeminiContent,
  validateFarmInput,
  extractFarmDetails,
} from "../../../services/userService/userService";

interface Message {
  from: "user" | "bot";
  text: string;
}

const CreateFarm = () => {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! Let's gather info about your farm. What is your farm name?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendToAi = async (userInput: string) => {
    setLoading(true);
    try {
      const aiResponse = await generateGeminiContent(userInput);
      setLoading(false);
      return aiResponse;
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      });
      return "Sorry, an error occurred. Please try again.";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { from: "user", text: input.trim() };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const validationResult = await validateFarmInput(userMessage.text);
      if (validationResult !== "VALID") {
        const botMessage: Message = { from: "bot", text: validationResult };
        setMessages((msgs) => [...msgs, botMessage]);
        setLoading(false);
        return;
      }
    } catch {
      setLoading(false);
      toast({
        title: "Validation Error",
        description: "Failed to validate input. Please try again.",
        variant: "destructive",
      });
      return;
    }

    let farmData;
    try {
      farmData = await extractFarmDetails(userMessage.text);
      console.log("Extracted Farm Data:", farmData);
      // Optionally show or use farmData here
    } catch {
      setLoading(false);
      toast({
        title: "Extraction Error",
        description: "Failed to extract farm details. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const botReply = await sendToAi(userMessage.text);
    const botReplyText = typeof botReply === "string" ? botReply : JSON.stringify(botReply);

    const botMessage: Message = { from: "bot", text: botReplyText };
    setMessages((msgs) => [...msgs, botMessage]);
    setLoading(false);

    if (botReplyText.toLowerCase().includes("farm created")) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background pt-24 relative overflow-hidden flex flex-col items-center px-4">
        <Card className="w-full max-w-xl shadow-xl border-2 border-border/50 bg-card/95 backdrop-blur-sm flex flex-col">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-foreground">Create Your Farm</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-[60vh] overflow-y-auto space-y-4 px-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    msg.from === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {msg.from === "bot" && <Bot className="w-5 h-5" />}
                    <p style={{ whiteSpace: "pre-wrap" }}>{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </CardContent>
          <div className="border-t border-border p-4 flex items-center space-x-3">
            <Input
              type="text"
              placeholder={loading ? "Waiting for response..." : "Type your reply..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="flex-grow"
            />
            <Button onClick={handleSend} disabled={loading || !input.trim()}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CreateFarm;
