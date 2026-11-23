using backend.Models;
using backend.Models.Dtos;
using backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints;

public static class FolderEndpoints
{
    public static IEndpointRouteBuilder MapFolderEndpoints(
        this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/folders");

        group.MapPost("/", async (
            CreateFolderRequest request,
            AppDbContext dbContext
        ) =>
        {
            var slug = SlugGenerator.CreateSlug(request.Name);

            var exists = await dbContext.Folders
                .AnyAsync(f =>
                    f.ParentId == request.ParentId &&
                    f.Slug == slug
                );

            if (exists)
            {
                return Results.Conflict(
                    "A folder with this name already exists in this directory."
                );
            }

            var folder = new FolderClass
            {
                Name = request.Name,
                ParentId = request.ParentId,
                Slug = slug
            };

            dbContext.Folders.Add(folder);
            await dbContext.SaveChangesAsync();

            return Results.Created(
                $"/api/folders/{folder.Id}",
                folder
            );
        });

        group.MapDelete("/{id:int}", async (
            int id, AppDbContext dbContext
        ) =>
        {
            var folder = await dbContext.Folders.FindAsync(id);

            if (folder == null) return Results.NotFound("Folder wasn't found");

            dbContext.Folders.Remove(folder);
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });

        group.MapPatch("/{id:int}", async (CreateFolderRequest request, int id, AppDbContext dbContext) =>
        {
            var folder = await dbContext.Folders.FindAsync(id);
            if (folder == null) return Results.NotFound("Folder wasn't found");

            var slug = folder.Slug;

            var exists = await dbContext.Folders
                .AnyAsync(f =>
                    f.ParentId == request.ParentId &&
                    f.Slug == slug
                );
            if (exists) return Results.Conflict("A folder with this name already exists in this directory.");


            folder.Name = request.Name;
            folder.Slug = SlugGenerator.CreateSlug(request.Name);
            await dbContext.SaveChangesAsync();

            return Results.Ok(folder);
        });

        // Get EVERY folder(without any specifications)
        group.MapGet("/", async (
            AppDbContext dbContext
        ) =>
        {
            var folders = dbContext.Folders.ToList();

            return Results.Ok(folders);
        });
        
        return app;
    }
}