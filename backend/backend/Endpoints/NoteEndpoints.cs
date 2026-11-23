using backend.Models;
using backend.Models.Dtos;
using backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints;

public static class NoteEndpoint
{
    public static IEndpointRouteBuilder MapNoteEndpoints(
        this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/notes");

        // ALL NOTES
        group.MapGet("/",
            async (AppDbContext dbContext) =>
            {
                var notes = await dbContext.Notes.ToListAsync();
                
                return Results.Ok(notes);
            });

        group.MapGet("/{id:int}", async (int id, AppDbContext dbContext) =>
        {
            var note = await dbContext.Notes.FindAsync(id);

            if (note is null)
                return Results.NotFound("Note was found");

            return Results.Ok(note);
        });

        group.MapPost("/", async (
            CreateNoteRequest request,
            AppDbContext dbContext
        ) =>
        {
            var newNote = new NoteClass
            {
                Title = request.Title,
                Content = request.Content,
                ParentId = request.ParentId
            };
            
            await dbContext.Notes.AddAsync(newNote);
            await dbContext.SaveChangesAsync();
            
            return Results.Created($"/notes/{newNote.Id}", newNote);
        });

        group.MapPatch("/{id:int}", async (
            int id,
            CreateNoteRequest request,
            AppDbContext dbContext
        ) =>
        {
            var editedNote = await dbContext.Notes.FindAsync(id);

            if (editedNote is null)
                return Results.NotFound("Note not found");

            if (string.IsNullOrWhiteSpace(request.Title))
                return Results.BadRequest("Note title cannot be empty");

            editedNote.Title = request.Title;
            editedNote.Content = request.Content;
            editedNote.ParentId = request.ParentId;
            editedNote.UpdatedAt = DateTime.UtcNow;

            await dbContext.SaveChangesAsync();

            return Results.Ok(editedNote);
        });

        group.MapDelete("/{id:int}", async (int id, AppDbContext dbContext) =>
        {
            var editedNote = await dbContext.Notes.FindAsync(id);
            if(editedNote is null) return Results.NotFound("Error: note not found");
            
            dbContext.Notes.Remove(editedNote);
            await dbContext.SaveChangesAsync();
            return Results.NoContent();
        });

        return app;
    }
}