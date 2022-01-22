using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TodoApp.Data;
using TodoApp.DTO;
using TodoApp.Models;



namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TodoContext _context;
        private readonly IConfiguration _configuration;
        private static User _user = new User();


        public AuthController(TodoContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/Auth/register
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            if (await IsExist(request.Username))
            {
                return Conflict("Username is used");
            }
                _user.Username = request.Username;
                _user.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);
                _context.users.Add(_user);
                await _context.SaveChangesAsync();            
            return CreatedAtAction(nameof(AuthController.Register), "Auth", null, _user);
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            if (! await IsExist(request.Username))
            {
                return BadRequest("Username does not exist");
            }
            User user = GetUser(request.Username);
            if(! BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return BadRequest("Password doesn't correct");
            }
            return Ok(CreateToken(user));
        }

        private async Task<bool> IsExist(string username)
        {
            return await _context.users.AnyAsync(u => u.Username == username);
        }

        private User GetUser(string username)
        {
            return _context.users.FirstOrDefault(_user => _user.Username == username);
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value));
            var credetial = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: credetial);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
        
    }
}
