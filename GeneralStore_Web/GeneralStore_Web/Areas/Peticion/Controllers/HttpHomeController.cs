using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GeneralStore_Web.Areas.Peticion.Controllers
{
    public class HttpHomeController : Controller
    {
        // Get Todos los clientes
        public JsonResult Cliente()
        {

            int[] arreglo = new int[20];
            List<int> lista = new List<int>();

            for (int i = 0; i < arreglo.Length; i++)
                arreglo[i] = 2;

            int contadorLista = lista.Count();

            for (int i = 0; i < lista.Count; i++)
                lista[i] = 2;

            return null;
        }

    }
}