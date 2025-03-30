"use client"

import * as React from "react"
import {
  Pen
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import AppUser from "./AppUser"
import { getUserDetails } from "@/actions/generalAction/userDetails"

type User = {
  name: string,
  email: string
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<User>({ name: "gigashad", email: "gigashad@gmail.com"});

  React.useEffect(() => {
    async function User() {
      const response =  await getUserDetails();
      
      if(!response) return;

      setUser(response);
    }

    User();
  }, [])
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Pen className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">DoodleBoard</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
      </SidebarContent>
      <SidebarFooter>
        <AppUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
