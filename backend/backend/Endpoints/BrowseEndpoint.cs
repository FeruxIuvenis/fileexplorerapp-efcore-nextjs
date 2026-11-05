
using backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public static class BrowseEndpoint
{
    public static IEndpointRouteBuilder MapBrowseEndpoints(
        this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/browse/{**path}", async (
            string? path,
            AppDbContext dbContext) =>
        {
            var segments = (path ?? "")
                .Split('/', StringSplitOptions.RemoveEmptyEntries);

            if (segments.Length > 30)
                return Results.BadRequest("Path is too deep");

            int? parentId = null;

            foreach (var segment in segments)
            {
                var folderId = await dbContext.Folders
                    .AsNoTracking()
                    .Where(f =>
                        f.ParentId == parentId &&
                        f.Slug == segment)
                    .Select(f => (int?)f.Id)
                    .SingleOrDefaultAsync();

                if (folderId is null)
                    return Results.NotFound("Folder not found");

                parentId = folderId;
            }

            // parentId = null means root(e.g. /)
            
            var folders = await dbContext.Folders
                .AsNoTracking()
                .Where(f => f.ParentId == parentId)
                .Select(f => new
                {
                    f.Id,
                    f.Name,
                    f.Slug,
                    f.CreatedAt
                })
                .ToListAsync();

            var notes = await dbContext.Notes
                .AsNoTracking()
                .Where(f => f.ParentId == parentId)
                .Select(n => new
                {
                    n.Id,
                    n.Title,
                    n.Content,
                    n.CreatedAt,
                    n.UpdatedAt
                })
                .ToListAsync();

            return Results.Ok(new
            {
                Path = "/" + string.Join("/", segments),
                ParentId = parentId,
                Folders = folders,
                Files = notes
            });
        });

        return app;
    }
}
