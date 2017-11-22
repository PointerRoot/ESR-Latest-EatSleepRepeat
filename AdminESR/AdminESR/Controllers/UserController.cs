using AdminESR.Models;
using AdminESR.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Helpers;
using System.Web.Http;

namespace AdminESR.Controllers
{
    public class UserController : ApiController
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        public List<ESR> GetAllUserNames()
        {
            List<ESR> li = new List<ESR>(); 
            var All = obj.Users.Where(x => x.Status != 0).ToList(); 
            foreach (var details in All)
            {
                ESR temp = new ESR();
                temp.Name = details.Name;
                li.Add(temp);
            }
            return li;
        }
        public List<UserClass> GetAllUsers(int id)
        {
            int ShowRecords = 30;
            int skip = id * ShowRecords;
            var DesiMasala = "";

            var AllRecords = obj.Users.Where(x => x.Status != 0);
            var Records = AllRecords.Count();
            int max = (skip + ShowRecords);
            if (max > Records)
            {
                max = Records;
            }
            DesiMasala = (skip + 1).ToString() + "-" + max.ToString() + "/" + Records.ToString();

            List<UserClass> li = new List<UserClass>();

            var AllUsers = AllRecords.Skip(skip).Take(ShowRecords).Where(x => x.Status != 0).ToList();
            var count = AllUsers.Count();
            foreach (var details in AllUsers)
            {
                UserClass temp = new UserClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.Image = details.Image;
                temp.Email = details.Email;
                temp.Contact = details.Contact;
                temp.Address = details.Address;
                temp.AddDate = details.AddDate;
                temp.Count = count;
                if (max >= Records)
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
        public List<UserClass> GetAllUsersByName(string id)
        {
            List<UserClass> li = new List<UserClass>();

            var AllUsers = obj.Users.Where(x => x.Status != 0 && x.Name.Equals(id)).ToList();
            var count = AllUsers.Count();
            foreach (var details in AllUsers)
            {
                UserClass temp = new UserClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.Image = details.Image;
                temp.Email = details.Email;
                temp.Contact = details.Contact;
                temp.Address = details.Address;
                temp.AddDate = details.AddDate;
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }

        public List<UserClass> GetAllUsersById(int id)
        {
            List<UserClass> li = new List<UserClass>();

            var AllUsers = obj.Users.Where(x => x.Status != 0 && x.Id.Equals(id)).ToList();
            var count = AllUsers.Count();
            foreach (var details in AllUsers)
            {
                UserClass temp = new UserClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.Image = details.Image;
                temp.Email = details.Email;
                temp.Contact = details.Contact;
                temp.Address = details.Address;
                temp.AddDate = details.AddDate;
                temp.Count = count;
                UserLogin temp1 = obj.UserLogins.First(x=> x.UserId.Equals(details.Id));
                temp.UserName = temp1.UserName;
                li.Add(temp);
            }
            return li;
        }
        
        public int PostUser(UserClass UC)
        {
            int check = 0;
            try
            {
                User user = new User();
                user.Name = UC.UserName;
                
                user.Email = UC.Email;
                user.Contact = UC.Contact;
                user.Address = UC.Address;
                user.Status = 1;
                user.AddDate = DateTime.Now.ToShortDateString();
                obj.Users.InsertOnSubmit(user);
                obj.SubmitChanges();
                UserLogin userl = new UserLogin();
                userl.UserName = UC.UserName;
                userl.Password = UC.Password;
                userl.UserId = user.Id;
                userl.Status = 1;
                obj.UserLogins.InsertOnSubmit(userl);
                obj.SubmitChanges();
                check = user.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }

        public int checkLogin(UserClass UC)
        {
            int check = 0;
            try
            {
                UserLogin user = obj.UserLogins.First(x => x.UserName.Equals(UC.UserName)  );
                if (user.UserName == UC.UserName && user.Password == UC.Password)
                    return check = 1;
            }
            catch (Exception e) { check = 0; }
            return check;
        }

        public int UpdateUser(UserClass UC)
        {
            int check = 0;
            try
            {
                User user = obj.Users.First(x => x.Id.Equals(UC.Id));
                user.Name = UC.Name;
                user.Email = UC.Email;
                user.Contact = UC.Contact;
                user.Address = UC.Address;
                obj.SubmitChanges();
                UserLogin userlogin = obj.UserLogins.First(x=>x.UserId.Equals(user.Id));
                userlogin.UserName = UC.UserName;
                if (UC.Password != "")
                {
                    userlogin.Password = UC.Password;
                }
                obj.SubmitChanges();
                check = user.Id;

            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public void PostImages()
        {
            var Id = HttpContext.Current.Request["UserId"];
            var typeOfImage = "";
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection
                var httpPostedFile = HttpContext.Current.Request.Files["UserImage"];
                string httpPostedFile1 = httpPostedFile.FileName;
                string[] httpPostedFile2 = httpPostedFile1.Split('.');
                typeOfImage = "." + httpPostedFile2[httpPostedFile2.Length - 1];

                if (httpPostedFile != null)
                {
                    WebImage img = new WebImage(httpPostedFile.InputStream);
                    if (img.Width > 1000)
                        img.Resize(1000, 1000);
                    img.Save(@"~\Content\Images\User\" + (Id + typeOfImage));
                }
                try
                {
                    string image = "../../Content/Images/User/" + Id.ToString() + typeOfImage.ToString();
                    User FM = obj.Users.First(x => x.Id.Equals(Id));
                    FM.Image = image;
                    obj.SubmitChanges();
                }
                catch (Exception e) { }
            }

        }
        public int DeleteUser(int id)
        {
            int check = 0;
            try
            {
                User user = obj.Users.First(x => x.Id.Equals(id));
                user.Status = 0;
                obj.SubmitChanges();
                check = 1;
            }
            catch (Exception e) { }

            return check;
        }
    }
}
