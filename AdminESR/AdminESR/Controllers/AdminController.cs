using AdminESR.Context; 
using AdminESR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc; 
using System.Web.Security; 
 
namespace AdminESR.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        //
        // GET: /Admin/
        DataClasses1DataContext obj = new DataClasses1DataContext(); 
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult TicketBookings()
        {
            return View();
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult adminPage()//adminlogin a
        {  
           return View(); 
        }

        //Partial Views

        //FirstPage to Open 
        //FirstPage to Open  
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult firstPageToOpen()
        {  
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();

            return PartialView(); 
        }
        [Authorize(Roles = "Admin,Editor")]
        public ActionResult Analaytics()
        { 
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();

            return PartialView();
                 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult ContestDetails()
        { 
             return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult CareerDetails()
        {
            return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult DealDetails()
        { 
           return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult ClientDetails()
        { 
           return PartialView();
                  
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult EventDetails()
        {  
            return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult NewDetails()
        { 
          return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult PakageDetails()
        {
           return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult RestaurantDetails()
        {
             return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult ServiceDetails()
        {
            return PartialView();
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult TagDetails()
        {
            return PartialView();
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult UserDetails()
        {
            return PartialView();
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult AdminDetails()
        {
            return PartialView();
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult Messages()
        {
            return PartialView();
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult CareerUpdates()
        { 
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();
            return PartialView(); 
        }

         [Authorize(Roles = "Admin,Editor")]
        public ActionResult ContestUpdate()
        { 
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();
            return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult AdminUpdate()
        { 
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();
            return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult ClientUpdate()
        { 
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();
            return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult EventUpdate()
        { 
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();
            return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult NewUpdate()
        { 
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();
            return PartialView();  
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult PakageUpdate()
        { 
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();
            return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult RestaurantUpdate()
        { 
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();
            return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult ServiceUpdate()
        { 
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();
            return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult TagUpdate()
        { 
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();
            return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult DealUpdate()
        { 
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();
            return PartialView(); 
        }
         [Authorize(Roles = "Admin,Editor")]
        public ActionResult UserUpdate()
        {
            var count1 = obj.Users.Where(x => x.Status != 0).ToList();
            var count2 = obj.Clients.Where(x => x.Status != 0).ToList();
            var count3 = obj.Pakages.Where(x => x.Status != 0).ToList();
            var count4 = obj.Events.Where(x => x.Status != 0).ToList();

            ViewBag.UsersCount = count1.Count();
            ViewBag.ClientsCount = count2.Count();
            ViewBag.PakagesCount = count3.Count();
            ViewBag.EventsCount = count4.Count();
            return PartialView(); 
        }

    }
}