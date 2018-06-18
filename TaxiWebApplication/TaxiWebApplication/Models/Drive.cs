using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiWebApplication.Models
{
    public class Drive
    {
        public DateTime DateTime { get; set; }
        public Location StartLocation { get; set; }
        public Enums.Cars Car { get; set; }
        public Customer Customer { get; set; }
        public Location Destination { get; set; }
        public Dispatcher Dispatcher { get; set; }
        public Driver Driver { get; set; }
        public double Price { get; set; }
        public Comment Comment { get; set; }
        public Enums.State State { get; set; }

        public int Id { get; set; }

    }
}