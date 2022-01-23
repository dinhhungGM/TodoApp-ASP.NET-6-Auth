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
    public class UsersController : ControllerBase
    {
        private readonly TodoContext _context;
        

        public UsersController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Getusers()
        {
            return await _context.users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _context.users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UserRoleDto user)
        {
            bool isExist = await _context.users.AnyAsync(u => u.Username == user.Username);

            if (!isExist)
            {
                User newUser = new User();
                newUser.Username = user.Username;
                newUser.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                newUser.Role = user.Role;

                _context.users.Add(newUser);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(UsersController.PostUser), "UsersController", null, newUser);
            }
            return Conflict("Username is existed");
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _context.todoItems.RemoveRange(
                _context.todoItems.Where(todo => todo.User.UserId == id)
             );
            _context.users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(id);
        }

        private bool UserExists(Guid id)
        {
            return _context.users.Any(e => e.UserId == id);
        }

        // GET: api/Users/5/TodoItems
        [HttpGet("{id}/TodoItems")]
        [Authorize(Roles = "Noob,Admin" )]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems(Guid id)
        {
            return await _context.todoItems.Where(
                todo => todo.User.UserId == id).ToListAsync();
        }

        // PUT: api/Users/5/TodoItems/9
        [HttpPut("{id}/TodoItems/{item}")]
        [Authorize(Roles = "Noob,Admin")]
        public async Task<IActionResult> PutTodoItem(Guid id, Guid item, UpdateTodoItemDto updatedItem)
        {
            TodoItem todoItem = await _context.todoItems.FirstOrDefaultAsync(x => x.TodoId == item);
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
                if (!TodoItemExists(item))
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
        private bool TodoItemExists(Guid id)
        {
            return _context.todoItems.Any(e => e.TodoId == id);
        }

    }
}
