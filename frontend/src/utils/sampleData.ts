export const notes = [
  {
    id: 1,
    title: "Note 1",
    content: "This is the content of Note 1.",
    parentId: null,
    createdAt: "2023-01-01T12:00:00Z",
    updatedAt: "2023-01-01T12:23:00Z",
  },
  {
    id: 2,
    title: "Note 2",
    content: "This is the content of Note 2.",
    parentId: 1,
    createdAt: "2023-01-02T12:00:00Z",
    updatedAt: "2023-01-02T12:23:00Z",
  },
  {
    id: 3,
    title: "Note 3",
    content: "This is the content of Note 3.",
    parentId: null,
    createdAt: "2023-01-03T12:00:00Z",
    updatedAt: "2023-01-03T12:23:00Z",
  },
];

export const folders = [
  {
    id: 1,
    name: "Folder 1",
    parentId: null,
    createdAt: "2023-01-01T12:00:00Z",
  },
  {
    id: 2,
    name: "Folder 2",
    parentId: 1,
    createdAt: "2023-01-02T12:00:00Z",
  },
  {
    id: 3,
    name: "Folder 3",
    parentId: null,
    createdAt: "2023-01-03T12:00:00Z",
  },
];