using AdminESR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AdminESR.Context;

namespace AdminESR.Controllers
{
    public class DealsController : ApiController
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        public List<ESR> GetAllClassesNames()
        {
            List<ESR> li = new List<ESR>();

            var All = obj.Deals.Where(x => x.Status != 0).ToList();

            foreach (var details in All)
            {
                ESR temp = new ESR();
                temp.Name = details.Description;
                li.Add(temp);
            }
            return li;
        }
        public List<DealsClass> GetAllDeals(int id)
        {
            int ShowRecords = 30;
            int skip = id * ShowRecords;
            var DesiMasala = "";

            var  Records = obj.Deals.Where(x => x.Status != 0).ToList();
            var AllRecords = Records.Count();
            int max = (skip + ShowRecords);
            if (max > AllRecords)
            {
                max = AllRecords;
            }
            DesiMasala = (skip + 1).ToString() + "-" + max.ToString() + "/" + AllRecords.ToString();

            List<DealsClass> li = new List<DealsClass>();

            var AllDeals =  Records.Skip(skip).Take(ShowRecords).Where(x => x.Status != 0).ToList();
            var count = AllDeals.Count();
            foreach (var details in AllDeals)
            {
                DealsClass temp = new DealsClass();
                temp.Id = details.Id;
                temp.AddDate = details.AddDate;
                temp.Description = details.Description;
                temp.Count = count;
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
        public List<DealsClass> GetAllDealsByName(string id)
        {
            List<DealsClass> li = new List<DealsClass>();

            var AllDeals = obj.Deals.Where(x => x.Status != 0 && x.Description.Equals(id)).ToList();
            var count = AllDeals.Count();
            foreach (var details in AllDeals)
            {
                DealsClass temp = new DealsClass();
                temp.Id = details.Id;
                temp.AddDate = details.AddDate;
                temp.Description = details.Description;
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }

        public List<DealsClass> GetAllDealsById(int id)
        {
            List<DealsClass> li = new List<DealsClass>();

            var AllDeals = obj.Deals.Where(x => x.Status != 0 && x.Id.Equals(id)).ToList();
            var count = AllDeals.Count();
            foreach (var details in AllDeals)
            {
                DealsClass temp = new DealsClass();
                temp.Id = details.Id;
                temp.Description = details.Description;
                temp.Count = count;
                temp.AddDate = details.AddDate;
                li.Add(temp);
            }
            return li;
        }
        public int PostDeals(DealsClass DC)
        {
            int check = 0;
            try
            {
                Deal Deals = new Deal();
                Deals.Description = DC.Description;
                Deals.Status = 1;
                Deals.AddDate = DateTime.Now.ToShortDateString();
                obj.Deals.InsertOnSubmit(Deals);
                obj.SubmitChanges();
                check = Deals.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public int UpdateDeals(DealsClass DC)
        {
            int check = 0;
            try
            {
                Deal Deals = obj.Deals.First(x=>x.Id.Equals(DC.Id));
                Deals.Description = DC.Description;
                Deals.Status = 1; 
                obj.SubmitChanges();
                check = Deals.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public int DeleteDeals(int id)
        {
            int check = 0;
            try
            {
                Deal Deals = obj.Deals.First(x => x.Id.Equals(id));
                Deals.Status = 0;
                obj.SubmitChanges();
                check = 1;
            }
            catch (Exception e) { }

            return check;
        }
    }
}
