using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AdminESR.Context;
using AdminESR.Models;
using System.Web;

namespace AdminESR.Controllers
{
    public class EventMailsController : ApiController
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        // GET: api/EventMails 
        public List<Emails> GetEmailDetails(string check)
        {
            List<Emails> li = new List<Emails>(); 
            var emails = obj.Emails.Where(x =>x.EmailCheck == check).ToList(); 
            foreach (var details in emails)
            {
                Emails temp = new Emails();
                temp.Body = details.body;
                temp.Subject = details.subject;
                temp.Id = details.Id;
                li.Add(temp);
            } 
            return li;
        } 
        public int PostEmail()
        {
            var check = 0;
            var body = HttpContext.Current.Request["Message"];
            var subject = HttpContext.Current.Request["Subject"];  
            var Id = HttpContext.Current.Request["EmailAuthenticationId"];  
            try
            {
                Email email = obj.Emails.First(x => x.Id.Equals(Int32.Parse(Id)));
                email.body = body;
                email.subject = subject;
                obj.SubmitChanges();
                check = 1;
            }
            catch(Exception e) { }

            return check;
        }

    }
}
