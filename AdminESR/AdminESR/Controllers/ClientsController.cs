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
    public class ClientsController : ApiController
    {
        DataClasses1DataContext obj = new DataClasses1DataContext();
        public List<ESR> GetAllClassesNames()
        {
            List<ESR> li = new List<ESR>();

            var All = obj.Clients.Where(x => x.Status != 0).ToList();

            foreach (var details in All)
            {
                ESR temp = new ESR();
                temp.Name = details.Name;
                li.Add(temp);
            }
            return li;
        }

        public List<ClientsClass> GetAllClientForWeb()
        {  
            List<ClientsClass> li = new List<ClientsClass>();

            var AllClients = obj.Clients.Where(x => x.Status != 0).ToList(); 
            foreach (var details in AllClients)
            {
                ClientsClass temp = new ClientsClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.Testimonial = details.Testimonials;
                try
                {
                    var clientPackage = obj.ClientPakages.Where(x => x.ClientId.Equals(details.Id)).ToList();
                    foreach(var detailsCP in clientPackage)
                    { 
                       if(detailsCP.Pakage.Priority == "Gold" )
                        {
                            temp.priority1 = "Gold";
                        }
                        else if (detailsCP.Pakage.Priority == "Silver")
                        {
                            temp.priority2 = "Silver";
                        }
                        else 
                        {
                            temp.priority3 = "OFF";
                        }
                    } 
                }
                catch(Exception e) { }
               
                temp.Image = details.Image;
                li.Add(temp);
            }
            return li;
        }

        public List<ClientsClass> GetAllClient(int id)
        {
            int ShowRecords = 30;
            int skip = id * ShowRecords;
            var DesiMasala = "";

            var AllRecords = obj.Clients.Where(x => x.Status != 0);
            var Records = AllRecords.Count();
            int max = (skip + ShowRecords);
            if (max > Records)
            {
                max = Records;
            }
            DesiMasala = (skip + 1).ToString() + "-" + max.ToString() + "/" + Records.ToString();

            List<ClientsClass> li = new List<ClientsClass>();

            var AllClients = AllRecords.Skip(skip).Take(ShowRecords).Where(x => x.Status != 0).ToList();
            var count = AllClients.Count();
            foreach (var details in AllClients)
            {
                ClientsClass temp = new ClientsClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.Testimonial = details.Testimonials; 
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
                temp.AddDate = details.AddDate;
                li.Add(temp);
            }
            return li;
        }
        public List<ClientsClass> GetAllClientsByName(string id)
        {
            List<ClientsClass> li = new List<ClientsClass>();

            var AllClients = obj.Clients.Where(x => x.Status != 0 && x.Name.Equals(id)).ToList();
            var count = AllClients.Count();
            foreach (var details in AllClients)
            {
                ClientsClass temp = new ClientsClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.Testimonial = details.Testimonials;
                temp.AddDate = details.AddDate;
                temp.Count = count;
                li.Add(temp);
            }
            return li;
        }

        public List<ClientsClass> GetAllClientsById(int id)
        {
            List<ClientsClass> li = new List<ClientsClass>();

            var AllClients = obj.Clients.Where(x => x.Status != 0 && x.Id.Equals(id)).ToList();
            var count = AllClients.Count();
            foreach (var details in AllClients)
            {
                ClientsClass temp = new ClientsClass();
                temp.Id = details.Id;
                temp.Name = details.Name;
                temp.AddDate = details.AddDate;
                temp.Testimonial = details.Testimonials;
                temp.Count = count;
               
                li.Add(temp);
            }
            return li;
        }
        public List<ClientsClass> GetAllClientsPakageById(int id)
        {
            List<ClientsClass> li = new List<ClientsClass>();

            var AllClients = obj.ClientPakages.Where(x =>  x.ClientId.Equals(id)).ToList();
            var count = AllClients.Count();
            foreach (var details in AllClients)
            {
                try { 
                    ClientsClass temp = new ClientsClass();
                    temp.PakageId = details.PakagesId;
                    temp.Name = details.Pakage.Name;
                    temp.PackageType    = details.Pakage.PakageType;
                    temp.PackagePriority = details.Pakage.Priority;
                    temp.Count = count;

                    li.Add(temp);
                }catch(Exception e) { }
            }
            return li;
        }

        public int PostClient(ClientsClass CC)
        {
            int check = 0;
            try
            {
                Client client = new Client();
                client.Name = CC.Name;
                client.Testimonials = CC.Testimonial;
                client.Status = 1;
                client.AddDate = DateTime.Now.ToShortDateString();
                obj.Clients.InsertOnSubmit(client);
                obj.SubmitChanges();
                check = client.Id;
            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public int PostClientPakage(string id)
        {
            int check = 0;
            var pack = id.Split('$');
            foreach (var details in pack)
            {
                if (details != "")
                {
                    var str = details.Split(',');
                    try
                    {
                        ClientPakage pakage = new ClientPakage();
                        pakage.ClientId = Int32.Parse(str[0]);
                        pakage.PakagesId = Int32.Parse(str[1]);
                        obj.ClientPakages.InsertOnSubmit(pakage);
                        obj.SubmitChanges();
                        check = pakage.Id;
                    }
                    catch (Exception e) { check = 0; }
                }
            }
            return check;
        }
        public int UpdateClient(ClientsClass CC)
        {
            int check = 0;
            try
            {
                Client client = obj.Clients.First(x => x.Id.Equals(CC.Id));
                client.Name = CC.Name;
                client.Testimonials = CC.Testimonial;
                obj.SubmitChanges();
                check = client.Id;
                List<ClientPakage> cp=obj.ClientPakages.Where(x => x.ClientId.Equals(client.Id)).ToList();
                obj.ClientPakages.DeleteAllOnSubmit(cp);
                obj.SubmitChanges();

            }
            catch (Exception e) { check = 0; }
            return check;
        }
        public int DeleteClient(int id)
        {
            int check = 0;
            try
            {
                Client client = obj.Clients.First(x => x.Id.Equals(id));
                client.Status = 0;
                obj.SubmitChanges();
                check = 1;
                List<ClientPakage> cp = obj.ClientPakages.Where(x => x.ClientId.Equals(id)).ToList();
                obj.ClientPakages.DeleteAllOnSubmit(cp);
                obj.SubmitChanges();
            }
            catch (Exception e) { }

            return check;
        }
    }
}
