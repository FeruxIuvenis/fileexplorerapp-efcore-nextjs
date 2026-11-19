type Props = {
  message: string;
  path: string;
};

export default function ExplorerError({ message, path }: Props) {
  return (
    <div className="m-4 rounded-md border border-destructive p-4">
      <h2 className="font-semibold">Failed to load data</h2>
      <p className="text-sm text-muted-foreground">{message}</p>
      <p className="text-sm text-muted-foreground">Path: /{path}</p>
    </div>
  );
}