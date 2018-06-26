using System;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiWebApplication.Models;

namespace TaxiWebApplication.Controllers
{
    public class CustomerController : ApiController
    {
        [HttpPost]
        [Route("api/Customer/CreateDrive")]
        public HttpResponseMessage CreateDrive([FromBody]Drive drive)
        {
            drive.Id = Data.NewDriveId();
            drive.State = Enums.State.Created;
            drive.Price = 0;
            drive.DateTime = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");
            drive.Dispatcher = new Dispatcher { Id = 0 };
            drive.Driver = new Driver { Id = 0 };
            drive.Comment = new Comment { Id = 0 };
            drive.Destination = new Location
            {
                Address = "None",
                X = 0,
                Y = 0
            };

            Data.driveData.AddDrive(drive);

            Drive driveFound = Data.driveData.GetDriveById(drive.Id);

            return Request.CreateResponse(HttpStatusCode.Created, driveFound);
        }

        [HttpPost]
        [Route("api/Customer/GetDrives")]
        public HttpResponseMessage GetDrives([FromBody]Customer customer)
        {
            List<Drive> drives = Data.driveData.GetDrivesForCustomer(customer.Id);

            if (drives != null)
            {
                foreach (Drive d in drives)
                {
                    if (d.Customer.Id != 0)
                    {
                        Customer c = Data.customerData.GetCustomerById(d.Customer.Id);
                        d.Customer = c;
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

        [HttpGet]
        [Route("api/Customer/GetDriveById")]
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

        [HttpPost]
        [Route("api/Customer/EditDrive")]
        public HttpResponseMessage EditDrive([FromBody]Drive drive)
        {
            Data.driveData.CustomerEditDrive(drive);

            Drive driveFound = Data.driveData.GetDriveById(drive.Id);

            return Request.CreateResponse(HttpStatusCode.Created, driveFound);
        }

        [HttpPost]
        [Route("api/Customer/CancelDrive")]
        public HttpResponseMessage CancelDrive([FromBody]Comment comment)
        {
            comment.Id = Data.NewCommentId();
            comment.CreatedDateTime = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");

            Data.commentData.AddComment(comment);

            Drive commentedDrive = Data.driveData.GetDriveById(comment.Drive.Id);

            commentedDrive.Comment = new Comment
            {
                Id = comment.Id
            };
            commentedDrive.State = Enums.State.Canceled;
            Data.driveData.CustomerCancelDrive(commentedDrive);

            Drive driveFound = Data.driveData.GetDriveById(commentedDrive.Id);
            driveFound.Comment = comment;
            if (driveFound.Customer.Id != 0)
            {
                Customer customer = Data.customerData.GetCustomerById(driveFound.Customer.Id);
                driveFound.Customer = customer;
            }

            return Request.CreateResponse(HttpStatusCode.Created, driveFound);
        }

        [HttpPost]
        [Route("api/Customer/CreateComment")]
        public HttpResponseMessage CreateComment([FromBody]Comment comment)
        {
            comment.Id = Data.NewCommentId();
            comment.CreatedDateTime = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");

            Data.commentData.AddComment(comment);

            Drive commentedDrive = Data.driveData.GetDriveById(comment.Drive.Id);

            commentedDrive.Comment = new Comment
            {
                Id = comment.Id
            };
            Data.driveData.CommentDrive(commentedDrive);

            Comment commentFound = Data.commentData.GetCommentById(comment.Id);

            return Request.CreateResponse(HttpStatusCode.Created, commentFound);
        }
    }
}
