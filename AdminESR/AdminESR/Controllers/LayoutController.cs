using AdminESR.Models;
using AdminESR.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AdminESR.Controllers
{
    public class LayoutController : ApiController
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        // GET: api/Layout
        public List<ESR> GetAllNames()
        {
            List<ESR> li = new List<ESR>(); 
            var All = obj.Restaurants.ToList(); 
            foreach (var details in All)
            {
                try
                { 
                ESR temp = new ESR();
                temp.Name = details.Name;
                li.Add(temp);
                //ESR temp1 = new ESR();
                //temp.Name = details.Area;
                //li.Add(temp1);
                }catch(Exception e) { }

            }
            return li;
        }

    }
}
