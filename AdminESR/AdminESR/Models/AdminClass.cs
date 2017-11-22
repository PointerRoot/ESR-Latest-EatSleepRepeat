using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AdminESR.Models
{
    public class AdminClass
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string AddDate { get; set; }
        public int Count { get; set; }
        public int Next { get; set; }
        public int Prev { get; set; }
        public string NumberOfShowing { get; set; } 
    }
}