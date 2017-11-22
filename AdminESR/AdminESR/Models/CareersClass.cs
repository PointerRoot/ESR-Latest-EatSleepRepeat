using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AdminESR.Models
{
    public class CareersClass
    {
        public int Id { get; set; }
        public string PositionTitle { get; set; }
        public string Responsibilities { get; set; }
        public string Requirments { get; set; }
        public string AddDate { get; set; }
        public int Next { get; set; }
        public int Prev { get; set; }
        public string NumberOfShowing { get; set; }
        public int Count { get; set; }
    }
}