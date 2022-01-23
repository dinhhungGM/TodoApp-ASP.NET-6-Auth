namespace TodoApp.DTO
{
    public class CreateTodoItemDto
    {
        public string Todoname { get; set; }
        public string  TodoDescription { get; set; }

        public Guid  UserId { get; set; }
    }
}
