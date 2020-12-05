using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalBuzz_BackEndCapstone.Model
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public bool isUser { get; set; }
        public string UserPhoto { get; set; }
        public DateTime DoB { get; set; }
    }
}
