using ModeloDatos.VM.Inventario;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static ModeloDatos.VM.Inventario.VM_Bodega;

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
            Json_Bodega registros = new Json_Bodega();

            registros = objeto.ObtenerBodegas();


            return Json(new { Lista = registros.Lista, Estado = registros.Peticion }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Guardar(ObjetosBodega datos)
        {
            VM_Bodega objeto = new VM_Bodega();
            bool peticion = objeto.Guardar(datos);
            Json_Bodega registros = new Json_Bodega();
            registros = objeto.ObtenerBodegas();

            return Json(new {
                Lista = registros.Lista,
                Estado = registros.Peticion,
                Peticion = peticion
            },JsonRequestBehavior.AllowGet);
        }


    }
}