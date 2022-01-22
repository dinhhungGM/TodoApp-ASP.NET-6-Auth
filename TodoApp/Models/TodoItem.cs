using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TodoApp.Models
{
    [Index(nameof(TodoId))]
    public class TodoItem
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid TodoId { get; set; }
        [Required]
        public string TodoName { get; set; }

        [Required, MaxLength(3000)]
        public string TodoDescription { get; set; }

        [Timestamp]
        public byte[] Timestamp { get; set; }

        [Required]
        public bool TodoIsComplete { get; set; } = false;

        [Required]
        public User User { get; set; }

        [Required]
        public bool TodoIsDeleted { get; set; } = false;
    }
}
