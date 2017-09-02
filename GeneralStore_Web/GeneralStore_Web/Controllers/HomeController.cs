using GeneralStore_Web.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GeneralStore_Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {

            List<Cliente> listaCliente = new List<Cliente>();

            Random r = new Random();

            for (int i = 0; i <  r.Next(5,70); i++)
            {

                listaCliente.Add(new Cliente {
                    IdCliente = "" + i,
                    Nombre = "Pancracio " + i 
                });

            }

            return View();
            //return View(listaCliente);
            //return RedirectToAction("Cliente", "HttpHome", new { area = "Peticion"});
        }


    }
}