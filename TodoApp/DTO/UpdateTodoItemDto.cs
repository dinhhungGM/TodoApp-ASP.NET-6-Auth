namespace TodoApp.DTO
{
    public class UpdateTodoItemDto
    {
        public string TodoName { get; set; }
        public string TodoDescription { get; set; }

        public bool TodoIsComplete { get; set; }
    }
}
