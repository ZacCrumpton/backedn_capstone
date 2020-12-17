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
    [Route("api/followedevents")]
    [ApiController]
    [Authorize]
    public class FollowedEventsController : ControllerBase
    {

        readonly FollowedEventRepository _repo;

        public FollowedEventsController(FollowedEventRepository repo)
        {
            _repo = repo;
        }
        // GET: api/<FollowedEventsController>
        [HttpGet]
        public IActionResult GetAllFollowedEvents()
        {
            var allFE = _repo.GetAll();
            return Ok(allFE);
        }

        // GET api/<FollowedEventsController>/5
        [HttpGet("{followedeventsid}")]
        public IActionResult GetFollowedEventsById(int followedEventsId)
        {
            var singleFE = _repo.GetById(followedEventsId);
            if (singleFE == null) return NotFound("No Followed Event Connection with that ID was found");

            return Ok(singleFE);
        }

        // POST api/<FollowedEventsController>
        [HttpPost]
        public IActionResult AddFollowedEvent(FollowedEvents followedEventToAdd)
        {
            _repo.AddFollowedEvent(followedEventToAdd);
            return Created($"/ api / followedevents /{ followedEventToAdd.FollowedEventsId}", followedEventToAdd);

        }

        // PUT api/<FollowedEventsController>/5
        [HttpPut("{followedeventsid}")]
        public IActionResult UpdateFollowedEvent(int followedEventsId, FollowedEvents feToUpdate)
        {
            var updatedFE = _repo.Update(followedEventsId, feToUpdate);

            return Ok(updatedFE);
        }

        // DELETE api/<FollowedEventsController>/5
        [HttpDelete("{followedeventsid}")]
        public IActionResult Delete(int followedEventsId)
        {
            if(_repo.GetById(followedEventsId) == null)
            {
                NotFound();
            }

            _repo.Remove(followedEventsId);
            return Ok();
        }
    }
}
