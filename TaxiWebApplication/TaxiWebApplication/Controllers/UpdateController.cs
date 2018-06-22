using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TaxiWebApplication.Models;

namespace TaxiWebApplication.Controllers
{
    public class UpdateController : ApiController
    {
        [HttpPost]
        [Route("api/Update/UpdateCustomer")]
        public HttpResponseMessage UpdateCustomer([FromBody]Customer customer) 
        {
            if (!Data.customerData.CheckIfCustomerExists(customer.Username) && !Data.dispatcherData.CheckIfDispatcherExists(customer.Username) && !Data.driverData.CheckIfDriverExists(customer.Username))
            {
                    Data.customerData.EditCustomer(customer);
                    Customer customerFind = Data.customerData.GetCustomerByUsername(customer.Username);
                    return Request.CreateResponse(HttpStatusCode.OK, customerFind);
            }
            else if (Data.customerData.CheckIfCustomerExists(customer.Username))
            {
                Customer customerFind = Data.customerData.GetCustomerByUsername(customer.Username);

                if (customer.Id == customerFind.Id)
                {
                    Data.customerData.EditCustomer(customer);
                    Customer customerUpdate = Data.customerData.GetCustomerByUsername(customer.Username);
                    return Request.CreateResponse(HttpStatusCode.OK, customerUpdate);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError);
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

        }

        [HttpPost]
        [Route("api/Update/UpdateDispatcher")]
        public HttpResponseMessage UpdateDispatcher([FromBody]Dispatcher dispatcher)
        {
            if (!Data.customerData.CheckIfCustomerExists(dispatcher.Username) && !Data.dispatcherData.CheckIfDispatcherExists(dispatcher.Username) && !Data.driverData.CheckIfDriverExists(dispatcher.Username))
            {
                Data.dispatcherData.EditDispatcher(dispatcher);
                Dispatcher dispatcherFind = Data.dispatcherData.GetDispatcherByUsername(dispatcher.Username);
                return Request.CreateResponse(HttpStatusCode.OK, dispatcherFind);
            }
            else if (Data.dispatcherData.CheckIfDispatcherExists(dispatcher.Username))
            {
                Dispatcher dispatcherFind = Data.dispatcherData.GetDispatcherByUsername(dispatcher.Username);

                if (dispatcher.Id == dispatcherFind.Id)
                {
                    Data.dispatcherData.EditDispatcher(dispatcher);
                    Dispatcher dispatcherUpdate = Data.dispatcherData.GetDispatcherByUsername(dispatcher.Username);
                    return Request.CreateResponse(HttpStatusCode.OK, dispatcherUpdate);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError);
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

        }

        [HttpPost]
        [Route("api/Update/UpdateDriver")]
        public HttpResponseMessage UpdateDriver([FromBody]Driver driver)
        {
            if (!Data.customerData.CheckIfCustomerExists(driver.Username) && !Data.dispatcherData.CheckIfDispatcherExists(driver.Username) && !Data.driverData.CheckIfDriverExists(driver.Username))
            {
                Data.driverData.EditDriver(driver);
                Driver driverFind = Data.driverData.GetDriverByUsername(driver.Username);
                return Request.CreateResponse(HttpStatusCode.OK, driverFind);
            }
            else if (Data.driverData.CheckIfDriverExists(driver.Username))
            {
                Driver driverFind = Data.driverData.GetDriverByUsername(driver.Username);

                if (driver.Id == driverFind.Id)
                {
                    Data.driverData.EditDriver(driver);
                    Driver driverUpdate = Data.driverData.GetDriverByUsername(driver.Username);
                    return Request.CreateResponse(HttpStatusCode.OK, driverUpdate);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError);
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

        }
    }
}
