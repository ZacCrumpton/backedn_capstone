using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocalBuzz_BackEndCapstone.Data;
using LocalBuzz_BackEndCapstone.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LocalBuzz_BackEndCapstone.Controllers
{
    [Route("api/followedartist")]
    [ApiController]
    public class FollowedArtistController : ControllerBase
    {

        readonly FollowedArtistRepository _repo;
            
        public FollowedArtistController(FollowedArtistRepository repo)
        {
            _repo = repo;
        }

        // GET: api/<FollowedArtistController>
        [HttpGet]
        public IActionResult GetAllFA()
        {
            var allFA = _repo.GetAll();
            return Ok(allFA);
        }

        // GET api/<FollowedArtistController>/5
        [HttpGet("{followedartistId}")]
        public IActionResult GetFAById(int followedArtistId)
        {
            var singleFA = _repo.GetById(followedArtistId);
            if (singleFA == null) return NotFound("No Followed Artist Connection with that Id was found");

            return Ok(singleFA);
        }

        // POST api/<FollowedArtistController>
        [HttpPost]
        public IActionResult AddNewFA(FollowedArtist followedArtistToAdd)
        {
            _repo.AddFollowedArtist(followedArtistToAdd);
            return Created($"/ api / followedartist /{ followedArtistToAdd.FollowedArtistId }", followedArtistToAdd);
        }

        // PUT api/<FollowedArtistController>/5
        [HttpPut("{followedArtistId}")]
        public IActionResult UpdateFollowedArtist(int followedArtistId, FollowedArtist followedArtistToUpdate)
        {
            var updatedFA = _repo.Update(followedArtistId, followedArtistToUpdate);

            return Ok(updatedFA);
        }

        // DELETE api/<FollowedArtistController>/5
        [HttpDelete("{followedArtistId}")]
        public IActionResult DeleteFA(int followedArtistId)
        {
            if (_repo.GetById(followedArtistId) == null)
            {
                NotFound();
            }

            _repo.Remove(followedArtistId);
            return Ok();
        }
    }
}
