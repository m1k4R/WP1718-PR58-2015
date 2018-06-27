using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiWebApplication.Models;

namespace TaxiWebApplication.Controllers
{
    public class DispatcherController : ApiController
    {
        [HttpPost]
        [Route("api/Dispatcher/AddDriver")]
        public HttpResponseMessage AddDriver([FromBody]Driver driver)
        {
            if (!Data.customerData.CheckIfCustomerExists(driver.Username) && !Data.dispatcherData.CheckIfDispatcherExists(driver.Username) && !Data.driverData.CheckIfDriverExists(driver.Username))
            {
                driver.Id = Data.NewId();
                driver.Role = Enums.Roles.Driver;
                driver.Car = new Car
                {
                    Id = Data.NewId() + 4000,
                    YearOfCar = driver.Car.YearOfCar,
                    RegNumber = driver.Car.RegNumber,
                    Type = driver.Car.Type
                };
                driver.Occupied = false;

                Data.driverData.AddDriver(driver);

                Driver driverFind = Data.driverData.GetDriverByUsername(driver.Username);

                return Request.CreateResponse(HttpStatusCode.Created, driverFind);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

        }

        [HttpPost]
        [Route("api/Dispatcher/CreateDrive")]
        public HttpResponseMessage CreateDrive([FromBody]Drive drive)
        {
            drive.Id = Data.NewDriveId();
            drive.State = Enums.State.Formated;
            drive.Price = 0;
            drive.DateTime = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");
            drive.Customer = new Customer { Id = 0 };
            drive.Comment = new Comment { Id = 0 };
            drive.Destination = new Location
            {
                Address = "None",
                X = 0,
                Y = 0
            };

            Data.driveData.AddDrive(drive);

            Drive driveFound = Data.driveData.GetDriveById(drive.Id);

            Driver driver = Data.driverData.GetDriverById(driveFound.Driver.Id);
            driver.Occupied = true;
            Data.driverData.TakeDriver(driver);

            driveFound.Driver = driver;

            return Request.CreateResponse(HttpStatusCode.Created, driveFound);
        }

        [HttpPost]
        [Route("api/Dispatcher/GetDrives")]
        public HttpResponseMessage GetDrives([FromBody]Dispatcher dispatcher)
        {
            List<Drive> drives = Data.driveData.GetDrivesForDispatcher(dispatcher.Id);

            if (drives != null)
            {
                foreach (Drive d in drives)
                {
                    if (d.Customer.Id != 0)
                    {
                        Customer customer = Data.customerData.GetCustomerById(d.Customer.Id);
                        d.Customer = customer;
                    }
                    if (d.Dispatcher.Id != 0)
                    {
                        Dispatcher ds = Data.dispatcherData.GetDispatcherById(d.Dispatcher.Id);
                        d.Dispatcher = ds;
                    }
                    if (d.Driver.Id != 0)
                    {
                        Driver dr = Data.driverData.GetDriverById(d.Driver.Id);
                        d.Driver = dr;
                    }
                    if (d.Comment.Id != 0)
                    {
                        Comment comment = Data.commentData.GetCommentById(d.Comment.Id);
                        d.Comment = comment;
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK, drives);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [HttpGet]
        [Route("api/Dispatcher/GetDriveById")]
        public HttpResponseMessage GetDriveById([FromUri]Drive drive)
        {
            Drive driveFound = Data.driveData.GetDriveById(drive.Id);

            if (driveFound != null)
            {

                if (driveFound.Customer.Id != 0)
                {
                    Customer customer = Data.customerData.GetCustomerById(driveFound.Customer.Id);
                    driveFound.Customer = customer;
                }
                if (driveFound.Dispatcher.Id != 0)
                {
                    Dispatcher dispatcher = Data.dispatcherData.GetDispatcherById(driveFound.Dispatcher.Id);
                    driveFound.Dispatcher = dispatcher;
                }
                if (driveFound.Driver.Id != 0)
                {
                    Driver driver = Data.driverData.GetDriverById(driveFound.Driver.Id);
                    driveFound.Driver = driver;
                }
                if (driveFound.Comment.Id != 0)
                {
                    Comment comment = Data.commentData.GetCommentById(driveFound.Comment.Id);
                    driveFound.Comment = comment;
                }
                return Request.CreateResponse(HttpStatusCode.OK, driveFound);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [HttpGet]
        [Route("api/Dispatcher/GetOnHoldDrives")]
        public HttpResponseMessage GetOnHoldDrives()
        {
            List<Drive> drivesOnHold = Data.driveData.GetOnHoldDrives();
            
            return Request.CreateResponse(HttpStatusCode.OK, drivesOnHold);
            
        }

        [HttpGet]
        [Route("api/Dispatcher/GetFreeDrivers")]
        public HttpResponseMessage GetFreeDrivers()
        {
            List<Driver> freeDrivers = Data.driverData.GetFreeDrivers();

            return Request.CreateResponse(HttpStatusCode.OK, freeDrivers);

        }

        [HttpGet]
        [Route("api/Dispatcher/GetDriverById")]
        public HttpResponseMessage GetDriverById([FromUri]Driver driver)
        {
            Driver driverFound = Data.driverData.GetDriverById(driver.Id);

            if (driverFound != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, driverFound);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [HttpPost]
        [Route("api/Dispatcher/ProcessedDrive")]
        public HttpResponseMessage ProcessedDrive([FromBody]Drive drive)
        {
            drive.State = Enums.State.Processed;
            Data.driveData.DispatcherProcessedDrive(drive);

            Drive driveFound = Data.driveData.GetDriveById(drive.Id);
            Driver driver = Data.driverData.GetDriverById(driveFound.Driver.Id);
            driver.Occupied = true;
            Data.driverData.TakeDriver(driver);
            driveFound.Driver = driver;
            Dispatcher dispatcher = Data.dispatcherData.GetDispatcherById(driveFound.Dispatcher.Id);
            driveFound.Dispatcher = dispatcher;
            Customer customer = Data.customerData.GetCustomerById(driveFound.Customer.Id);
            driveFound.Customer = customer;

            return Request.CreateResponse(HttpStatusCode.Created, driveFound);
        }

        [HttpGet]
        [Route("api/Dispatcher/GetAllDrives")]
        public HttpResponseMessage GetAllDrives()
        {
            IEnumerable<Drive> drives = Data.driveData.RetriveAllDrives();

            if (drives != null)
            {
                foreach (Drive d in drives)
                {
                    if (d.Customer.Id != 0)
                    {
                        Customer customer = Data.customerData.GetCustomerById(d.Customer.Id);
                        d.Customer = customer;
                    }
                    if (d.Dispatcher.Id != 0)
                    {
                        Dispatcher dispatcher = Data.dispatcherData.GetDispatcherById(d.Dispatcher.Id);
                        d.Dispatcher = dispatcher;
                    }
                    if (d.Driver.Id != 0)
                    {
                        Driver driver = Data.driverData.GetDriverById(d.Driver.Id);
                        d.Driver = driver;
                    }
                    if (d.Comment.Id != 0)
                    {
                        Comment comment = Data.commentData.GetCommentById(d.Comment.Id);
                        d.Comment = comment;
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK, drives);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [HttpPost]
        [Route("api/Dispatcher/GetFilteredDrives")]
        public HttpResponseMessage GetFilteredDrives([FromBody]JToken jToken)
        {
            string dispatcherId = jToken.Value<string>("dispatcherId");
            int id = int.Parse(dispatcherId);
            string filter = jToken.Value<string>("filter");
            string sort = jToken.Value<string>("sort");
            string fromDate = jToken.Value<string>("fromDate");
            string toDate = jToken.Value<string>("toDate");
            string fromGrade = jToken.Value<string>("fromGrade");
            string toGrade = jToken.Value<string>("toGrade");
            string fromPrice = jToken.Value<string>("fromPrice");
            string toPrice = jToken.Value<string>("toPrice");
            string role = jToken.Value<string>("role");
            string searchName = jToken.Value<string>("searchName");
            string searchSurname = jToken.Value<string>("searchSurname");
            List<Drive> drives = Data.driveData.GetDrivesForDispatcher(id);
            List<Drive> filteredDrives = Filters.FilterDrives(drives, filter, sort, fromDate, toDate, fromGrade, toGrade, fromPrice, toPrice, role, searchName, searchSurname, "Dispatcher");


            if (drives != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, filteredDrives);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

        }

        [HttpPost]
        [Route("api/Dispatcher/GetFilteredSystemDrives")]
        public HttpResponseMessage GetFilteredSystemDrives([FromBody]JToken jToken)
        {
            string dispatcherId = jToken.Value<string>("dispatcherId");
            int id = int.Parse(dispatcherId);
            string filter = jToken.Value<string>("filter");
            string sort = jToken.Value<string>("sort");
            string fromDate = jToken.Value<string>("fromDate");
            string toDate = jToken.Value<string>("toDate");
            string fromGrade = jToken.Value<string>("fromGrade");
            string toGrade = jToken.Value<string>("toGrade");
            string fromPrice = jToken.Value<string>("fromPrice");
            string toPrice = jToken.Value<string>("toPrice");
            string role = jToken.Value<string>("role");
            string searchName = jToken.Value<string>("searchName");
            string searchSurname = jToken.Value<string>("searchSurname");
            List<Drive> drives = Data.driveData.RetriveAllDrives().ToList();
            List<Drive> filteredDrives = Filters.FilterDrives(drives, filter, sort, fromDate, toDate, fromGrade, toGrade, fromPrice, toPrice, role, searchName, searchSurname, "Dispatcher");


            if (drives != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, filteredDrives);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

        }
    }
}
