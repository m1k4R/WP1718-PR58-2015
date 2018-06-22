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
                Data.driverData.AddDriver(driver);

                Driver driverFind = Data.driverData.GetDriverByUsername(driver.Username);

                return Request.CreateResponse(HttpStatusCode.Created, driverFind);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

        }
    }
}
