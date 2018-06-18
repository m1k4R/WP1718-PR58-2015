using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace TaxiWebApplication.Models
{
    public class CustomerData
    {
        private string fileName = HttpContext.Current.Server.MapPath("~/App_Data/Customers.xml");

        public void AddCustomer(Customer customer)
        {
            if (!File.Exists(fileName))
            {
                XDocument xmlDocument = new XDocument(
                    new XDeclaration("1.0", "utf-8", "yes"),
                    new XElement("Customers",
                        new XElement("Customer",
                            new XElement("Id", customer.Id),
                            new XElement("Username", customer.Username),
                            new XElement("Password", customer.Password),
                            new XElement("Name", customer.Name),
                            new XElement("Surname", customer.Surname),
                            new XElement("Gender", customer.Gender),
                            new XElement("Jmbg", customer.Jmbg),
                            new XElement("Phone", customer.Phone),
                            new XElement("Email", customer.Email),
                            new XElement("Role", customer.Role))
                    ));

                xmlDocument.Save(fileName);
            }
            else
            {
                try
                {
                    FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                    XDocument xmlDocument = XDocument.Load(stream);
                    XElement customers = xmlDocument.Element("Customers");
                    customers.Add(new XElement("Customer",
                                    new XElement("Id", customer.Id),
                                    new XElement("Username", customer.Username),
                                    new XElement("Password", customer.Password),
                                    new XElement("Name", customer.Name),
                                    new XElement("Surname", customer.Surname),
                                    new XElement("Gender", customer.Gender),
                                    new XElement("Jmbg", customer.Jmbg),
                                    new XElement("Phone", customer.Phone),
                                    new XElement("Email", customer.Email),
                                    new XElement("Role", customer.Role)));

                    xmlDocument.Save(fileName);
                }
                catch { }
            }
        }
    }
}