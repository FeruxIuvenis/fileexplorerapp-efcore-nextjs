"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import Link from "next/link";

interface FolderCardProps {
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
    currentPath: string;
    createdAt: string;
}

const FolderCard = ({
    name,
    slug,
    currentPath,
    createdAt,
}: FolderCardProps) => {
    const href = `/${[currentPath, slug]
        .filter(Boolean)
        .join("/")}`;

    return (
        <Link href={href} className="w-full">
            <Card className="hover:shadow-md hover:bg-accent/40 transition-shadow duration-300">
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                </CardHeader>

                <CardContent>
                    <span className="text-xs text-muted-foreground">
                        Created {new Date(createdAt).toLocaleDateString()}
                    </span>
                </CardContent>
            </Card>
        </Link>
    );
};

export default FolderCard;