using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminESR.Models
{
    public class PakagesClass
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PakageType { get; set; }
        public double CostPerMonth { get; set; }
        public string ServicesIncluded { get; set; }
        public int ServiceId { get; set; }
        public string AddDate { get; set; }
        public string Priority { get; set; }
        public int Next { get; set; }
        public int Prev { get; set; }
        public int Count { get; set; }
        public string NumberOfShowing { get; set; }
    }
}