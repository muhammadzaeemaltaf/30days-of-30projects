"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { FilePenIcon, TrashIcon } from "lucide-react";

type Note = {
  id: number;
  title: string;
  content: string;
};

const defaultNotes: Note[] = [
  {
    id: 1,
    title: "Grocery List",
    content: "Milk, Eggs, Bread, Apples",
  },
  {
    id: 2,
    title: "Meeting Notes",
    content: "Discuss new project timeline, assign tasks to team",
  },
  {
    id: 3,
    title: "Idea for App",
    content: "Develop a note-taking app with a clean and minimalist design",
  },
];


const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);


  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      setNotes(defaultNotes);
    }
    setIsMounted(true);
  }, []);


  if (!isMounted) {
    return null;
  }

  const handleAddNote = () => {
    if (!newNote.title || !newNote.content) return;

    const newNoteObj: Note = {
      id: notes.length + 1,
      title: newNote.title,
      content: newNote.content,
    };

    const updatedNotes = [...notes, newNoteObj];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    setNewNote({ title: "", content: "" });
  };

  const handleDeleteNote = (id: number) => {
    const newObj = notes.filter((note) => note.id !== id);
    setNotes(newObj);
    localStorage.setItem("notes", JSON.stringify(newObj));
  };

  const handleEditNote = (id: number) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setNewNote({ title: noteToEdit!.title, content: noteToEdit!.content });
    setEditingNoteId(id);
  };

  const handleUpdateNote = () => {
    const updatedNotes = notes.map((note) =>
      note.id === editingNoteId
        ? { id: note.id, title: newNote.title, content: newNote.content }
        : note
    );

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNewNote({ title: "", content: "" });
    setEditingNoteId(null);
  };
  return (
    <div>
      <div className="bg-gray-200 w-full p-4">
        <h1 className="font-bold text-2xl">Note Taker</h1>
      </div>

      <div className="space-y-3 p-4">
        <Input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <Textarea
          placeholder="Content"
          rows={4}
          value={newNote.content}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, content: e.target.value }))
          }
        />

        {editingNoteId === null ? (
          <Button
            className="font-bold rounded-xl !mt-4"
            onClick={handleAddNote}
          >
            Add Note
          </Button>
        ) : (
          <Button
            onClick={handleUpdateNote}
            className="font-bold rounded-xl !mt-4"
          >
            Update Note
          </Button>
        )}
      </div>

      <div className="px-4 space-y-4">
        {notes.map((note) => (
          <Card key={note.id} className="p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">{note.title}</h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditNote(note.id)}
                >
                  <FilePenIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="mt-2 text-muted-foreground">{note.content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notes;
