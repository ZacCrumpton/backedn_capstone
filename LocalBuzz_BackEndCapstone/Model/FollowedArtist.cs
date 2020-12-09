using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalBuzz_BackEndCapstone.Model
{
    public class FollowedArtist
    {
        public int FollowedArtistId { get; set; }
        public int BeingFollowedId { get; set; }
        public int FollowerId { get; set; }
    }
}
