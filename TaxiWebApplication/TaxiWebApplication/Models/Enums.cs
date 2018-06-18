using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiWebApplication.Models
{
    public class Enums
    {
        public enum Genders : int
        {
            Male,
            Female
        }

        public enum Roles: int
        {
            Customer,
            Dispatcher,
            Driver
        }

        public enum Cars : int
        {
            None,
            Car,
            Van
        }

        public enum State : int
        {
            Created,
            Formated,
            Processed,
            Accepted,
            Canceled,
            Unsuccessful,
            Successful
        }
    }
}