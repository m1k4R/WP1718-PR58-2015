using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiWebApplication.Models;

namespace TaxiWebApplication.Controllers
{
    public class DriverController : ApiController
    {
        [HttpPost]
        [Route("api/Driver/ChangeLocation")]
        public HttpResponseMessage ChangeLocation([FromBody]Driver driver)
        {
            if (Data.driverData.CheckIfDriverExists(driver.Username))
            {
                Data.driverData.ChangeDriverLocation(driver);
                Driver driverFind = Data.driverData.GetDriverByUsername(driver.Username);
                return Request.CreateResponse(HttpStatusCode.OK, driverFind);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [HttpGet]
        [Route("api/Driver/GetDriverById")]
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
        [Route("api/Driver/GetDrives")]
        public HttpResponseMessage GetDrives([FromBody]Driver driver)
        {
            List<Drive> drives = Data.driveData.GetDrivesForDriver(driver.Id);

            if (drives != null)
            {
                foreach(Drive d in drives)
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
        [Route("api/Driver/GetDriveById")]
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
        [Route("api/Driver/GetOnHoldDrives")]
        public HttpResponseMessage GetOnHoldDrives()
        {
            List<Drive> drivesOnHold = Data.driveData.GetOnHoldDrives();

            return Request.CreateResponse(HttpStatusCode.OK, drivesOnHold);

        }

        [HttpPost]
        [Route("api/Driver/AcceptedDrive")]
        public HttpResponseMessage AcceptedDrive([FromBody]Drive drive)
        {
            drive.State = Enums.State.Accepted;
            Data.driveData.DriverAcceptedDrive(drive);

            Drive driveFound = Data.driveData.GetDriveById(drive.Id);
            Driver driver = Data.driverData.GetDriverById(driveFound.Driver.Id);
            driver.Occupied = true;
            Data.driverData.TakeDriver(driver);
            driveFound.Driver = driver;
            Customer customer = Data.customerData.GetCustomerById(driveFound.Customer.Id);
            driveFound.Customer = customer;

            return Request.CreateResponse(HttpStatusCode.OK, driveFound);
        }

        [HttpPost]
        [Route("api/Driver/UnsuccessfulDrive")]
        public HttpResponseMessage UnsuccessfulDrive([FromBody]Comment comment)
        {
            comment.Id = Data.NewCommentId();
            comment.CreatedDateTime = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");
            comment.Grade = 0;

            Data.commentData.AddComment(comment);

            Drive commentedDrive = Data.driveData.GetDriveById(comment.Drive.Id);

            commentedDrive.Comment = new Comment
            {
                Id = comment.Id
            };
            commentedDrive.State = Enums.State.Unsuccessful;
            Data.driveData.UnsuccessfulDrive(commentedDrive);

            Drive driveFound = Data.driveData.GetDriveById(commentedDrive.Id);
            driveFound.Comment = comment;
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
                driver.Occupied = false;
                Data.driverData.FreeDriver(driver);
                driveFound.Driver = driver;
            }

            return Request.CreateResponse(HttpStatusCode.Created, driveFound);
        }

        [HttpPost]
        [Route("api/Driver/SuccessfulDrive")]
        public HttpResponseMessage SuccessfulDrive([FromBody]Drive drive)
        {
            drive.State = Enums.State.Successful;
            Data.driveData.SuccessfulDrive(drive);

            Drive driveFound = Data.driveData.GetDriveById(drive.Id);
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
                driver.Occupied = false;
                Data.driverData.FreeDriver(driver);
                driveFound.Driver = driver;
            }
            if (driveFound.Comment.Id != 0)
            {
                Comment comment = Data.commentData.GetCommentById(driveFound.Comment.Id);
                driveFound.Comment = comment;
            }

            return Request.CreateResponse(HttpStatusCode.OK, driveFound);
        }


    }
}
