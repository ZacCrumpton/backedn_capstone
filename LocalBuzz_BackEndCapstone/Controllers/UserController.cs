using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LocalBuzz_BackEndCapstone.Data;
using LocalBuzz_BackEndCapstone.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LocalBuzz_BackEndCapstone.Controllers
{
    [Route("api/user")]
    [ApiController]
    //[Authorize]
    public class UserController : FirebaseEnabledController
    {
        readonly UserRepository _repo;

        readonly ArtistRepository _artistRepo;

        public UserController(UserRepository repo, ArtistRepository aRepo)
        {
            _repo = repo;
            _artistRepo = aRepo;
        }
        // GET: api/<UserController>
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var AllUsers = _repo.GetAll();
            return Ok(AllUsers);
        }

        [HttpGet("{userid}")]
        public IActionResult GetUserById(int userId)
        {
            var singleUser = _repo.GetById(userId);
            return Ok(singleUser);
        }

        // GET api/<UserController>/5
        [HttpGet("single")]

        public IActionResult GetUserByUid()
        {
            var currentUserId = _repo.GetIdByUid(UserId);

            var singleUser = _repo.GetById(currentUserId);

            // return NotFound("No user with that ID was found")
            if (singleUser == null)
            {
                var currentArtistId = _artistRepo.GetIdByUid(UserId);
                var singleArtist = _artistRepo.GetById(currentArtistId);
                return Ok(singleArtist);
            }
            return Ok(singleUser);
        }

        [HttpGet("{uid}/artist")]
        [AllowAnonymous]
        public IActionResult GetArtistsState()
        {
            var artists = _repo.GetArtistsByState(UserId);
            return Ok(artists);
        }

        // POST api/<UserController>
        [HttpPost]
        [AllowAnonymous]
        public IActionResult AddNewUser(User userToAdd)
        {
            _repo.AddUser(userToAdd);
            return Created($"/ api / user /{ userToAdd.UserId }", userToAdd);

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
