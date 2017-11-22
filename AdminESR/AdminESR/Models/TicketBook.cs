using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminESR.Models
{
    public class TicketBook
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string CNIC { get; set; } 
        public int Tickets { get; set; }
        public int EventId { get; set; }
        public string Status { get; set; }
        public int Count { get; set; }
    }
}