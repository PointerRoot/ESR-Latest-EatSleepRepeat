using AdminESR.Context;
using AdminESR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace AdminESR.Controllers
{
    public class AdminApiController : ApiController
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        public List<ESR> GetAllClassesNames()
        {
            List<ESR> li = new List<ESR>();

            var All = obj.Admins.ToList();

            foreach (var details in All)
            {
                ESR temp = new ESR();
                temp.Name = details.UserName;
                li.Add(temp);
            }
            return li;
        }
        public List<AdminClass> GetAllAdmins(int id)
        {
            int ShowRecords = 30;
            int skip = id * ShowRecords;
            var DesiMasala = "";

            var AllRecords = obj.Admins.Count();
            int max = (skip + ShowRecords);
            if (max > AllRecords)
            {
                max = AllRecords;
            }
            DesiMasala = (skip + 1).ToString() + "-" + max.ToString() + "/" + AllRecords.ToString();

            List<AdminClass> li = new List<AdminClass>();

            var AllAdmins = obj.Admins.Skip(skip).Take(ShowRecords).ToList();
            var count = AllAdmins.Count();
            foreach (var details in AllAdmins)
            {
                AdminClass temp = new AdminClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.UserName = details.UserName;
                temp.AddDate = details.AddDate;
                temp.Role = details.Roles; 
                temp.Count = count;
                if (max >= AllRecords)
                    temp.Next = id;
                else
                    temp.Next = id + 1;
                if (id == 0)
                    temp.Prev = id;
                else
                    temp.Prev = id - 1;
                temp.NumberOfShowing = DesiMasala;
                li.Add(temp);
            }
            return li;
        }
        public List<AdminClass> GetAllAdminsByName(string id)
        {
            List<AdminClass> li = new List<AdminClass>();

            var AllAdmins = obj.Admins.Where( x=>x.UserName.Equals(id)).ToList();
            var count = AllAdmins.Count();
            foreach (var details in AllAdmins)
            {
                AdminClass temp = new AdminClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.UserName = details.UserName;
                temp.AddDate = details.AddDate;
                temp.Role = details.Roles;
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }

        public List<AdminClass> GetAllAdminsById(int id)
        {
            List<AdminClass> li = new List<AdminClass>();

            var AllAdmins = obj.Admins.Where(x => x.Id.Equals(id)).ToList();
            var count = AllAdmins.Count();
            foreach (var details in AllAdmins)
            {
                AdminClass temp = new AdminClass();
                temp.Id = details.Id;
                temp.UserName = details.UserName;
                temp.Name = details.Name;
                temp.AddDate = details.AddDate;
                temp.Role = details.Roles;
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }
        public int PostAdmin(AdminClass AC)
        {
            int check = 0;
            try
            {
                Admin admins = obj.Admins.First(x => x.UserName.Equals(AC.UserName));
            }
            catch (Exception e) {
                try
                {
                    Admin Admins = new Admin();
                    Admins.Name = AC.Name;
                    Admins.UserName = AC.UserName;
                    Admins.Password = AC.Password;
                    Admins.Roles = AC.Role;
                    Admins.AddDate = DateTime.Now.ToShortDateString();
                    obj.Admins.InsertOnSubmit(Admins);
                    obj.SubmitChanges();
                    check = Admins.Id;
                }
                catch (Exception exe) { check = 0; }
            } 
            return check;
        }
        public int UpdateAdmin(AdminClass AC)
        {
            int check = 0;
            try
            {
                Admin admins = obj.Admins.First(x => x.UserName.Equals(AC.UserName) && AC.Id != x.Id);
            }
            catch (Exception e)
            {
                try
                {
                    Admin Admins = obj.Admins.First(x => x.Id.Equals(AC.Id));
                    Admins.UserName = AC.UserName;
                    Admins.Name = AC.Name;
                    if (AC.Password != "")
                    {
                        Admins.Password = AC.Password;
                    }
                    Admins.Roles = AC.Role;
                    obj.SubmitChanges();
                    check = Admins.Id;
                }
                catch (Exception exe) { check = 0; }
            } 
            return check;
        }
        public int DeleteAdmin(int id)
        {
            int check = 0;
            try
            {
                Admin admin = obj.Admins.First(x => x.Id.Equals(id));
                obj.Admins.DeleteOnSubmit(admin);
                obj.SubmitChanges();
            }
            catch (Exception e) { }

            return check;
        }
  
    }
}
