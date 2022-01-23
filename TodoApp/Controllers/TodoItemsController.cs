#nullable disable
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.DTO;
using TodoApp.Models;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoItemsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GettodoItems()
        {
            
            return await _context.todoItems.ToListAsync();
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(Guid id)
        {
            var todoItem = await _context.todoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(Guid id, UpdateTodoItemDto updatedItem)
        {
            TodoItem todoItem = await _context.todoItems.FirstOrDefaultAsync(x => x.TodoId == id);
            todoItem.TodoName = updatedItem.TodoName;
            todoItem.TodoDescription = updatedItem.TodoDescription;
            todoItem.TodoIsComplete = updatedItem.TodoIsComplete;

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(todoItem);

        }

        // POST: api/TodoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoDto todoItem)
        {
            TodoItem todo = new TodoItem();
            User user = await _context.users.FindAsync(todoItem.UserId);
            todo.TodoName = todoItem.TodoName;
            todo.TodoDescription = todoItem.TodoDescription;
            todo.User = user;
            _context.todoItems.Add(todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoItem", new { id = todo.TodoId }, todo);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(Guid id)
        {
            var todoItem = await _context.todoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.todoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return Ok(id);
        }

        private bool TodoItemExists(Guid id)
        {
            return _context.todoItems.Any(e => e.TodoId == id);
        }
    }
}
