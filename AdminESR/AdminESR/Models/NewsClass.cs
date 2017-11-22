using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AdminESR.Models
{
    public class NewsClass
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int Next { get; set; }
        public int Prev { get; set; }
        public string NumberOfShowing { get; set; }
        public int Count { get; set; }
        public string AddDate { get; set; }
    }
}