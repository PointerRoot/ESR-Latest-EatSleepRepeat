using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminESR.Models
{
    public class EventsClass
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Place { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Image { get; set; }
        public string AdminTime { get; set; }
        public double Discount { get; set; }
        public int EventOnStatus { get; set; }
        public double TicketPrice { get; set; }
        public string EventStatus { get; set; }
        public int Next { get; set; }
        public int Prev { get; set; }
        public int Count { get; set; }
        public string NumberOfShowing { get; set; }
        public string AddDate { get; set; }
    }
}