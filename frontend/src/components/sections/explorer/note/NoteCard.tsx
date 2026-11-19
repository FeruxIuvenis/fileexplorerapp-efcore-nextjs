"use client";

import DiscardChangesDialog from "@/components/sections/explorer/DiscardChangesDialog";
import NoteCardPreview from "@/components/sections/explorer/note/NoteCardPreview";
import NoteEditorDialog from "@/components/sections/explorer/note/NoteEditorDialog";
import { useNoteEditor } from "@/utils/hooks/useNoteEditor";
import type { Note } from "@/utils/types";

export default function NoteCard(note: Note) {
  const editor = useNoteEditor(note);

  return (
    <>
      <NoteCardPreview note={note} onOpen={editor.open} />
      <NoteEditorDialog editor={editor} updatedAt={note.updatedAt} />
      <DiscardChangesDialog
        open={editor.isConfirmOpen}
        onOpenChange={editor.setIsConfirmOpen}
        onDiscard={editor.closeNow}
      />
    </>
  );
}