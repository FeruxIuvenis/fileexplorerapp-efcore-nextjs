import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

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
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>

      <CardContent>
        <span className="text-xs text-muted-foreground">
          Created {new Date(createdAt).toLocaleDateString()}
        </span>
      </CardContent>
    </Card>
  );
};

export default FolderCard;