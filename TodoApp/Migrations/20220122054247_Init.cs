using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApp.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Timestamp = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    UserIsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "todo",
                columns: table => new
                {
                    TodoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TodoName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TodoDescription = table.Column<string>(type: "nvarchar(3000)", maxLength: 3000, nullable: false),
                    Timestamp = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false),
                    TodoIsComplete = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TodoIsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_todo", x => x.TodoId);
                    table.ForeignKey(
                        name: "FK_todo_user_UserId",
                        column: x => x.UserId,
                        principalTable: "user",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_todo_TodoId",
                table: "todo",
                column: "TodoId");

            migrationBuilder.CreateIndex(
                name: "IX_todo_UserId",
                table: "todo",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_user_UserId_Username",
                table: "user",
                columns: new[] { "UserId", "Username" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "todo");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
