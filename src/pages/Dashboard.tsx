
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { CalendarClock, CheckCircle2, Clock, Lightbulb, Sparkles } from "lucide-react";

const Dashboard = () => {
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

  // Get current time for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Mock data for dashboard
  const nextMeeting = {
    title: "Team Standup",
    time: "10:30 AM",
    remaining: "25 minutes"
  };

  const focusHours = {
    current: 4.5,
    target: 6,
    percentage: 75
  };

  const pendingTasks = [
    { id: 1, title: "Prepare presentation", priority: "High", dueTime: "Today" },
    { id: 2, title: "Review analytics report", priority: "Medium", dueTime: "Tomorrow" },
    { id: 3, title: "Send client email", priority: "Urgent", dueTime: "Today" }
  ];

  const aiSuggestions = [
    "Schedule deep work session from 2-4 PM",
    "Reply to Sarah's email about the project",
    "Take a short break - you've been working for 2 hours"
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Greeting Section */}
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">{getGreeting()}, Alex</h1>
          <p className="text-muted-foreground">Let's be productive today!</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">Tuesday, April 15</p>
          <p className="text-xl font-semibold">9:45 AM</p>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Next Meeting Card */}
        <Card className="glass-morphism hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-ai-blue" />
              Next Meeting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-lg font-semibold">{nextMeeting.title}</p>
              <p className="text-muted-foreground text-sm">{nextMeeting.time}</p>
              <div className="flex items-center gap-1 text-ai-blue text-sm">
                <Clock className="h-3 w-3" />
                <span>Starting in {nextMeeting.remaining}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Focus Hours Card */}
        <Card className="glass-morphism hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-ai-purple" />
              Focus Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">{focusHours.current} / {focusHours.target} hours</p>
                <span className="text-ai-purple text-sm font-medium">{focusHours.percentage}%</span>
              </div>
              <Progress value={focusHours.percentage} className="h-2 [&>div]:bg-ai-purple" />
              <p className="text-muted-foreground text-xs">Daily goal progress</p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks Card */}
        <Card className="glass-morphism hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-ai-green" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-lg font-semibold">3 Pending Tasks</p>
              <div className="flex gap-2">
                <span className="text-xs bg-ai-red/20 px-2 py-0.5 rounded-full text-ai-red">1 Urgent</span>
                <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded-full text-amber-500">1 High</span>
                <span className="text-xs bg-ai-blue/20 px-2 py-0.5 rounded-full text-ai-blue">1 Medium</span>
              </div>
              <p className="text-muted-foreground text-sm">Next: <span className="text-foreground">Prepare presentation</span></p>
            </div>
          </CardContent>
        </Card>

        {/* Smart Insights Card */}
        <Card className="glass-morphism hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-ai-orange" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">Most productive time:</p>
              <p className="text-lg font-semibold">10:00 AM - 12:00 PM</p>
              <div className="flex items-center gap-1 text-ai-orange text-sm">
                <span>Schedule important tasks during this window</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tasks and Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Tasks List */}
        <motion.div variants={itemVariants}>
          <Card className="glass-morphism h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-ai-green" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="size-5 rounded-full border-2 flex-shrink-0 cursor-pointer hover:bg-white/20 transition-colors" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{task.title}</p>
                      <p className="text-xs text-muted-foreground">Due {task.dueTime}</p>
                    </div>
                    <div className={`
                      text-xs rounded-full px-2 py-0.5 font-medium
                      ${task.priority === 'Urgent' ? 'bg-ai-red/20 text-ai-red' : 
                        task.priority === 'High' ? 'bg-amber-500/20 text-amber-500' : 
                        'bg-ai-blue/20 text-ai-blue'}
                    `}>
                      {task.priority}
                    </div>
                  </div>
                ))}
                <button className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors mt-2">
                  View all tasks →
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Suggestions */}
        <motion.div variants={itemVariants}>
          <Card className="glass-morphism h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-ai-orange" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex gap-3 items-start">
                      <div className="size-8 rounded-full bg-ai-orange/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="size-4 text-ai-orange" />
                      </div>
                      <p className="text-sm">{suggestion}</p>
                    </div>
                  </div>
                ))}
                <div className="p-3 rounded-lg bg-ai-purple/10 hover:bg-ai-purple/20 transition-colors cursor-pointer">
                  <div className="flex gap-3 items-center justify-center text-ai-purple">
                    <span className="text-sm font-medium">Ask AI for more suggestions</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
