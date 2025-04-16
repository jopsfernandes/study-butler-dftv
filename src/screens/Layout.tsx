import { Toaster } from '@/components/ui/toaster';
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/studybutlercomponents/app-sidebar";

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-primary dark:bg-zinc-900 dark:text-zinc-300">
      <main className="flex-1 flex flex-col min-h-0 overflow-auto gap-4 p-4 lg:gap-6 lg:p-6 dark:bg-zinc-900 ">
        <SidebarProvider>
          <AppSidebar>
            <Outlet />
          </AppSidebar>
        </SidebarProvider>
      </main>
      <Toaster />
    </div>
  );
}
