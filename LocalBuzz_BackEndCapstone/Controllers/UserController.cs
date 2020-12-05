using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LocalBuzz_BackEndCapstone.Data;
using LocalBuzz_BackEndCapstone.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LocalBuzz_BackEndCapstone.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        readonly UserRepository _repo;

        public UserController(UserRepository repo)
        {
            _repo = repo;
        }
        // GET: api/<UserController>
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var AllUsers = _repo.GetAll();
            return Ok(AllUsers);
        }

        // GET api/<UserController>/5
        [HttpGet("{userId}")]
        public IActionResult GetUserById(int userId)
        {
            var singleUser = _repo.GetById(userId);
            if (singleUser == null) return NotFound("No user with that ID was found");

            return Ok(singleUser);
        }

        // POST api/<UserController>
        [HttpPost]
        public IActionResult AddNewUser(User userToAdd)
        {
            _repo.AddUser(userToAdd);
            return Created($"/ api / users /{ userToAdd.UserId }", userToAdd);

        }

        // PUT api/<UserController>/5
        [HttpPut("{userId}")]
        public IActionResult UpdateUser(int userId, User userToUpdate)
        {
            var updatedUser = _repo.Update(userId, userToUpdate);

            return Ok(updatedUser);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            if (_repo.GetById(userId) == null)
            {
                NotFound();
            }

            _repo.Remove(userId);
            return Ok();
        }
    }
}
