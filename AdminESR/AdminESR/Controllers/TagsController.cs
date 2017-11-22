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
    public class TagsController : ApiController
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        public List<ESR> GetAllTagsNames()
        {
            List<ESR> li = new List<ESR>();

            var All = obj.Tags.Where(x => x.status != 0).ToList();

            foreach (var details in All)
            {
                ESR temp = new ESR();
                temp.Name = details.Description;
                li.Add(temp);
            }
            return li;
        }
        public List<TagsClass> GetAllTags(int id)
        {
            int ShowRecords = 30;
            int skip = id * ShowRecords;
            var DesiMasala = "";

            var Records = obj.Tags.Where(x => x.status != 0).ToList();
            var AllRecords = Records.Count();
            int max = (skip + ShowRecords);
            if (max > AllRecords)
            {
                max = AllRecords;
            }
            DesiMasala = (skip + 1).ToString() + "-" + max.ToString() + "/" + AllRecords.ToString();

            List<TagsClass> li = new List<TagsClass>();

            var AllTags =  Records.Skip(skip).Take(ShowRecords).Where(x => x.status != 0).ToList();
            var count = AllTags.Count();
            foreach (var details in AllTags)
            {
                TagsClass temp = new TagsClass();
                temp.Id = details.Id;
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
        public List<TagsClass> GetAllTagsByName(string id)
        {
            List<TagsClass> li = new List<TagsClass>();

            var AllTags = obj.Tags.Where(x => x.status != 0 && x.Description.Equals(id)).ToList();
            var count = AllTags.Count();
            foreach (var details in AllTags)
            {
                TagsClass temp = new TagsClass();
                temp.Id = details.Id;
                temp.Description = details.Description;
                temp.AddDate = details.AddDate;
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }

        public List<TagsClass> GetAllTagsById(int id)
        {
            List<TagsClass> li = new List<TagsClass>();

            var AllTags = obj.Tags.Where(x => x.status != 0 && x.Id.Equals(id)).ToList();
            var count = AllTags.Count();
            foreach (var details in AllTags)
            {
                TagsClass temp = new TagsClass();
                temp.Id = details.Id;
                temp.Description = details.Description;
                temp.AddDate = details.AddDate;
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }
        public int PostTags(TagsClass TC)
        {
            int check = 0;
            try
            {
                Tag Tags = new Tag();
                Tags.Description = TC.Description;
                Tags.status = 1;
                Tags.AddDate = DateTime.Now.ToShortDateString();
                obj.Tags.InsertOnSubmit(Tags);
                obj.SubmitChanges();
                check = Tags.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
    
        public int UpdateTags(TagsClass TC)
        {
            int check = 0;
            try
            {
                Tag Tags = obj.Tags.First(x => x.Id.Equals(TC.Id));
                Tags.Description = TC.Description;
                Tags.status = 1; 
                obj.SubmitChanges();
                check = Tags.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public int DeleteTags(int id)
        {
            int check = 0;
            try
            {
                Tag Tags = obj.Tags.First(x => x.Id.Equals(id));
                Tags.status = 0;
                obj.SubmitChanges();
                check = 1;
            }
            catch (Exception e) { } 
            return check;
        } 
    }
}
