import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { formatDate } from "@/utils/format";
import type { Note } from "@/utils/types";

type Props = {
  note: Note;
  onOpen: () => void;
};

export default function NoteCardPreview({ note, onOpen }: Props) {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="cursor-pointer text-left transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <CardHeader className="flex items-center justify-between gap-2">
        <CardTitle className="truncate">{note.title}</CardTitle>
        <span className="shrink-0 text-xs text-muted-foreground">
          {formatDate(note.createdAt)}
        </span>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="line-clamp-3 text-sm">{note.content}</p>
        <span className="text-xs text-muted-foreground">
          Last edited {formatDate(note.updatedAt)}
        </span>
      </CardContent>
    </Card>
  );
}