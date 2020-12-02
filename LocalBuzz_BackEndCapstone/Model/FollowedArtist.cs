using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalBuzz_BackEndCapstone.Model
{
    public class FollowedArtist
    {
        public int FollowedArtistId { get; set; }
        public int BeingFollowed { get; set; }
        public int Follower { get; set; }
    }
}
