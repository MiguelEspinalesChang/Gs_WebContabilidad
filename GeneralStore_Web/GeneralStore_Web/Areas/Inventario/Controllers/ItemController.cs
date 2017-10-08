using ModeloDatos.VM.Inventario;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static ModeloDatos.VM.Inventario.VM_ITem;

namespace GeneralStore_Web.Areas.Inventario.Controllers
{
    public class ItemController : Controller
    {
        // GET: Inventario/Item
        public ActionResult Index()
        {
            return View("IndexItem");
        }

        ////// JSON METHODS

        public JsonResult ObtenerTodo()
        {
            VM_ITem objeto = new VM_ITem();
            Json_Item registros = new Json_Item();

            registros = objeto.ObtenerItems();

            return Json(new { Lista = registros.Lista, Estado = registros.Peticion , ErrorTasaCambio = registros.ErrorTasaCambio }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult DetalleItem(int IdItem)
        {

            VM_ITem objeto = new VM_ITem();
            Json_Item registros = new Json_Item();

            registros = objeto.DetalleItem(IdItem);

            return Json(new {
                Lista = registros.Lista,
                TasaCambio =registros.TasaCambio,
                Estado = registros.Peticion, ErrorTasaCambio = registros.ErrorTasaCambio
            }, JsonRequestBehavior.AllowGet);



        }
        //public JsonResult Guardar(ObjetosBodega datos)
        //{
        //    ObjetoGuardado peticion = new ObjetoGuardado();
        //    if (!ModelState.IsValid)
        //    {
        //        foreach (var modelState in ModelState.Values)
        //        {
        //            foreach (var modelError in modelState.Errors)
        //            {
        //                peticion.ListaErrores.Add(modelError.ErrorMessage.ToString());
        //            }
        //        }
        //        return Json(new
        //        {
        //            Peticion = false,
        //            Errores = peticion.ListaErrores
        //        }, JsonRequestBehavior.AllowGet);
        //    }



        //    VM_Item objeto = new VM_Item();
        //    peticion = objeto.Guardar(datos);
        //    Json_Bodega registros = new Json_Bodega();
        //    registros = objeto.ObtenerBodegas();

        //    return Json(new
        //    {
        //        Lista = registros.Lista,
        //        Estado = registros.Peticion,
        //        Peticion = peticion.Peticion,
        //        Errores = peticion.ListaErrores,
        //        IdObjeto = peticion.IdObjeto
        //    }, JsonRequestBehavior.AllowGet);
        //}



    }
}