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
    public class ServicesController : ApiController
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        public List<ESR> GetAllServicesNames()
        {
            List<ESR> li = new List<ESR>();

            var All = obj.Services.Where(x => x.Status != 0).ToList();

            foreach (var details in All)
            {
                ESR temp = new ESR();
                temp.Name = details.Name;
                li.Add(temp);
            }
            return li;
        }
        public List<ServicesClass> GetAllServices()
        {
            List<ServicesClass> li = new List<ServicesClass>();

            var AllServices = obj.Services.Where(x => x.Status != 0).ToList();
            var count = AllServices.Count();
            foreach (var details in AllServices)
            {
                ServicesClass temp = new ServicesClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.Description = details.Description;
                temp.AddDate = details.AddDate;
                li.Add(temp);
            }
            return li;
        }

     public List<ServicesClass> GetAllServices(int id)
        {
            int ShowRecords = 30;
            int skip = id * ShowRecords;
            var DesiMasala = "";

            var  Records = obj.Services.Where(x => x.Status != 0).ToList();
            var AllRecords = Records.Count();
            int max = (skip + ShowRecords);
            if (max > AllRecords)
            {
                max = AllRecords;
            }
            DesiMasala = (skip + 1).ToString() + "-" + max.ToString() + "/" + AllRecords.ToString();

            List<ServicesClass> li = new List<ServicesClass>();

            var AllServices = Records.Skip(skip).Take(ShowRecords).Where(x => x.Status != 0).ToList();
            var count = AllServices.Count();
            foreach (var details in AllServices)
            {
                ServicesClass temp = new ServicesClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.Description = details.Description;
                temp.Count = count;
                temp.AddDate = details.AddDate;
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
        public List<ServicesClass> GetAllServicesByName(string id)
        {
            List<ServicesClass> li = new List<ServicesClass>();

            var AllServices = obj.Services.Where(x => x.Status != 0 && x.Name.Equals(id)).ToList();
            var count = AllServices.Count();
            foreach (var details in AllServices)
            {
                ServicesClass temp = new ServicesClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.AddDate = details.AddDate;
                temp.Description = details.Description;
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }

        public List<ServicesClass> GetAllServicesById(int id)
        {
            List<ServicesClass> li = new List<ServicesClass>();

            var AllServices = obj.Services.Where(x => x.Status != 0 && x.Id.Equals(id)).ToList();
            var count = AllServices.Count();
            foreach (var details in AllServices)
            {
                ServicesClass temp = new ServicesClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.AddDate = details.AddDate;
                temp.Description = details.Description;
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }

        public int PostService(ServicesClass SC)
        {
            int check = 0;
            try
            {
                Service service = new Service();
                service.Name = SC.Name;
                service.Description = SC.Description;
                service.Status = 1;
                service.AddDate = DateTime.Now.ToShortDateString();
                obj.Services.InsertOnSubmit(service);
                obj.SubmitChanges();
                check = service.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public int UpdateService(ServicesClass SC)
        {
            int check = 0;
            try
            {
                Service service = obj.Services.First(x=>x.Id.Equals(SC.Id));
                service.Name = SC.Name;
                service.Description = SC.Description;
                service.Status = 1;
              
                obj.SubmitChanges();
                check = service.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public int DeleteService(int id)
        {
            int check = 0;
            try
            {
                Service services = obj.Services.First(x => x.Id.Equals(id));
                services.Status = 0;
                obj.SubmitChanges();
                check = 1;
            }
            catch (Exception e) { }

            return check;
        }
    }
}
