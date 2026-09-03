"use client"

import * as React from "react"
import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronsUpDown,
  GalleryVerticalEnd,
  LogOut,
  Settings2,
  Sparkles,
  SquareTerminal,
  NotebookPen,
  ScanEye,
  ArrowUpNarrowWide,
  BriefcaseBusiness,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
// This is sample data.
const data = {
  user: {
    name: "Jops",
    email: "joaopfernandessantos@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "StudyButler",
      logo: GalleryVerticalEnd,
      plan: "Corp",
    },
   
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  
}

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [activeTeam] = React.useState(data.teams[0])

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
                        {activeTeam.name}
                      </span>
                      <span className="truncate text-xs">
                        {activeTeam.plan}
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
            <SidebarMenuItem className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" >
            <Link to="/backpack">
              <SidebarMenuButton asChild>
                
                  <SidebarMenuButton className="flex items-center">
                    <NotebookPen className="" />
                    Dashboard
                  </SidebarMenuButton>
              </SidebarMenuButton>
              </Link>

            </SidebarMenuItem>

            <SidebarMenuItem className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" >
            <Link to="/backpack/user-question-extractor">
              <SidebarMenuButton asChild>
                
                  <SidebarMenuButton className="flex items-center">
                    <ScanEye className="overflow-none" />
                    Extrair Questões
                  </SidebarMenuButton>
              </SidebarMenuButton>
              </Link>

            </SidebarMenuItem>

            <SidebarMenuItem className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" >
            <Link to="#">
              <SidebarMenuButton asChild>
                
                  <SidebarMenuButton className="flex items-center">
                    <ArrowUpNarrowWide className="" />
                    Métricas
                  </SidebarMenuButton>
              </SidebarMenuButton>
              </Link>

            </SidebarMenuItem>

            <SidebarMenuItem className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" >
            <Link to="/backpack">
              <SidebarMenuButton asChild>
                
                  <SidebarMenuButton className="flex items-center">
                    <BriefcaseBusiness className="" />
                    Mochila
                  </SidebarMenuButton>
              </SidebarMenuButton>
              </Link>

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
                      <AvatarImage
                        src={data.user.avatar}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {data.user.email}
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
                        <AvatarImage
                          src={data.user.avatar}
                          alt={data.user.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {data.user.name}
                        </span>
                        <span className="truncate text-xs">
                          {data.user.email}
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
                    <Link to="/" className="flex items-center gap-2">
                    <LogOut className=""/>
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