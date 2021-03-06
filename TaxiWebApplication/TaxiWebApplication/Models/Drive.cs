﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiWebApplication.Models
{
    public class Drive
    {
        public string DateTime { get; set; }
        public Location StartLocation { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public Enums.Cars Car { get; set; }
        public Customer Customer { get; set; }
        public Location Destination { get; set; }
        public Dispatcher Dispatcher { get; set; }
        public Driver Driver { get; set; }
        public double Price { get; set; }
        public Comment Comment { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public Enums.State State { get; set; }

        public int Id { get; set; }

    }
}