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
            customer.Id = 1;
            customer.Role = Enums.Roles.Customer;
            Data.customerData.AddCustomer(customer);

            return Request.CreateResponse(HttpStatusCode.Created, customer);
        }
    }
}
