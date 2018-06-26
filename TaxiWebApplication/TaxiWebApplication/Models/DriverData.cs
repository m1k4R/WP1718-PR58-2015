using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using static TaxiWebApplication.Models.Enums;

namespace TaxiWebApplication.Models
{
    public class DriverData
    {
        private string fileName = HttpContext.Current.Server.MapPath("~/App_Data/Drivers.xml");

        public bool CheckIfDriverExists(string username)
        {
            bool retVal = false;

            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                retVal = (from driver in xmlDocument.Root.Elements("Driver")
                          where driver.Element("Username").Value.ToString().ToLower().Equals(username.ToLower())
                          select driver).Any();

                return retVal;
            }
            else
            {
                return retVal;
            }
        }

        public void AddDriver(Driver driver)
        {
            if (!File.Exists(fileName))
            {
                XDocument xmlDocument = new XDocument(
                    new XDeclaration("1.0", "utf-8", "yes"),
                    new XElement("Drivers",
                        new XElement("Driver",
                            new XElement("Id", driver.Id),
                            new XElement("Username", driver.Username),
                            new XElement("Password", driver.Password),
                            new XElement("Name", driver.Name),
                            new XElement("Surname", driver.Surname),
                            new XElement("Gender", driver.Gender),
                            new XElement("Jmbg", driver.Jmbg),
                            new XElement("Phone", driver.Phone),
                            new XElement("Email", driver.Email),
                            new XElement("Role", driver.Role),
                            new XElement("Address", driver.Location.Address),
                            new XElement("X", driver.Location.X),
                            new XElement("Y", driver.Location.Y),
                            new XElement("CarId", driver.Car.Id),
                            new XElement("YearOfCar", driver.Car.YearOfCar),
                            new XElement("RegNumber", driver.Car.RegNumber),
                            new XElement("CarType", driver.Car.Type),
                            new XElement("Occupied", driver.Occupied))
                    ));

                xmlDocument.Save(fileName);
            }
            else
            {
                try
                {
                    FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                    XDocument xmlDocument = XDocument.Load(stream);
                    XElement drivers = xmlDocument.Element("Drivers");
                    drivers.Add(new XElement("Driver",
                                    new XElement("Id", driver.Id),
                                    new XElement("Username", driver.Username),
                                    new XElement("Password", driver.Password),
                                    new XElement("Name", driver.Name),
                                    new XElement("Surname", driver.Surname),
                                    new XElement("Gender", driver.Gender),
                                    new XElement("Jmbg", driver.Jmbg),
                                    new XElement("Phone", driver.Phone),
                                    new XElement("Email", driver.Email),
                                    new XElement("Role", driver.Role),
                                    new XElement("Address", driver.Location.Address),
                                    new XElement("X", driver.Location.X),
                                    new XElement("Y", driver.Location.Y),
                                    new XElement("CarId", driver.Car.Id),
                                    new XElement("YearOfCar", driver.Car.YearOfCar),
                                    new XElement("RegNumber", driver.Car.RegNumber),
                                    new XElement("CarType", driver.Car.Type),
                                    new XElement("Occupied", driver.Occupied)));

                    xmlDocument.Save(fileName);
                }
                catch { }
            }
        }

        public IEnumerable<Driver> RetriveAllDrivers()
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Driver> drivers = xmlDocument.Root.Elements("Driver").Select(driver => new Driver
                {
                    Id = int.Parse(driver.Element("Id").Value),
                    Username = driver.Element("Username").Value,
                    Password = driver.Element("Password").Value,
                    Name = driver.Element("Name").Value,
                    Surname = driver.Element("Surname").Value,
                    Gender = (Genders)Enum.Parse(typeof(Genders), driver.Element("Gender").Value),
                    Jmbg = driver.Element("Jmbg").Value,
                    Phone = driver.Element("Phone").Value,
                    Email = driver.Element("Email").Value,
                    Role = (Roles)Enum.Parse(typeof(Roles), driver.Element("Role").Value),
                    Location = new Location
                    {
                        Address = driver.Element("Address").Value,
                        X = Double.Parse(driver.Element("X").Value),
                        Y = Double.Parse(driver.Element("Y").Value)
                    },
                    Car = new Car
                    {
                        Id = int.Parse(driver.Element("CarId").Value),
                        YearOfCar = int.Parse(driver.Element("YearOfCar").Value),
                        RegNumber = driver.Element("RegNumber").Value,
                        Type = (Cars)Enum.Parse(typeof(Cars), driver.Element("CarType").Value)
                    },
                    Occupied = bool.Parse(driver.Element("Occupied").Value)

                }).ToList();

                return drivers;
            }
            else
            {
                return null;
            }
        }

        public bool LoginDriver(string username, string password)
        {
            bool retVal = false;

            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                retVal = (from driver in xmlDocument.Root.Elements("Driver")
                          where (driver.Element("Username").Value.ToString().ToLower().Equals(username.ToLower()) && driver.Element("Password").Value.ToString().Equals(password))
                          select driver).Any();

                return retVal;
            }
            else
            {
                return retVal;
            }
        }

        public Driver GetDriverByUsername(string username)
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Driver> drivers = xmlDocument.Root.Elements("Driver").Where(x => x.Element("Username").Value.ToLower().Equals(username.ToLower())).Select(driverFind => new Driver
                {
                    Id = int.Parse(driverFind.Element("Id").Value),
                    Username = driverFind.Element("Username").Value,
                    Password = driverFind.Element("Password").Value,
                    Name = driverFind.Element("Name").Value,
                    Surname = driverFind.Element("Surname").Value,
                    Gender = (Genders)Enum.Parse(typeof(Genders), driverFind.Element("Gender").Value),
                    Jmbg = driverFind.Element("Jmbg").Value,
                    Phone = driverFind.Element("Phone").Value,
                    Email = driverFind.Element("Email").Value,
                    Role = (Roles)Enum.Parse(typeof(Roles), driverFind.Element("Role").Value),
                    Location = new Location
                    {
                        Address = driverFind.Element("Address").Value,
                        X = Double.Parse(driverFind.Element("X").Value),
                        Y = Double.Parse(driverFind.Element("Y").Value)
                    },
                    Car = new Car
                    {
                        Id = int.Parse(driverFind.Element("CarId").Value),
                        YearOfCar = int.Parse(driverFind.Element("YearOfCar").Value),
                        RegNumber = driverFind.Element("RegNumber").Value,
                        Type = (Cars)Enum.Parse(typeof(Cars), driverFind.Element("CarType").Value)
                    },
                    Occupied = bool.Parse(driverFind.Element("Occupied").Value)

                }).ToList();

                Driver driver = drivers.First(x => x.Username.ToLower().Equals(username.ToLower()));

                return driver;
            }
            else
            {
                return null;
            }
        }

        public Driver GetDriverById(int id)
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Driver> drivers = xmlDocument.Root.Elements("Driver").Where(x => x.Element("Id").Value == id.ToString()).Select(driverFind => new Driver
                {
                    Id = int.Parse(driverFind.Element("Id").Value),
                    Username = driverFind.Element("Username").Value,
                    Password = driverFind.Element("Password").Value,
                    Name = driverFind.Element("Name").Value,
                    Surname = driverFind.Element("Surname").Value,
                    Gender = (Genders)Enum.Parse(typeof(Genders), driverFind.Element("Gender").Value),
                    Jmbg = driverFind.Element("Jmbg").Value,
                    Phone = driverFind.Element("Phone").Value,
                    Email = driverFind.Element("Email").Value,
                    Role = (Roles)Enum.Parse(typeof(Roles), driverFind.Element("Role").Value),
                    Location = new Location
                    {
                        Address = driverFind.Element("Address").Value,
                        X = Double.Parse(driverFind.Element("X").Value),
                        Y = Double.Parse(driverFind.Element("Y").Value)
                    },
                    Car = new Car
                    {
                        Id = int.Parse(driverFind.Element("CarId").Value),
                        YearOfCar = int.Parse(driverFind.Element("YearOfCar").Value),
                        RegNumber = driverFind.Element("RegNumber").Value,
                        Type = (Cars)Enum.Parse(typeof(Cars), driverFind.Element("CarType").Value)
                    },
                    Occupied = bool.Parse(driverFind.Element("Occupied").Value)

                }).ToList();

                Driver driver = drivers.First(x => x.Id == id);

                return driver;
            }
            else
            {
                return null;
            }
        }

        public List<Driver> GetFreeDrivers()
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                List<Driver> drivers = xmlDocument.Root.Elements("Driver").Where(x => x.Element("Occupied").Value == "false").Select(driverFind => new Driver
                {
                    Id = int.Parse(driverFind.Element("Id").Value),
                    Username = driverFind.Element("Username").Value,
                    Password = driverFind.Element("Password").Value,
                    Name = driverFind.Element("Name").Value,
                    Surname = driverFind.Element("Surname").Value,
                    Gender = (Genders)Enum.Parse(typeof(Genders), driverFind.Element("Gender").Value),
                    Jmbg = driverFind.Element("Jmbg").Value,
                    Phone = driverFind.Element("Phone").Value,
                    Email = driverFind.Element("Email").Value,
                    Role = (Roles)Enum.Parse(typeof(Roles), driverFind.Element("Role").Value),
                    Location = new Location
                    {
                        Address = driverFind.Element("Address").Value,
                        X = Double.Parse(driverFind.Element("X").Value),
                        Y = Double.Parse(driverFind.Element("Y").Value)
                    },
                    Car = new Car
                    {
                        Id = int.Parse(driverFind.Element("CarId").Value),
                        YearOfCar = int.Parse(driverFind.Element("YearOfCar").Value),
                        RegNumber = driverFind.Element("RegNumber").Value,
                        Type = (Cars)Enum.Parse(typeof(Cars), driverFind.Element("CarType").Value)
                    },
                    Occupied = bool.Parse(driverFind.Element("Occupied").Value)

                }).ToList();

                return drivers;
            }
            else
            {
                return null;
            }
        }

        public void EditDriver(Driver driver)
        {
            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                xmlDocument.Element("Drivers").Elements("Driver")
                                                .Where(x => x.Element("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Username", driver.Username);
                xmlDocument.Element("Drivers").Elements("Driver")
                                                .Where(x => x.Element("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Password", driver.Password);
                xmlDocument.Element("Drivers").Elements("Driver")
                                                .Where(x => x.Element("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Name", driver.Name);
                xmlDocument.Element("Drivers").Elements("Driver")
                                                .Where(x => x.Element("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Surname", driver.Surname);
                xmlDocument.Element("Drivers").Elements("Driver")
                                                .Where(x => x.Element("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Gender", driver.Gender);
                xmlDocument.Element("Drivers").Elements("Driver")
                                                .Where(x => x.Element("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Jmbg", driver.Jmbg);
                xmlDocument.Element("Drivers").Elements("Driver")
                                                .Where(x => x.Element("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Phone", driver.Phone);
                xmlDocument.Element("Drivers").Elements("Driver")
                                                .Where(x => x.Element("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Email", driver.Email);

                xmlDocument.Save(fileName);
            }
        }

        public void ChangeDriverLocation(Driver driver)
        {
            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                xmlDocument.Element("Drivers").Elements("Driver")
                                                .Where(x => x.Element("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Address", driver.Location.Address);
                xmlDocument.Element("Drivers").Elements("Driver")
                                                .Where(x => x.Element("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("X", driver.Location.X);
                xmlDocument.Element("Drivers").Elements("Driver")
                                                .Where(x => x.Element("Id").Value == driver.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Y", driver.Location.Y);

                xmlDocument.Save(fileName);
            }
        }
    }
}