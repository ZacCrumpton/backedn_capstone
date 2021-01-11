using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocalBuzz_BackEndCapstone.Data;
using LocalBuzz_BackEndCapstone.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LocalBuzz_BackEndCapstone.Controllers
{
    [Route("api/artist")]
    [ApiController]
    [Authorize]
    public class ArtistController : FirebaseEnabledController
    {

        readonly ArtistRepository _repo;

        public ArtistController(ArtistRepository repo)
        {
            _repo = repo;
        }

        // GET: api/<ArtistController>
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAllArtist()
        {
            var allArtists = _repo.GetALL();
            return Ok(allArtists);
        }

        // GET api/<ArtistController>/5
        [HttpGet("single")]
        [AllowAnonymous]
        public IActionResult GetArtistById(int artistId)
        {
            var currentArtistId = _repo.GetIdByUid(UserId);
            var singleArtist = _repo.GetById(artistId);
            if (singleArtist == null) return NotFound("No artist with that ID was found");

            return Ok(singleArtist);
        }

        [HttpGet("{uid}/posts")]
        [AllowAnonymous]
        public IActionResult GetUsersPosts(string uid)
        {
            var posts = _repo.GetPostByUid(uid);

            return Ok(posts);
        }

        [HttpGet("{uid}/events")]
        [AllowAnonymous]
        public IActionResult GetUsersEvents(string uid)
        {
            var events = _repo.GetEventsByUid(uid);
            return Ok(events);
        }

        // POST api/<ArtistController>
        [HttpPost]
        [AllowAnonymous]
        public IActionResult AddNewArtist(Artist artistToAdd)
        {
            _repo.AddArtist(artistToAdd);
            return Created($"/api/a rtist/{ artistToAdd.ArtistId }", artistToAdd);
        }

        // PUT api/<ArtistController>/5
        [HttpPut("{artistid}")]
        
        public IActionResult UpdateArtist(int artistId, Artist artistToUpdate)
        {
            var updatedArtist = _repo.Update(artistId, artistToUpdate);

            return Ok(updatedArtist);
        }

        // DELETE api/<ArtistController>/5
        [HttpDelete("{artistid}")]
        public IActionResult Delete(int artistid)
        {
            if (_repo.GetById(artistid) == null)
            {
                NotFound();
            }

            _repo.Remove(artistid);
            return Ok();

        }
    }
}
