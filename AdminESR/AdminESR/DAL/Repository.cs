using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AdminESR.Context;
using AdminESR.Models;
namespace AdminESR.DAL
{ 
    public class Repository
    {   
        public static UserAdmin GetUserDetails(UserAdmin user)
        {
            UserAdmin access = new UserAdmin();
            Admin admin = new Admin();
            DataClasses1DataContext obj = new DataClasses1DataContext();
            try
            {
                 admin = obj.Admins.First(x => x.UserName.Equals(user.Email) && x.Password.Equals(user.Password));
                access.Email = admin.UserName;
                access.Password = admin.Password;
                access.Roles = admin.Roles;
            }catch(Exception e) { }

            return access; 
        }
        public static UserAdmin GetWebUserDetails(UserAdmin user)
        {
            UserAdmin access = new UserAdmin();
            UserLogin WebUser = new UserLogin();
            DataClasses1DataContext obj = new DataClasses1DataContext();
            try
            {
                WebUser = obj.UserLogins.First(x => x.UserName.Equals(user.Email) && x.Password.Equals(user.Password));
                access.Email = WebUser.UserName;
                access.Password = WebUser.Password;
                access.Roles = "All";
            }
            catch (Exception e) { }

            return access;
        }
    }
}