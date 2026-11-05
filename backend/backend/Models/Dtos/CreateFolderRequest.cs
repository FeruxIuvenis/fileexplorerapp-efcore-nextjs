namespace backend.Models.Dtos;

public class CreateFolderRequest
{
    public string Name { get; set; } = string.Empty;
    public int? ParentId { get; set; }
}