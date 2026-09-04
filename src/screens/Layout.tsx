import { Toaster } from '@/components/ui/toaster';
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/studybutlercomponents/app-sidebar";

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-primary dark:bg-zinc-900 dark:text-zinc-300">
      <main className="flex-1 flex flex-col min-h-0 overflow-auto gap-4 p-4 lg:gap-6 lg:p-6 dark:bg-zinc-900 ">
        <AppSidebar>
          <Outlet />
        </AppSidebar>
      </main>
      <Toaster />
    </div>
  );
}
