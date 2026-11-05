using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Utils;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<FolderClass> Folders => Set<FolderClass>();

    public DbSet<NoteClass> Notes => Set<NoteClass>();
}