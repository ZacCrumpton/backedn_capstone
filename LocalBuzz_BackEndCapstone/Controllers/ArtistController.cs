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
    [Route("api/artist")]
    [ApiController]
    public class ArtistController : ControllerBase
    {

        readonly ArtistRepository _repo;

        public ArtistController(ArtistRepository repo)
        {
            _repo = repo;
        }

        // GET: api/<ArtistController>
        [HttpGet]
        public IActionResult GetAllArtist()
        {
            var allArtists = _repo.GetALL();
            return Ok(allArtists);
        }

        // GET api/<ArtistController>/5
        [HttpGet("{artistId}")]
        public IActionResult GetArtistById(int artistId)
        {
            var singleArtist = _repo.GetById(artistId);
            if (singleArtist == null) return NotFound("No artist with that ID was found");

            return Ok(singleArtist);
        }

        // POST api/<ArtistController>
        [HttpPost]
        public IActionResult AddNewArtist(Artist artistToAdd)
        {
            _repo.AddArtist(artistToAdd);
            return Created($"/ api / artists /{ artistToAdd.ArtistId }", artistToAdd);
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
        public void Delete(int id)
        {
        }
    }
}
