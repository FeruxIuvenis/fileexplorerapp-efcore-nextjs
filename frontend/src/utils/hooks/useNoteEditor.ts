"use client";

import { useState, type FormEvent } from "react";
import type { Note } from "@/utils/types";

export function useNoteEditor(note: Note) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const isDirty = title !== note.title || content !== note.content;

  const open = () => {
    setTitle(note.title);
    setContent(note.content);
    setIsOpen(true);
  };

  const closeNow = () => {
    setIsConfirmOpen(false);
    setIsOpen(false);
  };

  const requestClose = () => {
    if (isDirty) setIsConfirmOpen(true);
    else setIsOpen(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (next) open();
    else requestClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isDirty) return;

    // TODO: send { id: note.id, title, content } to the backend
    console.log("Save note", { id: note.id, title, content });

    closeNow();
  };

  return {
    isOpen,
    isConfirmOpen,
    setIsConfirmOpen,
    title,
    setTitle,
    content,
    setContent,
    isDirty,
    open,
    closeNow,
    requestClose,
    handleOpenChange,
    handleSubmit,
  };
}

export type NoteEditor = ReturnType<typeof useNoteEditor>;