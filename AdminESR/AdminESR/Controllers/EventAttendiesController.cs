using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AdminESR.Models;
using AdminESR.Context;
 
namespace AdminESR.Controllers
{
    public class EventAttendiesController : ApiController
    {
        DataClasses1DataContext obj = new DataClasses1DataContext(); 
        // GET: api/EventAttendies
        public List<ESR> GetAllApplicantsNames(int Id)
        {
            List<ESR> li = new List<ESR>(); 
            var All = obj.TicketBookings.Where(x=>x.eventId.Equals(Id)).ToList(); 
            foreach (var details in All)
            {
                ESR temp = new ESR();
                temp.Name = details.name + "$" + Id;
                li.Add(temp);
            }
            return li;
        } 
        public List<TicketBook> GetAllAttendiesByEvent(int Id)
        {
            List<TicketBook> li = new List<TicketBook>();
             
            var AllApplicants = obj.TicketBookings.Where(x => x.eventId.Equals(Id)).ToList();
            var count = AllApplicants.Count();
            foreach (var details in AllApplicants)
            {
                try
                {
                    TicketBook temp = new TicketBook();
                    temp.Id = details.Id;
                    temp.Name = details.name;
                    temp.Tickets = details.tickets.Value;
                    temp.CNIC = details.cnic;
                    temp.EventId = details.eventId.Value;
                    temp.Email = details.email;
                    temp.Status = details.status; 
                    temp.Count = count; 
                    li.Add(temp);
                }
                catch(Exception e) { }
            }
            return li;
        }

        public List<TicketBook> GetAllAttendiesByName(string Id)
        {
            string[] Split = Id.Split('$');
            List<TicketBook> li = new List<TicketBook>();

            var AllApplicants = obj.TicketBookings.Where(x => x.eventId.Equals(Int32.Parse(Split[1])) && x.name.Equals(Split[0])).ToList();
            var count = AllApplicants.Count();
            foreach (var details in AllApplicants)
            {
                try
                {
                    TicketBook temp = new TicketBook();
                    temp.Id = details.Id;
                    temp.Name = details.name;
                    temp.Tickets = details.tickets.Value;
                    temp.CNIC = details.cnic;
                    temp.EventId = details.eventId.Value;
                    temp.Email = details.email;
                    temp.Status = details.status;
                    temp.Count = count;
                    li.Add(temp);
                }
                catch (Exception e) { }
            }
            return li;
        }
        public int DeleteEventAttendies(int id)
        {
            int check = 0;
            try
            {
                TicketBooking admin = obj.TicketBookings.First(x => x.Id.Equals(id));
                obj.TicketBookings.DeleteOnSubmit(admin);
                obj.SubmitChanges();
            }
            catch (Exception e) { } 
            return check;
        }

    }
}
