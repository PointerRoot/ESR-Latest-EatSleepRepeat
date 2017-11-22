using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AdminESR.Context;
using AdminESR.Models;
using System.Web.Security;

namespace AdminESR.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        // GET: Home
        [Authorize(Roles = "All")]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Contests()
        {
            List<string> upperCarousel = new List<string>();
            List<string> lowerCarousel = new List<string>();
            var clients = obj.Clients.Where(x => x.Status != 0 && x.Image != null).ToList();

            foreach (var details in clients)
            {
                var clientPackages = obj.ClientPakages.Where(x => x.ClientId.Equals(details.Id)).ToList();
                foreach (var details1 in clientPackages)
                {
                    if (details1.Pakage.PakageType == "gold")
                    {
                        upperCarousel.Add(details.Image);
                    }
                    else if (details1.Pakage.PakageType == "silver")
                    {
                        lowerCarousel.Add(details.Image);
                    }
                }

            }

            ViewBag.upperCarousel = upperCarousel;
            ViewBag.lowerCarousel = lowerCarousel;
            Client obj2 = new Client();
            var data2 = obj.Clients.Where(x => x.Status != 0 && x.Image != null).ToList();
            ViewBag.details1 = data2;
            return View();
        }

        public ActionResult Events()
        {
            List<string> upperCarousel = new List<string>();
            List<string> lowerCarousel = new List<string>();
            var clients = obj.Clients.Where(x => x.Status != 0 && x.Image != null).ToList();

            foreach (var details in clients)
            {
                var clientPackages = obj.ClientPakages.Where(x => x.ClientId.Equals(details.Id)).ToList();
                foreach (var details1 in clientPackages)
                {
                    if (details1.Pakage.PakageType == "gold")
                    {
                        upperCarousel.Add(details.Image);
                    }
                    else if (details1.Pakage.PakageType == "silver")
                    {
                        lowerCarousel.Add(details.Image);
                    }
                }

            }

            ViewBag.upperCarousel = upperCarousel;
            ViewBag.lowerCarousel = lowerCarousel;
            Client obj2 = new Client();
            var data2 = obj.Clients.Where(x => x.Status != 0 && x.Image != null).ToList();
            ViewBag.details1 = data2;
            return View();
        }

        public ActionResult Gallery()
        {
            List<string> upperCarousel = new List<string>();
            List<string> lowerCarousel = new List<string>();
            var clients = obj.Clients.Where(x => x.Status != 0 && x.Image != null).ToList();

            foreach (var details in clients)
            {
                var clientPackages = obj.ClientPakages.Where(x => x.ClientId.Equals(details.Id)).ToList();
                foreach (var details1 in clientPackages)
                {
                    if (details1.Pakage.PakageType == "gold")
                    {
                        upperCarousel.Add(details.Image);
                    }
                    else if (details1.Pakage.PakageType == "silver")
                    {
                        lowerCarousel.Add(details.Image);
                    }
                }

            }

            ViewBag.upperCarousel = upperCarousel;
            ViewBag.lowerCarousel = lowerCarousel;
            Client obj2 = new Client();
            var data2 = obj.Clients.Where(x => x.Status != 0 && x.Image != null).ToList();
            ViewBag.details1 = data2;
            return View();
        }

        public ActionResult Restaurants()
        {
            List<string> upperCarousel = new List<string>();
            List<string> lowerCarousel = new List<string>();
            var clients = obj.Clients.Where(x => x.Status != 0 && x.Image != null).ToList();

            foreach (var details in clients)
            {
                var clientPackages = obj.ClientPakages.Where(x => x.ClientId.Equals(details.Id)).ToList();
                foreach (var details1 in clientPackages)
                {
                    if (details1.Pakage.PakageType == "gold")
                    {
                        upperCarousel.Add(details.Image);
                    }
                    else if (details1.Pakage.PakageType == "silver")
                    {
                        lowerCarousel.Add(details.Image);
                    }
                }

            }

            ViewBag.upperCarousel = upperCarousel;
            ViewBag.lowerCarousel = lowerCarousel;
            Client obj2 = new Client();
            var data2 = obj.Clients.Where(x => x.Status != 0 && x.Image != null).ToList();
            ViewBag.details1 = data2;
            try
            {
                HttpCookie authCookie = Request.Cookies["userteripengfkansdHello1234hytusksdbsdfasdjasdidasdijnasd"];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);

                string cookiePath = ticket.CookiePath;
                DateTime expiration = ticket.Expiration;
                bool expired = ticket.Expired;
                bool isPersistent = ticket.IsPersistent;
                DateTime issueDate = ticket.IssueDate;
                string CookieId = ticket.Name;
                string userData = ticket.UserData;
                int version = ticket.Version;

                if (!expired)
                {
                    ViewBag.UserId = CookieId;
                }
                else
                {
                    ViewBag.UserId = 0;
                }
                return View();
            }
            catch (Exception ex) { return View(); }
        }

        public ActionResult AboutUs()
        {
            List<string> upperCarousel = new List<string>();
            List<string> lowerCarousel = new List<string>();
            var clients = obj.Clients.Where(x => x.Status != 0 && x.Image != null).ToList();

            foreach (var details in clients)
            {
                var clientPackages = obj.ClientPakages.Where(x => x.ClientId.Equals(details.Id)).ToList();
                foreach (var details1 in clientPackages)
                {
                    if (details1.Pakage.PakageType == "gold")
                    {
                        upperCarousel.Add(details.Image);
                    }
                    else if (details1.Pakage.PakageType == "silver")
                    {
                        lowerCarousel.Add(details.Image);
                    }
                }

            }

            ViewBag.upperCarousel = upperCarousel;
            ViewBag.lowerCarousel = lowerCarousel;
            Client obj2 = new Client();
            var data2 = obj.Clients.Where(x => x.Status != 0 && x.Image != null).ToList();
            ViewBag.details1 = data2;

            return View();
        }

    }
}