using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TodoApp.Models
{
    [Index(nameof(UserId), nameof(Username), IsUnique = true)]
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid UserId { get; set; }

        [Required, MinLength(5), MaxLength(16)]
        public string Username { get; set; }

        [Required, JsonIgnore]
        public string Password { get; set; }


        [Timestamp]
        public byte[]? Timestamp { get; set; }

        [Required]
        public bool UserIsDeleted { get; set; } = false;

        [Required]
        public string Role { get; set; } = "Noob";
    }
}
