using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalBuzz_BackEndCapstone.Model
{
    public class Artist
    {
        public int ArtistId { get; set; }
        public string ArtistName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Genre { get; set; }
        public string ArtistPhoto { get; set; }
        public int Followers { get; set; }
        public bool isArtist { get; set; }
        

    }
}
