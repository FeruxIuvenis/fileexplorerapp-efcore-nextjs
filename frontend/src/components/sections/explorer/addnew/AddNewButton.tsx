"use client";

import { useState } from "react";
import { Plus, TextIcon, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NewNoteDialog from "./NewNoteDialog";
import NewFolderDialog from "./NewFolderDialog";
import { useExplorerContext } from "@/components/providers/ExplorerProvider";

export default function AddNewButton() {
    const [noteOpen, setNoteOpen] = useState(false);
    const [folderOpen, setFolderOpen] = useState(false);

    const { isReady } = useExplorerContext();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button disabled={!isReady} />} className="rounded-lg">    <Plus />
                    Create New
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" className="rounded-lg">
                    <DropdownMenuItem
                        className="w-full rounded-md"
                        onClick={() => setNoteOpen(true)}
                    >
                        <TextIcon />
                        Note
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="w-full rounded-md"
                        onClick={() => setFolderOpen(true)}
                    >
                        <FolderPlus />
                        Folder
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <NewNoteDialog
                open={noteOpen}
                onOpenChange={setNoteOpen}
            />

            <NewFolderDialog
                open={folderOpen}
                onOpenChange={setFolderOpen}
            />
        </>
    );
}