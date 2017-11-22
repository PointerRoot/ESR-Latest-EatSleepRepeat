using AdminESR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Net.Mail;
using System.Web.Mail;
using AdminESR.Context;
using System.Web.Helpers;

namespace AdminESR.Controllers
{
    public class EventsController : ApiController
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        public List<ESR> GetAllClassesNames()
        {
            List<ESR> li = new List<ESR>();

            var All = obj.Events.Where(x => x.Status != 0).ToList();

            foreach (var details in All)
            {
                ESR temp = new ESR();
                temp.Name = details.Name;
                li.Add(temp);
            }
            return li;
        }

        public List<EventsClass> GetAllEvents()
        {  

            List<EventsClass> li = new List<EventsClass>();

            var AllEvents = obj.Events.Where(x => x.Status != 0).ToList();
            var count = AllEvents.Count();
            foreach (var details in AllEvents)
            {
                EventsClass temp = new EventsClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.Place = details.Plcae;
                temp.Date = details.Date;
                try
                {
                    string[] start = details.Time.Split(':');
                    TimeSpan timespan = new TimeSpan(Int32.Parse(start[0]), Int32.Parse(start[1]), 00);
                    DateTime time = DateTime.Today.Add(timespan);
                    temp.Time = time.ToString("hh:mm tt");
                }
                catch (Exception e) { }
                try
                {
                    temp.TicketPrice = details.TicketPrice.Value;
                }
                catch (Exception e) { temp.TicketPrice = 0; }
                try
                {
                    temp.Discount = details.Discount.Value;
                }
                catch (Exception e) { temp.Discount = 0; } 
                temp.AddDate = details.AddDate;
                temp.Image = details.Image;
                temp.EventStatus = details.EventStatus; 
                li.Add(temp); 
            }
            return li;
        }

        public List<EventsClass> GetAllEvents(int id)
        {
            int ShowRecords = 30;
            int skip = id * ShowRecords;
            var DesiMasala = "";

            var Records = obj.Events.Where(x=>x.Status!= 0).ToList();
            var AllRecords = Records.Count();
            int max = (skip + ShowRecords);
            if (max > AllRecords)
            {
                max = AllRecords;
            }
            DesiMasala = (skip + 1).ToString() + "-" + max.ToString() + "/" + AllRecords.ToString();

            List<EventsClass> li = new List<EventsClass>();

            var AllEvents = Records.Skip(skip).Take(ShowRecords).Where(x => x.Status != 0).ToList();
            var count = AllEvents.Count();
            foreach (var details in AllEvents)
            {
                EventsClass temp = new EventsClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.Place = details.Plcae;
                temp.Date = details.Date;
                try
                {
                    string[] start = details.Time.Split(':');
                    TimeSpan timespan = new TimeSpan(Int32.Parse(start[0]), Int32.Parse(start[1]), 00);
                    DateTime time = DateTime.Today.Add(timespan);
                    temp.Time = time.ToString("hh:mm tt");
                }
                catch(Exception e) { }
                try
                {
                    temp.TicketPrice = details.TicketPrice.Value;
                }
                catch (Exception e) { temp.TicketPrice = 0; }
                try
                {
                    temp.Discount = details.Discount.Value;
                }
                catch (Exception e) { temp.Discount = 0; }
                temp.Count = count;
                temp.AddDate = details.AddDate;
                temp.EventStatus = details.EventStatus;
                temp.NumberOfShowing = DesiMasala;
                if (max >= AllRecords)
                    temp.Next = id;
                else
                    temp.Next = id + 1;
                if (id == 0)
                    temp.Prev = id;
                else
                    temp.Prev = id - 1;
                li.Add(temp);
            }
            return li;
        }  
        public List<EventsClass> GetAllEventsByName(string id)
        {
            List<EventsClass> li = new List<EventsClass>(); 
            var AllEvents = obj.Events.Where(x => x.Status != 0 && x.Name.Equals(id)).ToList();
            var count = AllEvents.Count();
            foreach (var details in AllEvents)
            {
                EventsClass temp = new EventsClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.Place = details.Plcae;
                temp.Date = details.Date;
                try
                {
                    string[] start = details.Time.Split(':');
                    TimeSpan timespan = new TimeSpan(Int32.Parse(start[0]), Int32.Parse(start[1]), 00);
                    DateTime time = DateTime.Today.Add(timespan);
                    temp.Time = time.ToString("hh:mm tt");
                }
                catch (Exception e) { }

                try
                {
                    temp.TicketPrice = details.TicketPrice.Value;
                }
                catch (Exception e) { temp.TicketPrice = 0; }
                try
                {
                    temp.Discount = details.Discount.Value;
                }
                catch (Exception e) { temp.Discount = 0; }
                temp.Count = count;
                temp.EventStatus = details.EventStatus;
                temp.AddDate = details.AddDate;
                li.Add(temp);
            }
            return li;
        }

        public List<EventsClass> GetAllEventsById(int id)
        {
            List<EventsClass> li = new List<EventsClass>();

            var AllEvents = obj.Events.Where(x => x.Status != 0 && x.Id.Equals(id)).ToList();
            var count = AllEvents.Count();
            foreach (var details in AllEvents)
            {
                EventsClass temp = new EventsClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.Place = details.Plcae;
                temp.Date = details.Date;
                temp.AdminTime = details.Time;
                try
                {
                    string[] start = details.Time.Split(':');
                    TimeSpan timespan = new TimeSpan(Int32.Parse(start[0]), Int32.Parse(start[1]), 00);
                    DateTime time = DateTime.Today.Add(timespan);
                    temp.Time = time.ToString("hh:mm tt");
                }
                catch (Exception e) { }
                try
                {
                    temp.TicketPrice = details.TicketPrice.Value;
                }
                catch (Exception e) { temp.TicketPrice = 0; }
                try
                {
                    temp.Discount = details.Discount.Value;
                }
                catch (Exception e) { temp.Discount = 0; }
                temp.Count = count;
                temp.AddDate = details.AddDate;
                temp.EventStatus = details.EventStatus;
                li.Add(temp);
            }
            return li;
        }  
        public string BookTicket()
        {
            string check = "true";

            string emails = HttpContext.Current.Request["Email"];
            string username = HttpContext.Current.Request["Username"];
           string cnic =  HttpContext.Current.Request["Cnic"];
            int tickets = int.Parse(HttpContext.Current.Request["Tickets"]);
            int eventId = int.Parse(HttpContext.Current.Request["EventId"]);
            try
            {
                TicketBooking events = new TicketBooking();
                events.name = username;
                events.eventId = (eventId);
                events.cnic = cnic;
                events.tickets = tickets;
                events.status = "false";
                events.email = emails;

                obj.TicketBookings.InsertOnSubmit(events);
                obj.SubmitChanges();

            }
            catch (Exception e) { check = "false"; }
            return check;

        } 
        public string PostMail(int id)
        {
            string check = ""; 
            string emails = HttpContext.Current.Request["Emails"];
            string message = HttpContext.Current.Request["Message"];
            string subject = HttpContext.Current.Request["Subject"];
            int Id= int.Parse(HttpContext.Current.Request["Id"]); 
            try
            {
                Email e = obj.Emails.First(x=>Id.Equals(x.Id));
                e.subject = subject;
                e.body = message; 
                obj.SubmitChanges();
                check = "true"; 
            }
            catch (Exception e)
            {
                check = "false"; 
            } 
            return check;
        }
        public int EventStatus()
        {
            var check = 0;
            var Id = HttpContext.Current.Request["Id"];
            var EventStatus = HttpContext.Current.Request["EventStatus"];
            try
            {
                Event evt = obj.Events.First(x => x.Id.Equals(Id));
                evt.EventStatus = EventStatus;
                obj.SubmitChanges();
                check = 1;
            }
            catch(Exception e) { check = 0; }
            return check;
        }
        public int PostEvent(EventsClass EC)
        {
            int check = 0;
            try
            {
                Event events = new Event();
                events.Name = EC.Name;
                events.Plcae = EC.Place;
                events.Date = EC.Date;
                events.Time = EC.Time;
                events.AddDate = DateTime.Now.ToShortDateString();
                events.TicketPrice = EC.TicketPrice;
                events.Discount = EC.Discount;
                events.Status = 1;
                obj.Events.InsertOnSubmit(events);
                obj.SubmitChanges();
                check = events.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public int UpdateEvent(EventsClass EC)
        {
            int check = 0;
            try
            {
                Event events = obj.Events.First(x=>x.Id.Equals(EC.Id));
                events.Name = EC.Name;
                events.Plcae = EC.Place;
                if (EC.Date != "")
                {
                    events.Date = EC.Date;
                }
                events.Time = EC.Time;
                events.TicketPrice = EC.TicketPrice;
                events.Discount = EC.Discount;
                events.Status = 1;
                
                obj.SubmitChanges();
                check = events.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public void PostImages()
        {
            var Id = HttpContext.Current.Request["EventId"];
            var typeOfImage = "";
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection
                var httpPostedFile = HttpContext.Current.Request.Files["EventImage"];
                string httpPostedFile1 = httpPostedFile.FileName;
                string[] httpPostedFile2 = httpPostedFile1.Split('.');
                typeOfImage = "." + httpPostedFile2[httpPostedFile2.Length - 1];

                if (httpPostedFile != null)
                {
                    WebImage img = new WebImage(httpPostedFile.InputStream);
                    if (img.Width > 1000)
                        img.Resize(1000, 1000);
                    img.Save(@"~\Content\Images\Events\" + (Id + typeOfImage));
                }
                try
                {
                    string image = "../../Content/Images/Events/" + Id.ToString() + typeOfImage.ToString();
                    Event events = obj.Events.First(x => x.Id.Equals(Id));
                    events.Image = image;
                    obj.SubmitChanges();
                }
                catch (Exception e) { }
            }

        }
        public int DeleteEvent(int id)
        {
            int check = 0;
            try
            {
                Event events = obj.Events.First(x => x.Id.Equals(id));
                events.Status = 0;
                obj.SubmitChanges();
                check = 1;
            }
            catch (Exception e) { }

            return check;
        }
    }
}
