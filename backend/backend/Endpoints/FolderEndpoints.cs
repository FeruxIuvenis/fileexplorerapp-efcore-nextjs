using backend.Models;
using backend.Models.Dtos;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace backend.Endpoints;

public static class FolderEndpoints
{
    public static IEndpointRouteBuilder MapFolderEndpoints(
        this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/folders");

        // new folder
        group.MapPost("/", async (
            CreateFolderRequest request,
            AppDbContext dbContext
        ) =>
        {
            var folder = new FolderClass
            {
                Name = request.Name,
                ParentId = request.ParentId,
                Slug = SlugGenerator.CreateSlug(request.Name)
            };

            var newFolder = dbContext.Folders.Add(folder);
            await dbContext.SaveChangesAsync();
            
            return Results.Created($"/api/folders/{folder.Id}", folder);
        });

        return app;
    }
}