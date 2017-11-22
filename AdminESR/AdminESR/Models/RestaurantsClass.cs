using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminESR.Models
{
    public class RestaurantsClass
    {
        public int Id { get; set; }
        public int TagId { get; set; }
        public int DealId { get; set; }
        public string Deals { get; set; }
        public string Tags { get; set; }
        public string Name { get; set; }
        public string Area { get; set; }
        public double Discount { get; set; }
        public int Next { get; set; }
        public int Prev { get; set; }
        public int Count { get; set; }
        public string NumberOfShowing { get; set; }
        public string AddDate { get; set; }
    }
}