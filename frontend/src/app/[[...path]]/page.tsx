"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import FolderCard from "@/components/sections/note/FolderCard";
import NoteCard from "@/components/sections/note/NoteCard";
import { FolderIcon, TextIcon } from "lucide-react";
import type { ExplorerResponse } from "@/utils/types";

function HomeContent() {
    const pathname = usePathname();

    const [data, setData] = useState<ExplorerResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const apiPath = pathname.split("/").filter(Boolean).map(encodeURIComponent).join("/");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            setLoading(true);
            setError(null);
            setData(null);

            try {
                const segments = pathname.split("/").filter(Boolean);

                const apiPath = segments
                    .map(encodeURIComponent)
                    .join("/");

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/browse/${apiPath}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(
                        `Request failed: ${response.status} ${response.statusText}`
                    );
                }

                const responseText = await response.text();

                console.log("Status:", response.status);
                console.log("Content-Type:", response.headers.get("content-type"));
                console.log("Response body:", responseText);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${responseText}`);
                }

                let result: unknown;

                try {
                    result = JSON.parse(responseText);
                } catch {
                    throw new Error(
                        `Backend returned invalid JSON. Response: ${responseText.slice(0, 200)}`
                    );
                }

                setData(result as ExplorerResponse);

                // Basic runtime validation before rendering API data.
                if (
                    typeof result !== "object" ||
                    result === null ||
                    !("path" in result) ||
                    typeof result.path !== "string" ||
                    !("parentId" in result) ||
                    !(typeof result.parentId === "number" || result.parentId === null) ||
                    !("folders" in result) ||
                    !Array.isArray(result.folders) ||
                    !("files" in result) ||
                    !Array.isArray(result.files)
                ) {
                    throw new Error("The API returned an invalid response structure.");
                }

                setData(result as ExplorerResponse);
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "An unexpected error occurred."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => controller.abort();
    }, [pathname]);

    if (loading) {
        return <p className="p-4">Loading files and folders...</p>;
    }

    if (error) {
        return (
            <div className="m-4 rounded-md border border-destructive p-4">
                <h2 className="font-semibold">Failed to load data</h2>
                <p className="text-sm text-muted-foreground">{error}</p>
                <p className="text-sm text-muted-foreground">URL: {apiPath}</p>
            </div>
        );
    }

    if (!data) {
        return <p className="p-4">No data available.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-between">
            <section className="flex flex-col w-full">
                <header className="flex items-center gap-2 p-4">
                    <FolderIcon />
                    <span>Folders</span>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {data.folders.map((folder) => (
                        <FolderCard
                            key={folder.id}
                            id={folder.id}
                            name={folder.name}
                            parentId={data.parentId}
                            createdAt={folder.createdAt}
                        />
                    ))}
                </div>
            </section>

            <div className="border-t border-border w-full" />

            <section className="flex flex-col w-full">
                <header className="flex items-center gap-2 p-4">
                    <TextIcon />
                    <span>Notes</span>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {data.files.map((note) => (
                        <NoteCard
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            content={note.content}
                            parentId={data.parentId}
                            createdAt={note.createdAt}
                            updatedAt={note.updatedAt}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default function Home() {
    return (
        <Suspense fallback={<div className="p-4">Loading...</div>}>
            <HomeContent />
        </Suspense>
    );
}