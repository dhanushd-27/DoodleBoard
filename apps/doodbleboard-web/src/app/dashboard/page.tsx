import React from 'react';
// import { createRoom } from '@/actions/roomActions/createSlug';

import {
  SidebarTrigger,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { AppSidebar } from '@/components/Dashboard/AppSidebar';
import JoinRoom from '@/components/Dashboard/JoinRoom';
import CreateRoom from '@/components/Dashboard/CreateRoom';
import RoomsList from '@/components/Dashboard/RoomsList';

export default function Dashboard() {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <header className="flex h-16 shrink-0 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator aria-orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Doodleboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className='flex gap-2'>
            <JoinRoom />
            <CreateRoom />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <RoomsList />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
