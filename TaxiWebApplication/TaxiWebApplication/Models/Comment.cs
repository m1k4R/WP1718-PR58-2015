using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiWebApplication.Models
{
    public class Comment
    {
        public string Description { get; set; }
        public string CreatedDateTime { get; set; }
        public Customer User { get; set; }
        public Drive Drive { get; set; }
        public int Grade { get; set; }

        public int Id { get; set; }
    }
}