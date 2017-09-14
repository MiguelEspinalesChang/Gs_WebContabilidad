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

        public JsonResult ObtenerTodo()
        {
            VM_Bodega objeto = new VM_Bodega();
            List<VM_Bodega> lista = new List<VM_Bodega>();
            bool estado = true;
            try
            {
                lista = objeto.ObtenerBodegas();
                estado = true;
            }
            catch(Exception e)
            {
                estado = false;
            }

            return Json(new { Lista = lista, Estado = estado }, JsonRequestBehavior.AllowGet);
        }


    }
}