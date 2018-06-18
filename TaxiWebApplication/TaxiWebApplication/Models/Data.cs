using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiWebApplication.Models
{
    public class Data
    {
        public static CustomerData customerData = new CustomerData();
        public static DispatcherData dispatcherData = new DispatcherData();
        public static DriverData driverData = new DriverData();
        public static DriveData driveData = new DriveData();
        public static CommentData commentData = new CommentData();

        public static List<User> users = new List<User>();  // tu cu ucitavati iz fajla
        public static List<Customer> customers = new List<Customer>();
        public static List<Dispatcher> dispatchers = new List<Dispatcher>();
        public static List<Driver> drivers = new List<Driver>();
        public static List<Drive> drives = new List<Drive>();

        public static int newId;

    }
}