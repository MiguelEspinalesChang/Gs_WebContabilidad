using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ModeloDatos.VM.Inventario;

namespace GeneralStore_Web.Areas.Inventario.Controllers
{
    public class MenuInventarioController : Controller
    {
        // GET: Inventario/MenuInventario
        public ActionResult Index()
        {
            return View("IndexMenuInventario");
        }



        ////// JSON METHODS

        public JsonResult GetDataGeneral()
        {
            VM_Bodega objeto = new VM_Bodega();
            return Json(new { Lista = objeto.ObtenerBodegas() }, JsonRequestBehavior.AllowGet);
        }


    }
}