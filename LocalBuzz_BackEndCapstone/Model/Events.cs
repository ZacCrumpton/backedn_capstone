using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalBuzz_BackEndCapstone.Model
{
    public class Events
    {
        public int EventId { get; set; }
        public int ArtistId { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public DateTime Date { get; set; }
        public int TicketPrice { get; set; }
        public string fbUid { get; set; }
    }
}
