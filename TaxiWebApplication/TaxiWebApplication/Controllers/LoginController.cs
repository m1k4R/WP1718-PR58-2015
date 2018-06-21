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
        public HttpResponseMessage SignIn([FromBody]Customer customer)
        {
            if (Data.customerData.LoginCustomer(customer.Username, customer.Password))
            {
                Customer customerFind = Data.customerData.GetCustomerByUsername(customer.Username);
                return Request.CreateResponse(HttpStatusCode.OK, customerFind);
            }
            else if (Data.dispatcherData.LoginDispatcher(customer.Username, customer.Password))
            {
                Dispatcher dispatcherFind = Data.dispatcherData.GetDispatcherByUsername(customer.Username);
                return Request.CreateResponse(HttpStatusCode.OK, dispatcherFind);
            }
            else if (Data.driverData.LoginDriver(customer.Username, customer.Password))
            {
                Driver driverFind = Data.driverData.GetDriverByUsername(customer.Username);
                return Request.CreateResponse(HttpStatusCode.OK, driverFind);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

        }
    }
}
