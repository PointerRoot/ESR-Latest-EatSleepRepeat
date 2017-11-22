using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminESR.Models
{
    public class RestVisitClass
    {
        public int Id { get; set; }
        public int RestaurantId { get; set; }
        public int UserId { get; set; }
        public string Date { get; set; }
        public int count { get; set; }
    }
}