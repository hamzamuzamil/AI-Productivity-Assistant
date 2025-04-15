
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Save, Settings, Moon, Bell, Clock, Calendar, Bot, User, Key } from "lucide-react";

const SettingsPage = () => {
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

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Settings</h1>
          <p className="text-muted-foreground">Customize your experience</p>
        </div>
        <Button className="flex items-center gap-2 bg-ai-purple text-white hover:bg-ai-purple/90">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="text-ai-purple h-5 w-5" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { icon: Moon, label: "Theme", active: true },
                  { icon: Bell, label: "Notifications", active: false },
                  { icon: Clock, label: "Time & Date", active: false },
                  { icon: Calendar, label: "Calendar", active: false },
                  { icon: Bot, label: "AI Assistant", active: false },
                  { icon: User, label: "Account", active: false },
                  { icon: Key, label: "API Keys", active: false },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`
                      p-3 rounded-lg cursor-pointer flex items-center gap-3
                      ${item.active 
                        ? 'bg-ai-purple/20 text-white' 
                        : 'bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white'}
                      transition-colors
                    `}
                  >
                    <item.icon className={`size-5 ${item.active ? 'text-ai-purple' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="text-ai-purple h-5 w-5" />
                Theme Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Dark Mode</div>
                    <div className="text-sm text-muted-foreground">Always use dark theme</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-medium mb-4">UI Appearance</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="font-medium">Accent Color</div>
                      <div className="flex gap-2">
                        {['#8b5cf6', '#3d85f0', '#4caf50', '#f97316', '#ef4444'].map((color, index) => (
                          <div 
                            key={index}
                            className={`
                              size-8 rounded-full cursor-pointer border-2
                              ${index === 0 ? 'border-white' : 'border-transparent'}
                              hover:border-white/80 transition-colors
                            `}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium">Card Style</div>
                      <div className="flex gap-2">
                        <div className="p-2 border border-white/20 rounded-lg cursor-pointer bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors">
                          <span className="text-xs">Glassmorphism</span>
                        </div>
                        <div className="p-2 border border-white/20 rounded-lg cursor-pointer bg-black/40 backdrop-blur-2xl hover:bg-black/50 transition-colors">
                          <span className="text-xs">Neumorphism</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-medium mb-4">Animations</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Enable animations</div>
                        <div className="text-sm text-muted-foreground">Motion effects throughout the interface</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Reduced motion</div>
                        <div className="text-sm text-muted-foreground">Simpler animations for accessibility</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-medium mb-4">Font Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="font-medium">Font Size</div>
                      <div className="flex gap-2">
                        {['Small', 'Medium', 'Large'].map((size, index) => (
                          <div 
                            key={index}
                            className={`
                              px-3 py-1 rounded-lg cursor-pointer bg-white/5
                              ${index === 1 ? 'bg-ai-purple/20 text-ai-purple' : ''}
                              hover:bg-white/10 transition-colors
                            `}
                          >
                            <span className="text-xs">{size}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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

export default SettingsPage;
