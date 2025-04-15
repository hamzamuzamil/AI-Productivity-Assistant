
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  MessageSquare, 
  CheckSquare, 
  Calendar, 
  Bell, 
  BarChart2, 
  Mic, 
  Settings,
  User,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const AppSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Animation variants for menu items
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
      exact: true,
    },
    {
      title: "AI Chat",
      icon: MessageSquare,
      path: "/chat",
    },
    {
      title: "Tasks",
      icon: CheckSquare,
      path: "/tasks",
    },
    {
      title: "Calendar",
      icon: Calendar,
      path: "/calendar",
    },
    {
      title: "Notifications",
      icon: Bell,
      path: "/notifications",
    },
    {
      title: "Analytics",
      icon: BarChart2,
      path: "/analytics",
    },
    {
      title: "Voice Command",
      icon: Mic,
      path: "/voice",
    },
  ];

  const settingsItems = [
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
    {
      title: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center justify-center py-4">
        <div className="flex items-center justify-center w-full gap-2">
          <div className="size-8 bg-ai-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <h1 className="text-xl font-bold text-gradient-purple">Aura AI</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.path, item.exact)}
                      tooltip={item.title}
                    >
                      <Link to={item.path} className="flex items-center">
                        <item.icon className={cn(
                          isActive(item.path, item.exact) ? "text-ai-purple" : "text-muted-foreground"
                        )} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>User</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  custom={i + menuItems.length}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.path)}
                      tooltip={item.title}
                    >
                      <Link to={item.path} className="flex items-center">
                        <item.icon className={cn(
                          isActive(item.path) ? "text-ai-purple" : "text-muted-foreground"
                        )} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="flex items-center text-muted-foreground hover:text-destructive w-full">
                <LogOut className="text-muted-foreground group-hover:text-destructive" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
