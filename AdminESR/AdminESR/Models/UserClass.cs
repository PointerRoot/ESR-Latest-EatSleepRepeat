using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminESR.Models
{
    public class UserClass
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Image { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Address { get; set; }
        public int Next { get; set; }
        public int Prev { get; set; }
        public int Count { get; set; }
        public string NumberOfShowing { get; set; }
        public string AddDate { get; set; }
    }
}