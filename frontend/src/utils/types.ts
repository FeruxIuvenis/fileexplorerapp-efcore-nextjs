export interface Folder {
    id: number;
    name: string;
    slug: string;
    createdAt: string;
}

export interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface ExplorerResponse {
    path: string;
    parentId: number | null;
    folders: Folder[];
    files: Note[];
}