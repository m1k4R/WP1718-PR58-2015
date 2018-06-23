using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using static TaxiWebApplication.Models.Enums;

namespace TaxiWebApplication.Models
{
    public class DriveData
    {
        private string fileName = HttpContext.Current.Server.MapPath("~/App_Data/Drives.xml");

        public void AddDrive(Drive drive)
        {
            if (!File.Exists(fileName))
            {
                XDocument xmlDocument = new XDocument(
                    new XDeclaration("1.0", "utf-8", "yes"),
                    new XElement("Drives",
                        new XElement("Drive",
                            new XElement("Id", drive.Id),
                            new XElement("DateTime", drive.DateTime),
                            new XElement("StartLocation", drive.StartLocation.Address),
                            new XElement("StartLocationX", drive.StartLocation.X),
                            new XElement("StartLocationY", drive.StartLocation.Y),
                            new XElement("Destination", drive.Destination.Address),
                            new XElement("DestinationX", drive.Destination.X),
                            new XElement("DestinationY", drive.Destination.Y),
                            new XElement("CustomerId", drive.Customer.Id),
                            new XElement("DispatcherId", drive.Dispatcher.Id),
                            new XElement("DriverId", drive.Driver.Id),
                            new XElement("Car", drive.Car),
                            new XElement("Price", drive.Price),
                            new XElement("CommentId", drive.Comment.Id),
                            new XElement("State", drive.State))
                    ));

                xmlDocument.Save(fileName);
            }
            else
            {
                try
                {
                    FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                    XDocument xmlDocument = XDocument.Load(stream);
                    XElement drives = xmlDocument.Element("Drives");
                    drives.Add(new XElement("Drive",
                                    new XElement("Id", drive.Id),
                                    new XElement("DateTime", drive.DateTime),
                                    new XElement("StartLocation", drive.StartLocation.Address),
                                    new XElement("StartLocationX", drive.StartLocation.X),
                                    new XElement("StartLocationY", drive.StartLocation.Y),
                                    new XElement("Destination", drive.Destination.Address),
                                    new XElement("DestinationX", drive.Destination.X),
                                    new XElement("DestinationY", drive.Destination.Y),
                                    new XElement("CustomerId", drive.Customer.Id),
                                    new XElement("DispatcherId", drive.Dispatcher.Id),
                                    new XElement("DriverId", drive.Driver.Id),
                                    new XElement("Car", drive.Car),
                                    new XElement("Price", drive.Price),
                                    new XElement("CommentId", drive.Comment.Id),
                                    new XElement("State", drive.State)));

                    xmlDocument.Save(fileName);
                }
                catch { }
            }
        }

        public IEnumerable<Drive> RetriveAllDrives()
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Drive> drives = xmlDocument.Root.Elements("Drive").Select(drive => new Drive
                {
                    Id = int.Parse(drive.Element("Id").Value),
                    DateTime = DateTime.Parse(drive.Element("DateTime").Value),
                    StartLocation = new Location
                    {
                        Address = drive.Element("StartLocation").Value,
                        X = Double.Parse(drive.Element("StartLocationX").Value),
                        Y = Double.Parse(drive.Element("StartLocationY").Value),
                    },
                    Destination = new Location
                    {
                        Address = drive.Element("Destination").Value,
                        X = Double.Parse(drive.Element("DestinationX").Value),
                        Y = Double.Parse(drive.Element("DestinationY").Value),
                    },
                    Customer = new Customer
                    {
                        Id = int.Parse(drive.Element("CustomerId").Value),
                    },
                    Dispatcher = new Dispatcher
                    {
                        Id = int.Parse(drive.Element("DispatcherId").Value),
                    },
                    Driver = new Driver
                    {
                        Id = int.Parse(drive.Element("DriverId").Value),
                    },
                    Car = (Cars)Enum.Parse(typeof(Cars), drive.Element("Car").Value),
                    Price = Double.Parse(drive.Element("Price").Value),
                    Comment = new Comment
                    {
                        Id = int.Parse(drive.Element("CommentId").Value),
                    },
                    State = (State)Enum.Parse(typeof(State), drive.Element("State").Value)
                }).ToList();

                return drives;
            }
            else
            {
                return null;
            }
        }

        public Drive GetDriveById(int id)
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Drive> drives = xmlDocument.Root.Elements("Drive").Where(x => x.Element("Id").Value == id.ToString()).Select(driveFound => new Drive
                {
                    Id = int.Parse(driveFound.Element("Id").Value),
                    DateTime = DateTime.Parse(driveFound.Element("DateTime").Value),
                    StartLocation = new Location
                    {
                        Address = driveFound.Element("StartLocation").Value,
                        X = Double.Parse(driveFound.Element("StartLocationX").Value),
                        Y = Double.Parse(driveFound.Element("StartLocationY").Value),
                    },
                    Destination = new Location
                    {
                        Address = driveFound.Element("Destination").Value,
                        X = Double.Parse(driveFound.Element("DestinationX").Value),
                        Y = Double.Parse(driveFound.Element("DestinationY").Value),
                    },
                    Customer = new Customer
                    {
                        Id = int.Parse(driveFound.Element("CustomerId").Value),
                    },
                    Dispatcher = new Dispatcher
                    {
                        Id = int.Parse(driveFound.Element("DispatcherId").Value),
                    },
                    Driver = new Driver
                    {
                        Id = int.Parse(driveFound.Element("DriverId").Value),
                    },
                    Car = (Cars)Enum.Parse(typeof(Cars), driveFound.Element("Car").Value),
                    Price = Double.Parse(driveFound.Element("Price").Value),
                    Comment = new Comment
                    {
                        Id = int.Parse(driveFound.Element("CommentId").Value),
                    },
                    State = (State)Enum.Parse(typeof(State), driveFound.Element("State").Value)

                }).ToList();

                Drive drive = drives.First(x => x.Id == id);

                return drive;
            }
            else
            {
                return null;
            }
        }

        public IEnumerable<Drive> GetDrivesForCustomer(int customerId) 
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Drive> drives = xmlDocument.Root.Elements("Drive").Where(x => x.Element("CustomerId").Value == customerId.ToString()).Select(driveFound => new Drive
                {
                    Id = int.Parse(driveFound.Element("Id").Value),
                    DateTime = DateTime.Parse(driveFound.Element("DateTime").Value),
                    StartLocation = new Location
                    {
                        Address = driveFound.Element("StartLocation").Value,
                        X = Double.Parse(driveFound.Element("StartLocationX").Value),
                        Y = Double.Parse(driveFound.Element("StartLocationY").Value),
                    },
                    Destination = new Location
                    {
                        Address = driveFound.Element("Destination").Value,
                        X = Double.Parse(driveFound.Element("DestinationX").Value),
                        Y = Double.Parse(driveFound.Element("DestinationY").Value),
                    },
                    Customer = new Customer
                    {
                        Id = int.Parse(driveFound.Element("CustomerId").Value),
                    },
                    Dispatcher = new Dispatcher
                    {
                        Id = int.Parse(driveFound.Element("DispatcherId").Value),
                    },
                    Driver = new Driver
                    {
                        Id = int.Parse(driveFound.Element("DriverId").Value),
                    },
                    Car = (Cars)Enum.Parse(typeof(Cars), driveFound.Element("Car").Value),
                    Price = Double.Parse(driveFound.Element("Price").Value),
                    Comment = new Comment
                    {
                        Id = int.Parse(driveFound.Element("CommentId").Value),
                    },
                    State = (State)Enum.Parse(typeof(State), driveFound.Element("State").Value)

                }).ToList();

                return drives;
            }
            else
            {
                return null;
            }
        }

        public IEnumerable<Drive> GetDrivesForDispatcher(int dispatcherId)
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Drive> drives = xmlDocument.Root.Elements("Drive").Where(x => x.Element("DispatcherId").Value == dispatcherId.ToString()).Select(driveFound => new Drive
                {
                    Id = int.Parse(driveFound.Element("Id").Value),
                    DateTime = DateTime.Parse(driveFound.Element("DateTime").Value),
                    StartLocation = new Location
                    {
                        Address = driveFound.Element("StartLocation").Value,
                        X = Double.Parse(driveFound.Element("StartLocationX").Value),
                        Y = Double.Parse(driveFound.Element("StartLocationY").Value),
                    },
                    Destination = new Location
                    {
                        Address = driveFound.Element("Destination").Value,
                        X = Double.Parse(driveFound.Element("DestinationX").Value),
                        Y = Double.Parse(driveFound.Element("DestinationY").Value),
                    },
                    Customer = new Customer
                    {
                        Id = int.Parse(driveFound.Element("CustomerId").Value),
                    },
                    Dispatcher = new Dispatcher
                    {
                        Id = int.Parse(driveFound.Element("DispatcherId").Value),
                    },
                    Driver = new Driver
                    {
                        Id = int.Parse(driveFound.Element("DriverId").Value),
                    },
                    Car = (Cars)Enum.Parse(typeof(Cars), driveFound.Element("Car").Value),
                    Price = Double.Parse(driveFound.Element("Price").Value),
                    Comment = new Comment
                    {
                        Id = int.Parse(driveFound.Element("CommentId").Value),
                    },
                    State = (State)Enum.Parse(typeof(State), driveFound.Element("State").Value)

                }).ToList();

                return drives;
            }
            else
            {
                return null;
            }
        }

        public IEnumerable<Drive> GetDrivesForDriver(int driverId)
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Drive> drives = xmlDocument.Root.Elements("Drive").Where(x => x.Element("DriverId").Value == driverId.ToString()).Select(driveFound => new Drive
                {
                    Id = int.Parse(driveFound.Element("Id").Value),
                    DateTime = DateTime.Parse(driveFound.Element("DateTime").Value),
                    StartLocation = new Location
                    {
                        Address = driveFound.Element("StartLocation").Value,
                        X = Double.Parse(driveFound.Element("StartLocationX").Value),
                        Y = Double.Parse(driveFound.Element("StartLocationY").Value),
                    },
                    Destination = new Location
                    {
                        Address = driveFound.Element("Destination").Value,
                        X = Double.Parse(driveFound.Element("DestinationX").Value),
                        Y = Double.Parse(driveFound.Element("DestinationY").Value),
                    },
                    Customer = new Customer
                    {
                        Id = int.Parse(driveFound.Element("CustomerId").Value),
                    },
                    Dispatcher = new Dispatcher
                    {
                        Id = int.Parse(driveFound.Element("DispatcherId").Value),
                    },
                    Driver = new Driver
                    {
                        Id = int.Parse(driveFound.Element("DriverId").Value),
                    },
                    Car = (Cars)Enum.Parse(typeof(Cars), driveFound.Element("Car").Value),
                    Price = Double.Parse(driveFound.Element("Price").Value),
                    Comment = new Comment
                    {
                        Id = int.Parse(driveFound.Element("CommentId").Value),
                    },
                    State = (State)Enum.Parse(typeof(State), driveFound.Element("State").Value)

                }).ToList();

                return drives;
            }
            else
            {
                return null;
            }
        }
    }
}