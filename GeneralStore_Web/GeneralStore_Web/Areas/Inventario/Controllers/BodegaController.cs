using ModeloDatos.VM;
using ModeloDatos.VM.Inventario;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static ModeloDatos.VM.Inventario.VM_Bodega;

namespace GeneralStore_Web.Areas.Inventario.Controllers
{
    //https://github.com/etimbo/jquery-print-preview-plugin
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
            ObjetoGuardado peticion = new ObjetoGuardado();
            if (!ModelState.IsValid)
            {
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var modelError in modelState.Errors)
                    {
                        peticion.ListaErrores.Add(modelError.ErrorMessage.ToString());
                    }
                }
                return Json(new
                {
                    Peticion = false,
                    Errores = peticion.ListaErrores
                }, JsonRequestBehavior.AllowGet);
            }



            VM_Bodega objeto = new VM_Bodega();
            peticion = objeto.Guardar(datos);
            Json_Bodega registros = new Json_Bodega();
            registros = objeto.ObtenerBodegas();

            return Json(new {
                Lista = registros.Lista,
                Estado = registros.Peticion,
                Peticion = peticion.Peticion,
                Errores = peticion.ListaErrores,
                IdObjeto = peticion.IdObjeto
            },JsonRequestBehavior.AllowGet);
        }


    }
}