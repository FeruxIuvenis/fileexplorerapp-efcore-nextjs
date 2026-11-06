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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // A folder can contain child folders.
        modelBuilder.Entity<FolderClass>()
            .HasOne<FolderClass>()
            .WithMany()
            .HasForeignKey(f => f.ParentId)
            .OnDelete(DeleteBehavior.Cascade);

        // A folder can contain notes.
        modelBuilder.Entity<NoteClass>()
            .HasOne<FolderClass>()
            .WithMany()
            .HasForeignKey(n => n.ParentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}