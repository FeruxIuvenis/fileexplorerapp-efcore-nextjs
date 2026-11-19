import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/utils/format";
import type { NoteEditor } from "@/utils/hooks/useNoteEditor";

type Props = {
  editor: NoteEditor;
  updatedAt: string;
};

export default function NoteEditorDialog({ editor, updatedAt }: Props) {
  const {
    isOpen,
    handleOpenChange,
    requestClose,
    handleSubmit,
    title,
    setTitle,
    content,
    setContent,
    isDirty,
  } = editor;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* The built-in X button in the corner also goes through onOpenChange */}
      <DialogContent className="sm:max-w-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            {/* Required for accessibility; the visible title is the input below */}
            <DialogTitle className="sr-only">Edit note</DialogTitle>
            <DialogDescription className="sr-only">
              Edit the title and content of this note.
            </DialogDescription>

            <Input
              aria-label="Note title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-auto border-none px-0 pr-8 text-lg font-semibold shadow-none focus-visible:ring-0"
            />
          </DialogHeader>

          <Textarea
            aria-label="Note content"
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-48 resize-none"
          />

          <span className="text-xs text-muted-foreground">
            Last edited {formatDate(updatedAt)}
          </span>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={requestClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isDirty}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}