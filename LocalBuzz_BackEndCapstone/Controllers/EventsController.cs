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
    [Route("api/events")]
    [ApiController]
    [Authorize]

    public class EventsController : FirebaseEnabledController
    {
        readonly EventsRepository _repo;

        public EventsController(EventsRepository repo)
        {
            _repo = repo;
        }

        // GET: api/<EventsController>
        [HttpGet]
        public IActionResult GetAllEvents()
        {
            var allEvents = _repo.GetAll();
            return Ok(allEvents);
        }

        // GET api/<EventsController>/5
        [HttpGet("{eventId}")]
        public IActionResult GetEventById(int eventId)
        {
            var singleEvent = _repo.GetById(eventId);
            if (singleEvent == null) return NotFound("No event with that ID was found");

            return Ok(singleEvent);
        }

        // POST api/<EventsController>
        [HttpPost]
        public IActionResult AddNewEvent(Events eventToAdd)
        {
            _repo.AddEvent(eventToAdd);
            return Created($"/ api / events /{ eventToAdd.EventId }", eventToAdd);
        }

        // PUT api/<EventsController>/5
        [HttpPut("{eventId}")]
        public IActionResult UpdateEvent(int eventId,  Events eventToUpdate)
        {
            var updatedEvent = _repo.Update(eventId, eventToUpdate);

            return Ok(updatedEvent);
        }

        // DELETE api/<EventsController>/5
        [HttpDelete("{eventId}")]
        public IActionResult Delete(int eventId)
        {
            if (_repo.GetById(eventId) == null)
            {
                NotFound();
            }

            _repo.Remove(eventId);
            return Ok();
        }
    }
}
