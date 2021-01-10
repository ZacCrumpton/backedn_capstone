using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LocalBuzz_BackEndCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class FirebaseEnabledController : ControllerBase
    {
        protected string UserId => new String(User.FindFirst(x => x.Type == "user_id").Value);
    }
}
