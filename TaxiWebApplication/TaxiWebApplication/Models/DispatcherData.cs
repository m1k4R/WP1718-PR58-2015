using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using static TaxiWebApplication.Models.Enums;

namespace TaxiWebApplication.Models
{
    public class DispatcherData
    {
        private string fileName = HttpContext.Current.Server.MapPath("~/App_Data/Dispatchers.xml");

        public bool CheckIfDispatcherExists(string username)
        {
            bool retVal = false;

            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                retVal = (from dispatcher in xmlDocument.Root.Elements("Dispatcher")
                          where dispatcher.Element("Username").Value.ToString().ToLower().Equals(username.ToLower())
                          select dispatcher).Any();

                return retVal;
            }
            else
            {
                return retVal;
            }
        }

        public IEnumerable<Dispatcher> RetriveAllDispatchers()
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Dispatcher> dispatchers = xmlDocument.Root.Elements("Dispatcher").Select(dispatcher => new Dispatcher
                {
                    Id = int.Parse(dispatcher.Element("Id").Value),
                    Username = dispatcher.Element("Username").Value,
                    Password = dispatcher.Element("Password").Value,
                    Name = dispatcher.Element("Name").Value,
                    Surname = dispatcher.Element("Surname").Value,
                    Gender = (Genders)Enum.Parse(typeof(Genders), dispatcher.Element("Gender").Value),
                    Jmbg = dispatcher.Element("Jmbg").Value,
                    Phone = dispatcher.Element("Phone").Value,
                    Email = dispatcher.Element("Email").Value,
                    Role = (Roles)Enum.Parse(typeof(Roles), dispatcher.Element("Role").Value)

                }).ToList();

                return dispatchers;
            }
            else
            {
                return null;
            }
        }

        public bool LoginDispatcher(string username, string password)
        {
            bool retVal = false;

            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                retVal = (from dispatcher in xmlDocument.Root.Elements("Dispatcher")
                          where (dispatcher.Element("Username").Value.ToString().ToLower().Equals(username.ToLower()) && dispatcher.Element("Password").Value.ToString().Equals(password))
                          select dispatcher).Any();

                return retVal;
            }
            else
            {
                return retVal;
            }
        }

        public Dispatcher GetDispatcherByUsername(string username)
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Dispatcher> dispatchers = xmlDocument.Root.Elements("Dispatcher").Where(x => x.Element("Username").Value.ToLower().Equals(username.ToLower())).Select(dispatcherFind => new Dispatcher
                {
                    Id = int.Parse(dispatcherFind.Element("Id").Value),
                    Username = dispatcherFind.Element("Username").Value,
                    Password = dispatcherFind.Element("Password").Value,
                    Name = dispatcherFind.Element("Name").Value,
                    Surname = dispatcherFind.Element("Surname").Value,
                    Gender = (Genders)Enum.Parse(typeof(Genders), dispatcherFind.Element("Gender").Value),
                    Jmbg = dispatcherFind.Element("Jmbg").Value,
                    Phone = dispatcherFind.Element("Phone").Value,
                    Email = dispatcherFind.Element("Email").Value,
                    Role = (Roles)Enum.Parse(typeof(Roles), dispatcherFind.Element("Role").Value)

                }).ToList();

                Dispatcher dispatcher = dispatchers.First(x => x.Username.ToLower().Equals(username.ToLower()));

                return dispatcher;
            }
            else
            {
                return null;
            }
        }
    }
}