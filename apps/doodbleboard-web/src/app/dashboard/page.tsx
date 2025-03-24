'use client'

import { createRoom } from '@/actions/roomActions/createSlug';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useState } from 'react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [slug, setSlug] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createdRoomSlug, setCreatedRoomSlug] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');

  const toggleDialog = () => {
    setIsDialogOpen((prevState) => !prevState);
  };

  const router = useRouter();

  async function handleJoinSubmit(e: MouseEvent) {
    e.preventDefault();

    if (!slug) {
      toast.error("Slug can't be empty");
      return;
    }

    // Navigate to the room using the slug
    router.push(`/canvas/${slug}`);
  }


  return (
    <>
      <section className="bg-[#205781] min-h-screen z-0">
        <header className="py-4 px-5">
          <nav className="flex gap-4">
            {/* Slug input for joining a room */}
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Enter room slug"
              className="p-2 rounded-xl"
            />
            <button
              className="bg-white px-4 py-2 rounded-xl"
              type="submit"
              onClick={handleJoinSubmit}
            >
              Join a room
            </button>

            {/* Toggle Button for creating a room */}
            <button
              onClick={toggleDialog}
              className="px-6 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
            >
              Create Room
            </button>
          </nav>
        </header>

        {/* Dialog Component */}
        {isDialogOpen && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center"
            onClick={toggleDialog} // Close on overlay click
          >
            <div
              className="bg-white p-6 rounded-lg shadow-xl w-96 relative"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
            >
              {/* Close button */}
              <button
                onClick={toggleDialog}
                className="absolute top-2 right-2 text-xl font-bold text-gray-500"
              >
                X
              </button>

              {/* Display created room slug */}
              <input
                type="text"
                placeholder="Copy Slug from here"
                value={createdRoomSlug}
                disabled
                className="mb-4 p-2 rounded-md w-full bg-gray-100"
              />

              {/* Room name input */}
              <input
                type="text"
                placeholder="Enter room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="mb-4 p-2 rounded-md w-full"
              />

              {/* Create new room button */}
              <button
                className="px-6 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
                onClick={ async () => {
                  const slug = await createRoom({ name: roomName});
                  setCreatedRoomSlug(slug);
                }}
              >
                Create New Room
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
