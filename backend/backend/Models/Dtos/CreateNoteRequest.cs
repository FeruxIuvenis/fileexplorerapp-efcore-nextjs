namespace backend.Models.Dtos;

public class CreateNoteRequest
{
    public string Title { get; set; }
    public string Content { get; set; } = "";
    public int? ParentId { get; set; }
}