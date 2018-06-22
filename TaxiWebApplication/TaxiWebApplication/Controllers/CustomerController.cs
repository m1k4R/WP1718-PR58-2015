using System;
using System.Collections.Generic;
using System.Linq;
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
            drive.Id = 1234;
            drive.State = Enums.State.Created;
            drive.Price = 0;
            drive.Destination = new Location
            {
                Address = "None",
                X = 0,
                Y = 0
            };

            Data.driveData.AddCustomerDrive(drive);
            return Request.CreateResponse(HttpStatusCode.Created, drive);
        }
    }
}
