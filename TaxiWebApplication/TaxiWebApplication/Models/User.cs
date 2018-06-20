using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiWebApplication.Models
{
    public abstract class User
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public Enums.Genders Gender { get; set; }
        public string Jmbg { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public Enums.Roles Role { get; set; } 
        public List<Drive> Drives { get; set; }

        public int Id { get; set; }
    }
}