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
}


// {notes.map((note) => (
//             <NoteCard
//                 key={note.id}
//                 id={note.id}
//                 title={note.title}
//                 content={note.content}
//                 parentId={note.parentId}
//                 createdAt={note.createdAt}
//                 updatedAt={note.updatedAt}
//             />
//         ))}