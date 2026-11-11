import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import Link from 'next/link';
interface FolderCardProps {
    id: number;
    name: string;
    parentId: number | null;
    createdAt: string;
}

const FolderCard = ({
    id,
    name,
    parentId,
    createdAt,
}: FolderCardProps) => {
    return (
        <Link href={`/folders/${id}`} className="w-full">
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