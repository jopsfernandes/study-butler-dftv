"use client"

import * as React from "react"
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  GalleryVerticalEnd,
  LogOut,
  Settings2,
  Sparkles,
  NotebookPen,
  ScanEye,
  ArrowUpNarrowWide,
  BriefcaseBusiness,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarGroupContent,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

const team = {
  name: "StudyButler",
  logo: GalleryVerticalEnd,
  plan: "Corp",
}

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const userName = localStorage.getItem('user_name') || 'Usuário'
  const userEmail = localStorage.getItem('user_email') || ''
  const userInitials = userName.slice(0, 2).toUpperCase()

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="dark:border-zinc-700">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <SidebarTrigger></SidebarTrigger>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {team.name}
                  </span>
                  <span className="truncate text-xs">
                    {team.plan}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <SidebarMenuButton asChild>
                    <Link to="/backpack" className="flex items-center">
                      <NotebookPen />
                      Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <SidebarMenuButton asChild>
                    <Link to="/backpack/user-question-extractor" className="flex items-center">
                      <ScanEye />
                      Extrair Questões
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <SidebarMenuButton asChild>
                    <Link to="#" className="flex items-center">
                      <ArrowUpNarrowWide />
                      Métricas
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <SidebarMenuButton asChild>
                    <Link to="/backpack" className="flex items-center">
                      <BriefcaseBusiness />
                      Mochila
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">{userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {userName}
                      </span>
                      <span className="truncate text-xs">
                        {userEmail}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white dark:bg-zinc-900 dark:text-zinc-200"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {userName}
                        </span>
                        <span className="truncate text-xs">
                          {userEmail}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>

                      <Link to="/backpack/pricing" className="flex items-center gap-2">
                      <Sparkles/> Upgrade to Pro 
                      </Link>
                      
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center gap-2">
                    
                      <BadgeCheck className=""/>
                      Account
                    
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                    <Link to="/user-settings" className="flex items-center gap-2">
                      <Settings2 />
                      Configurações
                    </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    <Link to="/user-settings" className="flex items-center gap-2">
                      <Bell className=""/>
                      Notifications
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link
                      to="/"
                      className="flex items-center gap-2"
                      onClick={() => {
                        localStorage.removeItem('user_id');
                        localStorage.removeItem('user_name');
                        localStorage.removeItem('user_email');
                      }}
                    >
                      <LogOut />
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail className="" />
      </Sidebar>
      <SidebarInset className="dark:bg-zinc-900 border-none">
        
      {children}
        
      </SidebarInset>
    </SidebarProvider>
  )
}