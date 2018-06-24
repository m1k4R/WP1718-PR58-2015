using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using static TaxiWebApplication.Models.Enums;

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

        public bool CheckIfCustomerExists(string username)
        {
            bool retVal = false;

            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                retVal = (from customer in xmlDocument.Root.Elements("Customer")
                          where customer.Element("Username").Value.ToString().ToLower().Equals(username.ToLower())
                          select customer).Any();

                return retVal;
            }
            else
            {
                return retVal;
            }
        }

        public IEnumerable<Customer> RetriveAllCustomers()
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Customer> customers = xmlDocument.Root.Elements("Customer").Select(customer => new Customer
                {
                    Id = int.Parse(customer.Element("Id").Value),
                    Username = customer.Element("Username").Value,
                    Password = customer.Element("Password").Value,
                    Name = customer.Element("Name").Value,
                    Surname = customer.Element("Surname").Value,
                    Gender = (Genders)Enum.Parse(typeof(Genders), customer.Element("Gender").Value),
                    Jmbg = customer.Element("Jmbg").Value,
                    Phone = customer.Element("Phone").Value,
                    Email = customer.Element("Email").Value,
                    Role = (Roles)Enum.Parse(typeof(Roles), customer.Element("Role").Value)

                }).ToList();

                return customers;
            }
            else
            {
                return null;
            }
        }

        public bool LoginCustomer (string username, string password)
        {
            bool retVal = false;

            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                retVal = (from customer in xmlDocument.Root.Elements("Customer")
                          where (customer.Element("Username").Value.ToString().ToLower().Equals(username.ToLower()) && customer.Element("Password").Value.ToString().Equals(password) )
                          select customer).Any();

                return retVal;
            }
            else
            {
                return retVal;
            }
        }

        public Customer GetCustomerByUsername (string username)
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Customer> customers = xmlDocument.Root.Elements("Customer").Where(x => x.Element("Username").Value.ToLower().Equals(username.ToLower())).Select(customerFind => new Customer
                {
                    Id = int.Parse(customerFind.Element("Id").Value),
                    Username = customerFind.Element("Username").Value,
                    Password = customerFind.Element("Password").Value,
                    Name = customerFind.Element("Name").Value,
                    Surname = customerFind.Element("Surname").Value,
                    Gender = (Genders)Enum.Parse(typeof(Genders), customerFind.Element("Gender").Value),
                    Jmbg = customerFind.Element("Jmbg").Value,
                    Phone = customerFind.Element("Phone").Value,
                    Email = customerFind.Element("Email").Value,
                    Role = (Roles)Enum.Parse(typeof(Roles), customerFind.Element("Role").Value)

                }).ToList();

                Customer customer = customers.First(x => x.Username.ToLower().Equals(username.ToLower()));

                return customer;
            }
            else
            {
                return null;
            }
        }

        public Customer GetCustomerById(int id)
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Customer> customers = xmlDocument.Root.Elements("Customer").Where(x => x.Element("Id").Value == id.ToString()).Select(customerFind => new Customer
                {
                    Id = int.Parse(customerFind.Element("Id").Value),
                    Username = customerFind.Element("Username").Value,
                    Password = customerFind.Element("Password").Value,
                    Name = customerFind.Element("Name").Value,
                    Surname = customerFind.Element("Surname").Value,
                    Gender = (Genders)Enum.Parse(typeof(Genders), customerFind.Element("Gender").Value),
                    Jmbg = customerFind.Element("Jmbg").Value,
                    Phone = customerFind.Element("Phone").Value,
                    Email = customerFind.Element("Email").Value,
                    Role = (Roles)Enum.Parse(typeof(Roles), customerFind.Element("Role").Value)

                }).ToList();

                Customer customer = customers.First(x => x.Id == id);

                return customer;
            }
            else
            {
                return null;
            }
        }

        public void EditCustomer(Customer customer)
        {
            if (File.Exists(fileName))
            {
                XDocument xmlDocument = XDocument.Load(fileName);

                xmlDocument.Element("Customers").Elements("Customer")
                                                .Where(x => x.Element("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Username", customer.Username);
                xmlDocument.Element("Customers").Elements("Customer")
                                                .Where(x => x.Element("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Password", customer.Password);
                xmlDocument.Element("Customers").Elements("Customer")
                                                .Where(x => x.Element("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Name", customer.Name);
                xmlDocument.Element("Customers").Elements("Customer")
                                                .Where(x => x.Element("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Surname", customer.Surname);
                xmlDocument.Element("Customers").Elements("Customer")
                                                .Where(x => x.Element("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Gender", customer.Gender);
                xmlDocument.Element("Customers").Elements("Customer")
                                                .Where(x => x.Element("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Jmbg", customer.Jmbg);
                xmlDocument.Element("Customers").Elements("Customer")
                                                .Where(x => x.Element("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Phone", customer.Phone);
                xmlDocument.Element("Customers").Elements("Customer")
                                                .Where(x => x.Element("Id").Value == customer.Id.ToString()).FirstOrDefault()
                                                .SetElementValue("Email", customer.Email);

                xmlDocument.Save(fileName);
            }
        }
    }
}