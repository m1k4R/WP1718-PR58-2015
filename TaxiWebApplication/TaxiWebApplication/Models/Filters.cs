using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiWebApplication.Models
{
    public class Filters
    {
        public static List<Drive> FilterDrives (List<Drive> drives, string filter, string sort, string fromDate, string toDate, string fromGrade, string toGrade, string fromPrice, string toPrice, string role, string searchName, string searchSurname, string message)
        {
            List<Drive> filteredDrives = new List<Drive>();

            if (drives != null)
            {
                if (filter == "Filter")
                {
                    foreach (Drive d in drives)
                    {
                        filteredDrives.Add(d);
                    }
                }
                else if (filter == "Created")
                {
                    foreach (Drive d in drives)
                    {
                        if (d.State.ToString() == "Created")
                        {
                            filteredDrives.Add(d);
                        }
                    }
                }
                else if (filter == "Formated")
                {
                    foreach (Drive d in drives)
                    {
                        if (d.State.ToString() == "Formated")
                        {
                            filteredDrives.Add(d);
                        }
                    }
                }
                else if (filter == "Processed")
                {
                    foreach (Drive d in drives)
                    {
                        if (d.State.ToString() == "Processed")
                        {
                            filteredDrives.Add(d);
                        }
                    }
                }
                else if (filter == "Accepted")
                {
                    foreach (Drive d in drives)
                    {
                        if (d.State.ToString() == "Accepted")
                        {
                            filteredDrives.Add(d);
                        }
                    }
                }
                else if (filter == "Canceled")
                {
                    foreach (Drive d in drives)
                    {
                        if (d.State.ToString() == "Canceled")
                        {
                            filteredDrives.Add(d);
                        }
                    }
                }
                else if (filter == "Unsuccessful")
                {
                    foreach (Drive d in drives)
                    {
                        if (d.State.ToString() == "Unsuccessful")
                        {
                            filteredDrives.Add(d);
                        }
                    }
                }
                else if (filter == "Successful")
                {
                    foreach (Drive d in drives)
                    {
                        if (d.State.ToString() == "Successful")
                        {
                            filteredDrives.Add(d);
                        }
                    }
                }

                foreach (Drive dr in filteredDrives)
                {
                    if (dr.Customer.Id != 0)
                    {
                        Customer c = Data.customerData.GetCustomerById(dr.Customer.Id);
                        dr.Customer = c;
                    }
                    if (dr.Dispatcher.Id != 0)
                    {
                        Dispatcher dispatcher = Data.dispatcherData.GetDispatcherById(dr.Dispatcher.Id);
                        dr.Dispatcher = dispatcher;
                    }
                    if (dr.Driver.Id != 0)
                    {
                        Driver driver = Data.driverData.GetDriverById(dr.Driver.Id);
                        dr.Driver = driver;
                    }
                    if (dr.Comment.Id != 0)
                    {
                        Comment comment = Data.commentData.GetCommentById(dr.Comment.Id);
                        dr.Comment = comment;
                    }
                }

                if (sort != "Sort")
                {
                    if (sort == "Date")
                    {
                        filteredDrives.Sort((x, y) => DateTime.Compare(DateTime.ParseExact(y.DateTime, "dd-MM-yyyy HH:mm:ss", null), DateTime.ParseExact(x.DateTime, "dd-MM-yyyy HH:mm:ss", null)));
                    }
                    else if (sort == "Grade")
                    {
                        filteredDrives.RemoveAll(x => x.Comment == null);
                        filteredDrives.Sort((x, y) => y.Comment.Grade.CompareTo(x.Comment.Grade));
                    }
                }

                if (!String.IsNullOrEmpty(fromDate) && !String.IsNullOrEmpty(toDate))
                {
                    DateTime from = DateTime.Parse(fromDate);
                    DateTime to = DateTime.Parse(toDate);
                    filteredDrives.RemoveAll(d => (DateTime.ParseExact(d.DateTime, "dd-MM-yyyy HH:mm:ss", null).Date < from.Date) || (DateTime.ParseExact(d.DateTime, "dd-MM-yyyy HH:mm:ss", null).Date > to.Date));
                }
                else if (!String.IsNullOrEmpty(fromDate))
                {
                    DateTime from = DateTime.Parse(fromDate);
                    filteredDrives.RemoveAll(d => DateTime.ParseExact(d.DateTime, "dd-MM-yyyy HH:mm:ss", null).Date < from.Date);
                }
                else if (!String.IsNullOrEmpty(toDate))
                {
                    DateTime to = DateTime.Parse(toDate);
                    filteredDrives.RemoveAll(d => DateTime.ParseExact(d.DateTime, "dd-MM-yyyy HH:mm:ss", null).Date > to.Date);
                }

                if (fromGrade != "From" && toGrade != "To")
                {
                    int from = int.Parse(fromGrade);
                    int to = int.Parse(toGrade);
                    filteredDrives.RemoveAll(x => x.Comment == null);
                    filteredDrives.RemoveAll(d => (d.Comment.Grade < from) || (d.Comment.Grade > to));
                }
                else if (fromGrade != "From")
                {
                    int from = int.Parse(fromGrade);
                    filteredDrives.RemoveAll(x => x.Comment == null);
                    filteredDrives.RemoveAll(d => d.Comment.Grade < from);
                }
                else if (toGrade != "To")
                {
                    int to = int.Parse(toGrade);
                    filteredDrives.RemoveAll(x => x.Comment == null);
                    filteredDrives.RemoveAll(d => d.Comment.Grade > to);
                }

                if (!String.IsNullOrEmpty(fromPrice) && !String.IsNullOrEmpty(toPrice))
                {
                    double from = double.Parse(fromPrice);
                    double to = double.Parse(toPrice);
                    filteredDrives.RemoveAll(d => (d.Price < from) || (d.Price > to));
                }
                else if (!String.IsNullOrEmpty(fromPrice))
                {
                    double from = double.Parse(fromPrice);
                    filteredDrives.RemoveAll(d => d.Price < from);
                }
                else if (!String.IsNullOrEmpty(toPrice))
                {
                    double to = double.Parse(toPrice);
                    filteredDrives.RemoveAll(d => d.Price > to);
                }

                if (message == "Dispatcher")
                {
                    if (role == "Customer")
                    {
                        if (!String.IsNullOrEmpty(searchName) && !String.IsNullOrEmpty(searchSurname))
                        {
                            filteredDrives.RemoveAll(d => d.Customer.Username == null);
                            filteredDrives.RemoveAll(d => ((!d.Customer.Name.ToLower().Contains(searchName.ToLower())) || (!d.Customer.Surname.ToLower().Contains(searchSurname.ToLower()))));
                        }
                        else if (!String.IsNullOrEmpty(searchName))
                        {
                            filteredDrives.RemoveAll(d => d.Customer.Username == null);
                            filteredDrives.RemoveAll(d => (!d.Customer.Name.ToLower().Contains(searchName.ToLower())));
                        }
                        else if (!String.IsNullOrEmpty(searchSurname))
                        {
                            filteredDrives.RemoveAll(d => d.Customer.Username == null);
                            filteredDrives.RemoveAll(d => (!d.Customer.Surname.ToLower().Contains(searchSurname.ToLower())));
                        }
                    }
                    else if (role == "Driver")
                    {
                        if (!String.IsNullOrEmpty(searchName) && !String.IsNullOrEmpty(searchSurname))
                        {
                            filteredDrives.RemoveAll(d => d.Driver.Username == null);
                            filteredDrives.RemoveAll(d => ((!d.Driver.Name.ToLower().Contains(searchName.ToLower())) || (!d.Driver.Surname.ToLower().Contains(searchSurname.ToLower()))));
                        }
                        else if (!String.IsNullOrEmpty(searchName))
                        {
                            filteredDrives.RemoveAll(d => d.Driver.Username == null);
                            filteredDrives.RemoveAll(d => (!d.Driver.Name.ToLower().Contains(searchName.ToLower())));
                        }
                        else if (!String.IsNullOrEmpty(searchSurname))
                        {
                            filteredDrives.RemoveAll(d => d.Driver.Username == null);
                            filteredDrives.RemoveAll(d => (!d.Driver.Surname.ToLower().Contains(searchSurname.ToLower())));
                        }
                    }

                }


                return filteredDrives;
            }
            else
            {
                return drives;
            }
        }
    }
}