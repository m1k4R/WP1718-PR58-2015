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
    }
}
