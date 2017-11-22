using  AdminESR.Models;
using AdminESR.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AdminESR.Controllers
{
    public class CareersController : ApiController
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        public List<ESR> GetAllCareerNames()
        {
            List<ESR> li = new List<ESR>();

            var All = obj.Careers.Where(x => x.Status != 0).ToList();

            foreach (var details in All)
            {
                ESR temp = new ESR();
                temp.Name = details.PositionTitle;
                li.Add(temp);
            }
            return li;
        }
        public List<CareersClass> GetAllCareers(int id)
        {
            int ShowRecords = 30;
            int skip = id * ShowRecords;
            var DesiMasala = "";

            var AllRecords = obj.Careers.Where(x=>x.Status != 0);
            var Records = AllRecords.Count();
            int max = (skip + ShowRecords);
            if (max > Records)
            {
                max = Records;
            }
            DesiMasala = (skip + 1).ToString() + "-" + max.ToString() + "/" + Records.ToString();

            List<CareersClass> li = new List<CareersClass>();

            var AllCareers = AllRecords.Skip(skip).Take(ShowRecords).Where(x => x.Status != 0).ToList();
            var count = AllCareers.Count();
            foreach (var details in AllCareers)
            {
                CareersClass temp = new CareersClass();
                temp.Id = details.Id;
                temp.PositionTitle = details.PositionTitle;
                temp.Responsibilities = details.Responsibilities;
                temp.Requirments = details.Requirments;
                if (max >= Records)
                    temp.Next = id;
                else
                    temp.Next = id + 1;
                if (id == 0)
                    temp.Prev = id;
                else
                    temp.Prev = id - 1;
                temp.Count = count;
                temp.AddDate = details.AddDate;
                temp.NumberOfShowing = DesiMasala;
                li.Add(temp);
            }
            return li;
        }
        public List<CareersClass> GetAllCareersByName(string id)
        {
            List<CareersClass> li = new List<CareersClass>();

            var AllCareers = obj.Careers.Where(x => x.Status != 0 && x.PositionTitle.Equals(id)).ToList();
            var count = AllCareers.Count();
            foreach (var details in AllCareers)
            {
                CareersClass temp = new CareersClass();
                temp.Id = details.Id;
                temp.PositionTitle = details.PositionTitle;
                temp.Responsibilities = details.Responsibilities;
                temp.Requirments = details.Requirments;
                temp.AddDate = details.AddDate;
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }

        public List<CareersClass> GetAllCareersById(int id)
        {
            List<CareersClass> li = new List<CareersClass>();

            var AllCareers = obj.Careers.Where(x => x.Status != 0 && x.Id.Equals(id)).ToList();
            var count = AllCareers.Count();
            foreach (var details in AllCareers)
            {
                CareersClass temp = new CareersClass();
                temp.Id = details.Id;
                temp.PositionTitle = details.PositionTitle;
                temp.Responsibilities = details.Responsibilities;
                temp.Requirments = details.Requirments;
                temp.AddDate = details.AddDate;
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }
        public int PostCareer(CareersClass CC)
        {
            int check = 0;
            try
            {
                Career careers = new Career();
                careers.PositionTitle = CC.PositionTitle;
                careers.Responsibilities = CC.Responsibilities;
                careers.Requirments = CC.Requirments;
                careers.AddDate = DateTime.Now.ToShortDateString();
                careers.Status = 1;
                obj.Careers.InsertOnSubmit(careers);
                obj.SubmitChanges();
                check = careers.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public int UpdateCareer(CareersClass CC)
        {
            int check = 0;
            try
            {
                Career careers = obj.Careers.First(x=>x.Id.Equals(CC.Id));
                careers.PositionTitle = CC.PositionTitle;
                careers.Responsibilities = CC.Responsibilities;
                careers.Requirments = CC.Requirments;
                obj.SubmitChanges();
                check = careers.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public int DeleteCareer(int id)
        {
            int check = 0;
            try
            {
                Career career = obj.Careers.First(x => x.Id.Equals(id));
                career.Status = 0;
                obj.SubmitChanges();
            }
            catch (Exception e) { }

            return check;
        }
  
    }
}
