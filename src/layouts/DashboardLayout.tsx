
import { Outlet } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { useEffect } from "react";

const DashboardLayout = () => {
  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 overflow-auto bg-background bg-gradient-to-br from-background via-background/95 to-background/90">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-bold text-gradient hidden md:block">Aura AI</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full bg-ai-purple/20 flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
