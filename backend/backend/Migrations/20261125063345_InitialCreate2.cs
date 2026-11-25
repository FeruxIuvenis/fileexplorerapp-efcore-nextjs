using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Notes_ParentId",
                table: "Notes",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Folders_ParentId",
                table: "Folders",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Folders_Folders_ParentId",
                table: "Folders",
                column: "ParentId",
                principalTable: "Folders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Folders_ParentId",
                table: "Notes",
                column: "ParentId",
                principalTable: "Folders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Folders_Folders_ParentId",
                table: "Folders");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Folders_ParentId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_ParentId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Folders_ParentId",
                table: "Folders");
        }
    }
}
