namespace backend.Models;

public class FolderClass
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int? ParentId { get; set; }
    public string Slug { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}