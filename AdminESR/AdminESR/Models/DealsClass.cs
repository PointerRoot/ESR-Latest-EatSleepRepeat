using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminESR.Models
{
    public class DealsClass
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Next { get; set; }
        public int Prev { get; set; }
        public int Count { get; set; }
        public string NumberOfShowing { get; set; }
        public string AddDate { get; set; }
    }
}