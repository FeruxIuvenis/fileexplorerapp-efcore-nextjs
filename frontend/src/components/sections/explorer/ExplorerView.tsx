import { FolderIcon, TextIcon } from "lucide-react";

import FolderCard from "@/components/sections/explorer/folder/FolderCard";
import NoteCard from "@/components/sections/explorer/note/NoteCard";
import ExplorerSection from "@/components/sections/explorer/ExplorerSection";
import type { ExplorerResponse } from "@/utils/types";

type Props = {
  data: ExplorerResponse;
  currentPath: string; // e.g. "c-programming/types-and-structs"
};

export default function ExplorerView({ data, currentPath }: Props) {
  return (
    <div className="flex flex-col items-center justify-between">
      <ExplorerSection icon={<FolderIcon />} title="Folders">
        {data.folders.map((folder) => (
          <FolderCard
            key={folder.id}
            id={folder.id}
            name={folder.name}
            slug={folder.slug}
            parentId={data.parentId}
            currentPath={currentPath}
            createdAt={folder.createdAt}
          />
        ))}
      </ExplorerSection>

      <div className="w-full border-t border-border" />

      <ExplorerSection icon={<TextIcon />} title="Notes">
        {data.files.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            parentId={data.parentId}
            createdAt={note.createdAt}
            updatedAt={note.updatedAt}
          />
        ))}
      </ExplorerSection>
    </div>
  );
}