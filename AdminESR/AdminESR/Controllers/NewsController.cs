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
    public class NewsController : ApiController
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        public List<ESR> GetAllClassesNames()
        {
            List<ESR> li = new List<ESR>(); 
            var All = obj.News.Where(x => x.status != 0).ToList();

            foreach (var details in All)
            {
                ESR temp = new ESR();
                temp.Name = details.Title;
                li.Add(temp);
            }
            return li;
        }
        public List<NewsClass> GetAllNews(int id)
        {
            int ShowRecords = 30;
            int skip = id * ShowRecords;
            var DesiMasala = "";

            var Records = obj.News.Where(x => x.status != 0).ToList();
            var AllRecords = Records.Count();
            int max = (skip + ShowRecords);
            if (max > AllRecords)
            {
                max = AllRecords;
            }
            DesiMasala = (skip + 1).ToString() + "-" + max.ToString() + "/" + AllRecords.ToString();

            List<NewsClass> li = new List<NewsClass>();

            var AllNews = Records.Skip(skip).Take(ShowRecords).Where(x => x.status != 0).ToList();
            var count = AllNews.Count();
            foreach (var details in AllNews)
            {
                NewsClass temp = new NewsClass();
                temp.Id = details.Id;
                temp.Title = details.Title;
                temp.Description = details.Description;
                temp.Image = details.Image;
                temp.AddDate = details.AddDate;
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
        public List<NewsClass> GetAllNewsByName(string id)
        {
            List<NewsClass> li = new List<NewsClass>();

            var AllNews = obj.News.Where(x => x.status != 0 && x.Title.Equals(id)).ToList();
            var count = AllNews.Count();
            foreach (var details in AllNews)
            {
                NewsClass temp = new NewsClass();
                temp.Id = details.Id;
                temp.Title = details.Title;
                temp.Description = details.Description;
                temp.Image = details.Image;
                temp.AddDate = details.AddDate;
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }

        public List<NewsClass> GetAllNewsById(int id)
        {
            List<NewsClass> li = new List<NewsClass>();

            var AllNews = obj.News.Where(x => x.status != 0 && x.Id.Equals(id)).ToList();
            var count = AllNews.Count();
            foreach (var details in AllNews)
            {
                NewsClass temp = new NewsClass();
                temp.Id = details.Id;
                temp.Title = details.Title;
                temp.Description = details.Description;
                temp.Image = details.Image;
                temp.AddDate = details.AddDate;
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }
        public int PostNews(NewsClass NC)
        {
            int check = 0;
            try
            {
                New news = new New();
                news.Title = NC.Title;
                news.Description = NC.Description;
                news.status = 1;
                news.AddDate = DateTime.Now.ToShortDateString();
                obj.News.InsertOnSubmit(news);
                obj.SubmitChanges();
                check = news.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public int UpdateNews(NewsClass NC)
        {
            int check = 0;
            try
            {
                New news = obj.News.First(x => x.Id.Equals(NC.Id));
                news.Title = NC.Title;
                news.Description = NC.Description;
                news.status = 1;
                
                obj.SubmitChanges();
                check = news.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public void PostImages()
        {
            var Id = HttpContext.Current.Request["NewsId"];
            var typeOfImage = "";
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection
                var httpPostedFile = HttpContext.Current.Request.Files["NewsImage"];
                string httpPostedFile1 = httpPostedFile.FileName;
                string[] httpPostedFile2 = httpPostedFile1.Split('.');
                typeOfImage = "." + httpPostedFile2[httpPostedFile2.Length - 1];

                if (httpPostedFile != null)
                {
                    WebImage img = new WebImage(httpPostedFile.InputStream);
                    if (img.Width > 1000)
                        img.Resize(1000, 1000);
                    img.Save(@"~\Content\Images\News\" + (Id + typeOfImage));
                }
                try
                {
                    string image = "../../Content/Images/News/" + Id.ToString() + typeOfImage.ToString();
                    New FM = obj.News.First(x => x.Id.Equals(Id));
                    FM.Image = image;
                    obj.SubmitChanges();
                }
                catch (Exception e) { }
            }

        }
        public int DeleteNew(int id)
        {
            int check = 0;
            try
            {
                New contest = obj.News.First(x => x.Id.Equals(id));
                contest.status = 0;
                obj.SubmitChanges();
            }
            catch (Exception e) { }

            return check;
        }
   
    }
}
