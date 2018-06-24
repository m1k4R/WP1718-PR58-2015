using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiWebApplication.Models;

namespace TaxiWebApplication.Controllers
{
    public class LoginController : ApiController
    {
        [HttpPost]
        [Route("api/Login/SignIn")]
        public HttpResponseMessage SignIn([FromBody]Login user)
        {
            if (Data.customerData.LoginCustomer(user.Username, user.Password))
            {
                Customer customerFind = Data.customerData.GetCustomerByUsername(user.Username);
                return Request.CreateResponse(HttpStatusCode.OK, customerFind);
            }
            else if (Data.dispatcherData.LoginDispatcher(user.Username, user.Password))
            {
                Dispatcher dispatcherFind = Data.dispatcherData.GetDispatcherByUsername(user.Username);
                return Request.CreateResponse(HttpStatusCode.OK, dispatcherFind);
            }
            else if (Data.driverData.LoginDriver(user.Username, user.Password))
            {
                Driver driverFind = Data.driverData.GetDriverByUsername(user.Username);
                return Request.CreateResponse(HttpStatusCode.OK, driverFind);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

        }
    }
}
