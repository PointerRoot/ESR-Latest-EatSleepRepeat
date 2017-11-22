using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminESR.Models
{
    public class Emails
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string EmailCheck { get; set; }
    }
}