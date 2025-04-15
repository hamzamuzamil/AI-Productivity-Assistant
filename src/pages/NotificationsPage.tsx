
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Bell, Calendar, CheckCircle2, Info, Mail, Settings } from "lucide-react";

const NotificationsPage = () => {
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

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "Meeting Reminder",
      message: "Team standup starts in 30 minutes",
      time: "30 minutes ago",
      type: "calendar",
      read: false
    },
    {
      id: 2,
      title: "New Email",
      message: "Sarah sent you an email about the project timeline",
      time: "1 hour ago",
      type: "email",
      read: false
    },
    {
      id: 3,
      title: "Task Completed",
      message: "You've completed 3 tasks today!",
      time: "3 hours ago",
      type: "task",
      read: true
    },
    {
      id: 4,
      title: "AI Suggestion",
      message: "You're most productive in the mornings. Consider scheduling important tasks before noon.",
      time: "5 hours ago",
      type: "ai",
      read: true
    },
    {
      id: 5,
      title: "Calendar Update",
      message: "Your meeting with Client XYZ has been rescheduled to tomorrow at 2 PM",
      time: "Yesterday",
      type: "calendar",
      read: true
    }
  ];

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "calendar":
        return <Calendar className="text-ai-blue" />;
      case "email":
        return <Mail className="text-ai-purple" />;
      case "task":
        return <CheckCircle2 className="text-ai-green" />;
      case "ai":
        return <Info className="text-ai-orange" />;
      default:
        return <Bell className="text-ai-blue" />;
    }
  };

  // Get background color based on notification type
  const getNotificationBg = (type: string) => {
    switch (type) {
      case "calendar":
        return "bg-ai-blue/10";
      case "email":
        return "bg-ai-purple/10";
      case "task":
        return "bg-ai-green/10";
      case "ai":
        return "bg-ai-orange/10";
      default:
        return "bg-gray-500/10";
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with important alerts</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card className="glass-morphism">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <Bell className="text-ai-purple" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <motion.div
                    key={notification.id}
                    className={`
                      p-4 rounded-lg relative transition-all
                      ${notification.read ? 'bg-white/5' : 'bg-white/10 border-l-4 border-ai-purple'}
                    `}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex gap-4">
                      <div className={`
                        size-10 rounded-full ${getNotificationBg(notification.type)} 
                        flex items-center justify-center flex-shrink-0
                      `}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      </div>
                    </div>
                    
                    {!notification.read && (
                      <div className="absolute top-2 right-2 size-2 rounded-full bg-ai-purple"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass-morphism">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Do Not Disturb</div>
                    <div className="text-sm text-muted-foreground">Pause all notifications</div>
                  </div>
                  <Switch />
                </div>
                
                <div className="space-y-3 pt-2 border-t border-border">
                  <h3 className="text-sm font-medium">Notification Types</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-ai-blue" />
                      <span className="text-sm">Calendar</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="size-4 text-ai-purple" />
                      <span className="text-sm">Email</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-ai-green" />
                      <span className="text-sm">Tasks</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Info className="size-4 text-ai-orange" />
                      <span className="text-sm">AI Suggestions</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-3 pt-2 border-t border-border">
                  <h3 className="text-sm font-medium">Notification Sound</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enable sound</span>
                    <Switch defaultChecked />
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

export default NotificationsPage;
