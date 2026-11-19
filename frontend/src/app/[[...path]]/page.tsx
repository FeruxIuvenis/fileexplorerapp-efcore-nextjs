<<<<<<< Updated upstream
import FolderCard from '@/components/sections/note/FolderCard';
import NoteCard from '@/components/sections/note/NoteCard';
import { folders, notes } from '@/utils/sampleData';
import { FolderIcon, TextIcon } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-between">
            <section className="flex flex-col w-full">
                <header className="flex items-center gap-2 p-4">
                    <FolderIcon />
                    <span>Folders</span>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {folders.map((folder) => (
                        <FolderCard
                            key={folder.id}
                            id={folder.id}
                            name={folder.name}
                            parentId={folder.parentId}
                            createdAt={folder.createdAt}
                        />
                    ))}
                </div>
            </section>
            <div className="border-t border-border w-full" />
            <section className="flex flex-col w-full">
                <header className="flex items-center gap-2 p-4">
                    <TextIcon/>
                    <span>Notes</span>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            content={note.content}
                            parentId={note.parentId}
                            createdAt={note.createdAt}
                            updatedAt={note.updatedAt}
                        />
                    ))}
                </div>
            </section>
            <section className="flex flex-col w-full">
            </section>
        </div>
    );
=======
"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";

import ExplorerError from "@/components/sections/explorer/ExplorerError";
import ExplorerView from "@/components/sections/explorer/ExplorerView";
import { useExplorer } from "@/utils/hooks/useExplorer";
import { getSegments } from "@/utils/path";

function ExplorerPage() {
  const pathname = usePathname();
  const state = useExplorer(pathname);
  const currentPath = getSegments(pathname).join("/");

  switch (state.status) {
    case "loading":
      return <p className="p-4">Loading files and folders...</p>;

    case "error":
      return <ExplorerError message={state.message} path={currentPath} />;

    case "success":
      return <ExplorerView data={state.data} currentPath={currentPath} />;
  }
}

export default function Page() {
  return (
    <Suspense fallback={<p className="p-4">Loading...</p>}>
      <ExplorerPage />
    </Suspense>
  );
>>>>>>> Stashed changes
}