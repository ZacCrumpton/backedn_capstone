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
    [Route("api/post")]
    [ApiController]
    public class PostController : FirebaseEnabledController
    {

        readonly PostRepository _repo;

        public PostController(PostRepository repo)
        {
            _repo = repo;
        }

        // GET: api/<PostController>
        [HttpGet]
        public IActionResult GetAllPosts()
        {
            var allPost = _repo.GetAll();
            return Ok(allPost);
        }

        // GET api/<PostController>/5
        [HttpGet("{postid}")]
        public IActionResult GetPostById(int postId)
        {
            var singlePost = _repo.GetById(postId);
            if (singlePost == null) return NotFound("No post with that ID was found");

            return Ok(singlePost);
        }

        [HttpGet]

        // POST api/<PostController>
        [HttpPost]
        public IActionResult AddNewPost(Post postToAdd)
        {
            _repo.AddPost(postToAdd);
            return Created($"/ api / post /{ postToAdd.PostId}", postToAdd);
        }

        // PUT api/<PostController>/5
        [HttpPut("{postid}")]
        public IActionResult UpdatePost(int postId, Post postToUpdate)
        {
            var updatedPost = _repo.Update(postId, postToUpdate);

            return Ok(updatedPost);
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{postid}")]
        public IActionResult Delete(int postId)
        {
            if (_repo.GetById(postId) == null)
            {
                NotFound();
            }

            _repo.Remove(postId);
            return Ok();
        }
    }
}
