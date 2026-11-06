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

        return app;
    }
}