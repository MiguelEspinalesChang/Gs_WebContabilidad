using ModeloDatos.VM.Inventario;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GeneralStore_Web.Areas.Inventario.Controllers
{
    public class BodegaController : Controller
    {
        // GET: Inventario/Bodega
        public ActionResult Index()
        {
            return View("IndexBodega");
        }

        ////// JSON METHODS

        public JsonResult GetBodega()
        {
            VM_Bodega objeto = new VM_Bodega();
            return Json(new { Lista = objeto.ObtenerBodegas(), chang = "Changa" }, JsonRequestBehavior.AllowGet);
        }


    }
}