using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GeneralStore_Web.Areas.Cliente.Controllers
{
    public class ClienteController : Controller
    {
        // GET: Cliente/Cliente
        public ActionResult Index()
        {
            return View("IndexCliente");
        }
    }
}