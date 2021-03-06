﻿using System;
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

        public static IEnumerable<User> users = new List<User>();
        public static IEnumerable<Customer> customers = new List<Customer>();//customerData.RetriveAllCustomers();
        public static IEnumerable<Dispatcher> dispatchers = new List<Dispatcher>();//dispatcherData.RetriveAllDispatchers();
        public static IEnumerable<Driver> drivers = new List<Driver>();//driverData.RetriveAllDrivers();
        public static IEnumerable<Drive> drives = new List<Drive>();//driveData.RetriveAllDrives();
        public static IEnumerable<Comment> comments = new List<Comment>();

        public static int NewId()
        {
            int customersCount = 0;
            int dispatchersCount = 0;
            int driversCount = 0;

            customers = customerData.RetriveAllCustomers();
            dispatchers = dispatcherData.RetriveAllDispatchers();
            drivers = driverData.RetriveAllDrivers();

            if (customers != null)
            {
                customersCount = Data.customers.Count();
            }
            if (dispatchers != null)
            {
                dispatchersCount = Data.dispatchers.Count();
            }
            if (drivers != null)
            {
                driversCount = Data.drivers.Count();
            }

            return customersCount + dispatchersCount + driversCount + 1;
        }

        public static int NewDriveId()
        {
            int drivesCount = 0;

            drives = driveData.RetriveAllDrives();

            if (drives != null)
            {
                drivesCount = drives.Count();
            }

            return drivesCount + 1000;
        }

        public static int NewCommentId()
        {
            int commentsCount = 0;

            comments = commentData.RetriveAllComments();

            if (comments != null)
            {
                commentsCount = comments.Count();
            }

            return commentsCount + 10000;
        }

    }
}