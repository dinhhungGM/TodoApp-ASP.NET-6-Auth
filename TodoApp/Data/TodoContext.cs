using Microsoft.EntityFrameworkCore;
using TodoApp.Models;

namespace TodoApp.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext (DbContextOptions<TodoContext> options) : base (options) { }
        public DbSet<TodoItem> todoItems { get; set; }
        public DbSet<User> users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder ) 
        {
            modelBuilder.Entity<TodoItem>().ToTable("todo");
            modelBuilder.Entity<User>().ToTable("user");
            
        }
    }
}
