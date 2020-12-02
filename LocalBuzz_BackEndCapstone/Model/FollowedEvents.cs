using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalBuzz_BackEndCapstone.Model
{
    public class FollowedEvents
    {
        public int FollowedEventsId { get; set; }
        public int EventId { get; set; }
        public int UserId { get; set; }
    }
}
