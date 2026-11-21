"use client";

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
import { useState } from "react";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const NewNoteDialog = ({ open, onOpenChange }: Props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({ title, content });

        // TODO: Call your create-note API.
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle className="sr-only">
                            Create note
                        </DialogTitle>

                        <DialogDescription className="sr-only">
                            Enter a title and content for your new note.
                        </DialogDescription>

                        <Input
                            aria-label="Note title"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="h-auto border-none px-4 pr-8 text-2xl font-semibold shadow-none focus-visible:ring-0"
                        />
                    </DialogHeader>

                    <Textarea
                        aria-label="Note content"
                        placeholder="Write something..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-48 resize-none"
                    />

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setTitle("");
                                setContent("");
                            }}
                        >
                            Clear
                        </Button>

                        <Button
                            type="submit"
                            disabled={!title.trim() && !content.trim()}
                        >

                            Create note
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewNoteDialog;