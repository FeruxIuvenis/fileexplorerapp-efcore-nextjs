using backend.Endpoints;
using backend.Models;
using backend.Utils;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Register endpoints
app.MapBrowseEndpoints();
app.MapFolderEndpoints();

app.Run();