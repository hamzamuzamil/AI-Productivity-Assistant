
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Send, Bot, Sparkles, User } from "lucide-react";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today?" },
    { id: 2, role: "user", content: "I need to prepare for tomorrow's meeting." },
    { id: 3, role: "assistant", content: "I can help with that! Would you like me to:\n\n1. Prepare an agenda for your meeting\n2. Set reminders for necessary preparation tasks\n3. Check your calendar for any conflicts\n\nJust let me know what would be most helpful." }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      role: "user",
      content: inputValue
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue("");
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: "assistant",
        content: "I'll help you prepare for your meeting. Let me check your calendar and create a preparation checklist for you. Based on the meeting topic, I suggest reviewing the quarterly analytics report and preparing a short summary of key points."
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <Card className="glass-morphism flex-1 flex flex-col overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <Bot className="text-ai-purple" />
            AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0 px-6">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4 pb-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`
                      flex gap-3 max-w-[80%] items-start 
                      ${message.role === "user" ? "flex-row-reverse" : ""}
                    `}>
                      <div className={`
                        flex-shrink-0 size-8 rounded-full flex items-center justify-center
                        ${message.role === "user" 
                          ? "bg-ai-blue/20" 
                          : "bg-ai-purple/20"
                        }
                      `}>
                        {message.role === "user" ? (
                          <User className="size-4 text-ai-blue" />
                        ) : (
                          <Sparkles className="size-4 text-ai-purple" />
                        )}
                      </div>
                      <div className={`
                        py-2 px-3 rounded-lg
                        ${message.role === "user" 
                          ? "bg-ai-blue/10 text-foreground" 
                          : "bg-ai-purple/10 text-foreground"
                        }
                      `}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="pt-4">
          <div className="flex w-full items-center gap-2 relative">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-transparent hover:bg-ai-purple/10 hover:text-ai-purple border-none"
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 py-6 bg-background/50 border-muted focus-visible:ring-ai-purple"
            />
            <Button 
              className="rounded-full absolute right-1" 
              size="icon"
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ""}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatPage;
