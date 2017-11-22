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
    public class RestaurantsController : ApiController
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        public List<ESR> GetAllClassesNames()
        {
            List<ESR> li = new List<ESR>();

            var All = obj.Restaurants.Where(x => x.Status != 0).ToList();

            foreach (var details in All)
            {
                ESR temp = new ESR();
                temp.Name = details.Name;
                li.Add(temp);
            }
            return li;
        }
        public List<RestaurantsClass> GetAllRestaurants(int id)
        {
            int ShowRecords = 30;
            int skip = id * ShowRecords;
            var DesiMasala = "";

            var Records = obj.Restaurants.Where(x => x.Status != 0).ToList();
            var AllRecords = Records.Count();
            int max = (skip + ShowRecords);
            if (max > AllRecords)
            {
                max = AllRecords;
            }
            DesiMasala = (skip + 1).ToString() + "-" + max.ToString() + "/" + AllRecords.ToString();

            List<RestaurantsClass> li = new List<RestaurantsClass>();

            var AllRestaurants = Records.Skip(skip).Take(ShowRecords).Where(x => x.Status != 0).ToList();
            var count = AllRestaurants.Count();
            foreach (var details in AllRestaurants)
            {
                RestaurantsClass temp = new RestaurantsClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.AddDate = details.AddDate;
                temp.Area = details.Area;
                try
                {
                    temp.Discount = details.Discount.Value;
                }
                catch (Exception e) { temp.Discount = 0; }
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

        public List<RestaurantsClass> GetAllRestaurants()
        {
            int id = 0;
            int ShowRecords = 20;
            int skip = id * ShowRecords;
            var DesiMasala = "";

            var AllRecords = obj.Restaurants.Count();
            int max = (skip + ShowRecords);
            if (max > AllRecords)
            {
                max = AllRecords;
            }
            DesiMasala = (skip + 1).ToString() + "-" + max.ToString() + "/" + AllRecords.ToString();

            List<RestaurantsClass> li = new List<RestaurantsClass>();

            var AllRestaurants = obj.Restaurants.Skip(skip).Take(ShowRecords).Where(x => x.Status != 0).ToList();
            var count = AllRestaurants.Count();
            foreach (var details in AllRestaurants)
            {
                RestaurantsClass temp = new RestaurantsClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.Area = details.Area;
                try
                {
                    temp.Discount = details.Discount.Value;
                }
                catch (Exception e) { temp.Discount = 0; }
                temp.Count = count;
                temp.NumberOfShowing = DesiMasala;
                temp.AddDate = details.AddDate;
                li.Add(temp);
            }
            return li;
        }

        public List<RestaurantsClass> GetAllRestaurantsForWeb()
        {  
            List<RestaurantsClass> li = new List<RestaurantsClass>();

            var AllRestaurants = obj.Restaurants.Where(x => x.Status != 0).ToList();
            var count = AllRestaurants.Count();
            foreach (var details in AllRestaurants)
            {
                try
                {
                    RestaurantsClass temp = new RestaurantsClass();
                    temp.Id = details.Id;
                    temp.Name = details.Name;
                    temp.Area = details.Area;
                    temp.Discount = details.Discount.Value;
                    temp.AddDate = details.AddDate;
                    li.Add(temp);
                }catch(Exception e) { }
            }
            return li;
        }

        public List<RestaurantsClass> GetAllRestaurantsByName(string id)
        {
            List<RestaurantsClass> li = new List<RestaurantsClass>();

            var AllRestaurants = obj.Restaurants.Where(x => x.Status != 0 && x.Name.Equals(id)).ToList();
            var count = AllRestaurants.Count();
            foreach (var details in AllRestaurants)
            {
                RestaurantsClass temp = new RestaurantsClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.AddDate = details.AddDate;
                temp.Area = details.Area;
                try
                {
                    temp.Discount = details.Discount.Value;
                }
                catch (Exception e) { temp.Discount = 0; }
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }

        public List<RestaurantsClass> GetAllRestaurantsById(int id)
        {
            List<RestaurantsClass> li = new List<RestaurantsClass>();

            var AllRestaurants = obj.Restaurants.Where(x => x.Status != 0 && x.Id.Equals(id)).ToList();
            var count = AllRestaurants.Count();
            foreach (var details in AllRestaurants)
            {
                RestaurantsClass temp = new RestaurantsClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.AddDate = details.AddDate;
                temp.Area = details.Area;
                try
                {
                    temp.Discount = details.Discount.Value;
                }
                catch (Exception e) { temp.Discount = 0; }
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }
        public List<RestaurantsClass> GetAllRestTagsById(int id)
        {
            List<RestaurantsClass> li = new List<RestaurantsClass>();

            var Ps = obj.ResataurantTags.Where(x => x.RestId.Equals(id)).ToList();
            var count = Ps.Count();
            foreach (var details in Ps)
            {
                try { 
                RestaurantsClass temp = new RestaurantsClass();
                temp.TagId = details.TagsId;
                temp.Tags = details.Tag.Description;
                temp.Count = count;

                li.Add(temp);
                }catch(Exception e) { }
            }
            return li;
        }
        public List<RestaurantsClass> GetAllRestDealsById(int id)
        {
            List<RestaurantsClass> li = new List<RestaurantsClass>();

            var Ps = obj.RestaurantsDeals.Where(x => x.RestId.Equals(id)).ToList();
            var count = Ps.Count();
            foreach (var details in Ps)
            {
                try
                {
                    RestaurantsClass temp = new RestaurantsClass();
                    temp.DealId = details.DealsId;
                    temp.Deals = details.Deal.Description;
                    temp.Count = count;

                    li.Add(temp);
                }catch(Exception e) { }
            }
            return li;
        }
        public List<CouponClass> GetCoupon(string id)
        {
            List<CouponClass> li = new List<CouponClass>();
            var res = obj.Restaurants.First(x => x.Name.Equals(id));

            var Ps = obj.Coupons.Where(x => x.RestId.Equals(res.Id)).ToList();
            var count = Ps.Count();
            foreach (var details in Ps)
            {
                CouponClass temp = new CouponClass();
                temp.RestaurantId = details.RestId.Value;
                temp.UserId = details.UserId.Value;
                temp.Date = details.Expiry;
                temp.count = count;

                li.Add(temp);
            }
            return li;
        }

        public int PostRestaurant(RestaurantsClass RC)
        {
            int check = 0;
            try
            {
                Restaurant Restaurants = new Restaurant();
                Restaurants.Name = RC.Name;
                Restaurants.Area = RC.Area;
                Restaurants.Discount = RC.Discount;
                Restaurants.Status = 1;
                Restaurants.AddDate = DateTime.Now.ToShortDateString();
                obj.Restaurants.InsertOnSubmit(Restaurants);
                obj.SubmitChanges();
                check = Restaurants.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public int PostRestaurantTags(string id)
        {
            int check = 0;
            var pack = id.Split('$');
            foreach (var details in pack)
            {
                try {
                    if (details != "")
                    {
                        var str = details.Split(',');
                        ResataurantTag pakage = new ResataurantTag();
                        pakage.RestId = Int32.Parse(str[0]);
                        pakage.TagsId = Int32.Parse(str[1]);
                        obj.ResataurantTags.InsertOnSubmit(pakage);
                        obj.SubmitChanges();
                        check = pakage.Id; 
                    }
                }
            catch (Exception e) { check = 0; }
            }
            return check;
        }
        public int PostRestaurantDeals(string id)
        {
            int check = 0;
            var pack = id.Split('$');
            foreach (var details in pack)
            {
                try
                {
                    if (details != "")
                    {
                        var str = details.Split(',');
                        RestaurantsDeal pakage = new RestaurantsDeal();
                        pakage.RestId = Int32.Parse(str[0]);
                        pakage.DealsId = Int32.Parse(str[1]);
                        obj.RestaurantsDeals.InsertOnSubmit(pakage);
                        obj.SubmitChanges();
                        check = pakage.Id;
                    }
                }
                catch (Exception e) { check = 0; }
            }
            return check;
        }
        public int PostCoupon(CouponClass RC)
        {
            int check = 0;
            try
            {
                Coupon c = new Coupon();
                c.RestId = RC.RestaurantId;
                c.UserId = RC.UserId;
                c.Expiry = DateTime.Now.ToString();
                obj.Coupons.InsertOnSubmit(c);
                obj.SubmitChanges();
                check = c.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public int PostCouponTags(string id)
        {
            var str = id.Split(',');
            int check = 0;
            try
            {
                CouponTag pakage = new CouponTag();
                pakage.CouponId = Int32.Parse(str[0]);
                pakage.TagId = Int32.Parse(str[1]);
                obj.CouponTags.InsertOnSubmit(pakage);
                obj.SubmitChanges();
                check = pakage.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }


        public int UpdateRestaurant(RestaurantsClass RC)
        {
            int check = 0;
            try
            {
                Restaurant Restaurants = obj.Restaurants.First(x => x.Id.Equals(RC.Id));
                Restaurants.Name = RC.Name;
                Restaurants.Area = RC.Area;
                Restaurants.Discount = RC.Discount;
                Restaurants.Status = 1;

                obj.SubmitChanges();
                check = Restaurants.Id;
                List<ResataurantTag> rt = obj.ResataurantTags.Where(x => x.RestId.Equals(Restaurants.Id)).ToList();
                obj.ResataurantTags.DeleteAllOnSubmit(rt);
                obj.SubmitChanges();
                List<RestaurantsDeal> rd = obj.RestaurantsDeals.Where(x => x.RestId.Equals(Restaurants.Id)).ToList();
                obj.RestaurantsDeals.DeleteAllOnSubmit(rd);
                obj.SubmitChanges();
            }
            catch (Exception e) { check = 0; }
            return check;
        }

        public int DeleteRestaurant(int id)
        {
            int check = 0;
            try
            {
                Restaurant Restaurants = obj.Restaurants.First(x => x.Id.Equals(id));
                Restaurants.Status = 0;
                obj.SubmitChanges();
                check = 1;
                List<ResataurantTag> rt = obj.ResataurantTags.Where(x => x.RestId.Equals(id)).ToList();
                obj.ResataurantTags.DeleteAllOnSubmit(rt);
                obj.SubmitChanges();
                List<RestaurantsDeal> rd = obj.RestaurantsDeals.Where(x => x.RestId.Equals(Restaurants.Id)).ToList();
                obj.RestaurantsDeals.DeleteAllOnSubmit(rd);
                obj.SubmitChanges();
            }
            catch (Exception e) { check = 0; }

            return check;
        }
    }
}
