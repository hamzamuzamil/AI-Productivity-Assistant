
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Sparkles, Bot, ChevronRight } from "lucide-react";

const VoiceCommandPage = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [responses, setResponses] = useState([
    { id: 1, text: "Hello! I'm your AI voice assistant. You can activate me by clicking the microphone button." }
  ]);

  // Simulate voice recognition and response
  const toggleListening = () => {
    if (listening) {
      setListening(false);
      
      // If we were listening and have transcript, generate response
      if (transcript) {
        setTimeout(() => {
          let response = "";
          
          if (transcript.toLowerCase().includes("remind")) {
            response = "I've added a reminder for you. Is there anything else you'd like me to do?";
          } else if (transcript.toLowerCase().includes("meeting") || transcript.toLowerCase().includes("schedule")) {
            response = "I'll schedule that meeting for you. Would you like me to prepare an agenda as well?";
          } else if (transcript.toLowerCase().includes("email") || transcript.toLowerCase().includes("gmail")) {
            response = "You have 3 unread emails from Sarah, John, and the Marketing team. Would you like me to summarize them?";
          } else {
            response = "I heard you say: " + transcript + ". How can I help with that?";
          }
          
          setResponses(prev => [...prev, { id: Date.now(), text: response }]);
          setTranscript("");
        }, 1000);
      }
    } else {
      setListening(true);
      
      // Simulate speech recognition
      setTimeout(() => {
        const simulatedTranscripts = [
          "Remind me to call Sarah tomorrow at 3 PM",
          "Schedule a team meeting for Friday at 10 AM",
          "Check my emails and summarize them",
          "What's my focus time today?"
        ];
        
        setTranscript(simulatedTranscripts[Math.floor(Math.random() * simulatedTranscripts.length)]);
      }, 2000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Animation for waveform
  const waveVariants = {
    listening: (i: number) => ({
      scaleY: [0.5, 1.2, 0.5],
      transition: {
        repeat: Infinity,
        duration: 0.6,
        delay: i * 0.1,
      }
    }),
    idle: { scaleY: 0.5 }
  };

  // Example voice commands
  const exampleCommands = [
    "Remind me to call Sarah tomorrow",
    "Schedule a team meeting for Friday at 10 AM",
    "What's my focus time today?",
    "Check my calendar for tomorrow",
    "Summarize my unread emails",
    "Create a new task with high priority"
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Voice Command</h1>
          <p className="text-muted-foreground">Speak commands to control your assistant</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="glass-morphism h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="text-ai-purple" />
                Voice Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 h-[300px] mb-4">
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {responses.map((response) => (
                      <motion.div
                        key={response.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex gap-3 max-w-full items-start">
                          <div className="flex-shrink-0 size-8 rounded-full bg-ai-purple/20 flex items-center justify-center">
                            <Sparkles className="size-4 text-ai-purple" />
                          </div>
                          <div className="py-2 px-3 rounded-lg bg-ai-purple/10 text-foreground">
                            <p className="text-sm">{response.text}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Transcript while listening */}
                  {listening && transcript && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3 max-w-full items-start justify-end"
                    >
                      <div className="py-2 px-3 rounded-lg bg-ai-blue/10 text-foreground">
                        <p className="text-sm">{transcript}</p>
                      </div>
                      <div className="flex-shrink-0 size-8 rounded-full bg-ai-blue/20 flex items-center justify-center">
                        <Mic className="size-4 text-ai-blue" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Voice waveform visualization */}
              <div className="mx-auto">
                <div className="waveform">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="waveform-bar"
                      variants={waveVariants}
                      animate={listening ? "listening" : "idle"}
                      custom={i}
                      style={{ height: Math.random() * 20 + 10 }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                size="lg"
                variant={listening ? "destructive" : "default"}
                className={`rounded-full size-16 ${!listening ? "bg-ai-purple text-white hover:bg-ai-purple/90" : ""}`}
                onClick={toggleListening}
              >
                {listening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass-morphism h-full">
            <CardHeader>
              <CardTitle className="text-xl">Example Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {exampleCommands.map((command, index) => (
                  <motion.div
                    key={index}
                    className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex justify-between items-center cursor-pointer group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-2">
                      <Mic className="size-4 text-ai-purple" />
                      <span className="text-sm">{command}</span>
                    </div>
                    <ChevronRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity text-ai-purple" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="text-base font-medium">Voice Tips</h3>
                
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="text-sm text-muted-foreground">Speak clearly and naturally. The assistant understands natural language like "Remind me to..." or "Schedule a..."</p>
                </div>
                
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="text-sm text-muted-foreground">For best results, wait for the tone before speaking and specify dates and times clearly.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VoiceCommandPage;
