using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiWebApplication.Models;

namespace TaxiWebApplication.Controllers
{
    public class RegisterController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage RegisterUser([FromBody]Customer customer)
        {
            if (!Data.customerData.CheckIfCustomerExists(customer.Username) && !Data.dispatcherData.CheckIfDispatcherExists(customer.Username) && !Data.driverData.CheckIfDriverExists(customer.Username))
            {
                customer.Id = Data.NewId();
                customer.Role = Enums.Roles.Customer;
                Data.customerData.AddCustomer(customer);

                return Request.CreateResponse(HttpStatusCode.Created, customer);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
            
        }
    }
}
