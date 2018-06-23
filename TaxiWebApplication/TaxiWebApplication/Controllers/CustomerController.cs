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
    }
}
