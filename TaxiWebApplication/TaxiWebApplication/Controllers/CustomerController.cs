﻿using System;
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
                /*
                if (driveFound.Comment.Id != 0)
                {
                    Comment comment = Data.commentData.Get(driveFound.Customer.Id);
                    driveFound.Customer = customer;
                }
                */
                return Request.CreateResponse(HttpStatusCode.OK, driveFound);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }


        }
    }
}
