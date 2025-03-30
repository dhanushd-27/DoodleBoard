'use client'

import React, { useState } from 'react';
// import { createRoom } from '@/actions/roomActions/createSlug';

import {
  SidebarTrigger,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { AppSidebar } from '@/components/Dashboard/AppSidebar';
import RoomCard from '@/components/Dashboard/RoomCard';

export default function Dashboard() {
  // const [slug, setSlug] = useState<string>('');
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [createdRoomSlug, setCreatedRoomSlug] = useState<string>('');
  // const [roomName, setRoomName] = useState<string>('');

  // const toggleDialog = () => {
  //   setIsDialogOpen((prevState) => !prevState);
  // };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
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
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <RoomCard name='D' roomSlug='ShpMDyz'/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
