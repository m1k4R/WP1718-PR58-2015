using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace TaxiWebApplication.Models
{
    public class CommentData
    {
        private string fileName = HttpContext.Current.Server.MapPath("~/App_Data/Comments.xml");

        public void AddComment(Comment comment)
        {
            if (!File.Exists(fileName))
            {
                XDocument xmlDocument = new XDocument(
                    new XDeclaration("1.0", "utf-8", "yes"),
                    new XElement("Comments",
                        new XElement("Comment",
                            new XElement("Id", comment.Id),
                            new XElement("DateTime", comment.CreatedDateTime),
                            new XElement("Description", comment.Description),
                            new XElement("UserId", comment.User.Id),
                            new XElement("DriveId", comment.Drive.Id),
                            new XElement("Grade", comment.Grade))
                    ));

                xmlDocument.Save(fileName);
            }
            else
            {
                try
                {
                    FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                    XDocument xmlDocument = XDocument.Load(stream);
                    XElement drives = xmlDocument.Element("Comments");
                    drives.Add(new XElement("Comment",
                                    new XElement("Id", comment.Id),
                                    new XElement("DateTime", comment.CreatedDateTime),
                                    new XElement("Description", comment.Description),
                                    new XElement("UserId", comment.User.Id),
                                    new XElement("DriveId", comment.Drive.Id),
                                    new XElement("Grade", comment.Grade)));

                    xmlDocument.Save(fileName);
                }
                catch { }
            }
        }

        public Comment GetCommentById(int id)
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Comment> comments = xmlDocument.Root.Elements("Comment").Where(x => x.Element("Id").Value == id.ToString()).Select(commentFound => new Comment
                {
                    Id = int.Parse(commentFound.Element("Id").Value),
                    CreatedDateTime = commentFound.Element("DateTime").Value,
                    Description = commentFound.Element("Description").Value,
                    User = new Customer
                    {
                        Id = int.Parse(commentFound.Element("UserId").Value),
                    },
                    Drive = new Drive
                    {
                        Id = int.Parse(commentFound.Element("DriveId").Value),
                    },
                    Grade = int.Parse(commentFound.Element("Grade").Value)

                }).ToList();

                Comment comment = comments.First(x => x.Id == id);

                return comment;
            }
            else
            {
                return null;
            }
        }

        public IEnumerable<Comment> RetriveAllComments()
        {
            if (File.Exists(fileName))
            {
                FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XDocument xmlDocument = XDocument.Load(stream);
                IEnumerable<Comment> comments = xmlDocument.Root.Elements("Comment").Select(comment => new Comment
                {
                    Id = int.Parse(comment.Element("Id").Value),
                    CreatedDateTime = comment.Element("DateTime").Value,
                    Description = comment.Element("Description").Value,
                    User = new Customer
                    {
                        Id = int.Parse(comment.Element("UserId").Value),
                    },
                    Drive = new Drive
                    {
                        Id = int.Parse(comment.Element("DriveId").Value),
                    },
                    Grade = int.Parse(comment.Element("Grade").Value)
                }).ToList();

                return comments;
            }
            else
            {
                return null;
            }
        }
    }
}