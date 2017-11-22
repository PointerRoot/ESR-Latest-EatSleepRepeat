using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminESR.Models
{
    public class ContestsClass
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int EntriesCount { get; set; }
        public string WinnerName { get; set; }
        public string Reward { get; set; }
        public string Image { get; set; }
        public string Date { get; set; }
        public int Next { get; set; }
        public int Prev { get; set; }
        public string NumberOfShowing { get; set; }
        public int Count { get; set; }
        public string AddDate { get; set; }
    }
}