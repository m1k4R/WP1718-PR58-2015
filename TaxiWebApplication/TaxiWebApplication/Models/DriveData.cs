using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace TaxiWebApplication.Models
{
    public class DriveData
    {
        private string fileName = HttpContext.Current.Server.MapPath("~/App_Data/Drives.xml");

        public void AddCustomerDrive(Drive drive)
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
                            new XElement("DispatcherId", "0000"),
                            new XElement("DriverId", "0000"),
                            new XElement("Car", drive.Car),
                            new XElement("Price", drive.Price),
                            new XElement("CommentId", "0000"),
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
                                    new XElement("DispatcherId", "0000"),
                                    new XElement("DriverId", "0000"),
                                    new XElement("Car", drive.Car),
                                    new XElement("Price", drive.Price),
                                    new XElement("CommentId", "0000"),
                                    new XElement("State", drive.State)));

                    xmlDocument.Save(fileName);
                }
                catch { }
            }
        }
    }
}