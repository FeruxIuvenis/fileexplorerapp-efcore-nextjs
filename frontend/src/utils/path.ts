export function getSegments(pathname: string): string[] {
  return pathname.split("/").filter(Boolean);
}