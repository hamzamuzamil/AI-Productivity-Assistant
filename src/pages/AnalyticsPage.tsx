
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart2, Calendar, CheckCircle2, Clock, ArrowUp, ArrowDown, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AnalyticsPage = () => {
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

  // Dummy data for charts
  const focusHoursData = [
    { day: 'Mon', hours: 5.5 },
    { day: 'Tue', hours: 6.2 },
    { day: 'Wed', hours: 4.8 },
    { day: 'Thu', hours: 5.9 },
    { day: 'Fri', hours: 4.5 },
    { day: 'Sat', hours: 2.1 },
    { day: 'Sun', hours: 1.8 },
  ];

  const tasksData = [
    { day: 'Mon', completed: 7, added: 8 },
    { day: 'Tue', completed: 5, added: 4 },
    { day: 'Wed', completed: 6, added: 6 },
    { day: 'Thu', completed: 8, added: 5 },
    { day: 'Fri', completed: 4, added: 7 },
    { day: 'Sat', completed: 2, added: 3 },
    { day: 'Sun', completed: 3, added: 2 },
  ];

  const meetingTimeData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.0 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 4.0 },
    { day: 'Fri', hours: 2.0 },
    { day: 'Sat', hours: 0.0 },
    { day: 'Sun', hours: 0.5 },
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
          <h1 className="text-3xl font-bold text-gradient">Analytics</h1>
          <p className="text-muted-foreground">Track your productivity and activity</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">This Week</p>
          <p className="text-sm">Apr 9 - Apr 15, 2025</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Summary Cards */}
        <Card className="glass-morphism hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-ai-purple" />
              Focus Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">30.8 hrs</p>
                <div className="flex items-center text-ai-green text-sm">
                  <ArrowUp className="h-4 w-4" />
                  <span>12%</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">vs. last week (27.5 hrs)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-ai-green" />
              Tasks Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">35</p>
                <div className="flex items-center text-ai-red text-sm">
                  <ArrowDown className="h-4 w-4" />
                  <span>5%</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">vs. last week (37)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-ai-blue" />
              Meeting Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">13.5 hrs</p>
                <div className="flex items-center text-ai-green text-sm">
                  <ArrowDown className="h-4 w-4" />
                  <span>8%</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">vs. last week (14.7 hrs)</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Focus Hours Chart */}
        <motion.div variants={itemVariants}>
          <Card className="glass-morphism h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-ai-purple" />
                Focus Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={focusHoursData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="day" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#222", borderColor: "#444" }} 
                      itemStyle={{ color: "#fff" }}
                      formatter={(value) => [`${value} hrs`, 'Focus Time']}
                    />
                    <Bar dataKey="hours" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tasks Chart */}
        <motion.div variants={itemVariants}>
          <Card className="glass-morphism h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-ai-green" />
                Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tasksData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="day" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#222", borderColor: "#444" }} 
                      itemStyle={{ color: "#fff" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="#4caf50" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="added" 
                      stroke="#3d85f0" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-ai-orange" />
              Weekly Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-medium text-ai-purple mb-2">Productivity Patterns</h3>
                  <p className="text-sm text-muted-foreground">You're 20% more focused on Monday-Wednesday compared to the rest of the week. Consider scheduling important tasks during these days.</p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-medium text-ai-blue mb-2">Meeting Efficiency</h3>
                  <p className="text-sm text-muted-foreground">Your most productive meetings occur before noon. Afternoon meetings tend to run 15% longer than scheduled.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-medium text-ai-green mb-2">Task Completion</h3>
                  <p className="text-sm text-muted-foreground">You complete 70% of high-priority tasks within 24 hours of creation. Medium priority tasks average 3.5 days to completion.</p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-medium text-ai-orange mb-2">Time Management</h3>
                  <p className="text-sm text-muted-foreground">You spend an average of 2.5 hours per day in meetings. Consider blocking focus time in your calendar to improve productivity.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsPage;
