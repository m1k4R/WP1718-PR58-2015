using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiWebApplication.Models
{
    public class Car
    {
        public Driver Driver { get; set; }
        public int YearOfCar { get; set; }
        public string RegNumber { get; set; }
        public int Id { get; set; }
        public Enums.Cars Type { get; set; }

    }
}