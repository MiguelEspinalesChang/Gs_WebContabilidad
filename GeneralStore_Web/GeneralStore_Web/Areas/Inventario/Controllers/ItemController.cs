using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GeneralStore_Web.Areas.Inventario.Controllers
{
    public class ItemController : Controller
    {
        // GET: Inventario/Item
        public ActionResult Index()
        {
            return View("IndexItem");
        }
    }
}