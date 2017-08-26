using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GeneralStore_Web.Clases
{
    public class Empleado
    {
        private string idempleado;
        private string nombre;
        private string apellido;


        public string Idempleado
        {
            get
            {
                return idempleado;
            }

            set
            {
                idempleado = value;
            }
        }

        public string Nombre
        {
            get
            {
                return nombre;
            }

            set
            {
                nombre = value;
            }
        }

        public string Apellido
        {
            get
            {
                return apellido;
            }

            set
            {
                apellido = value;
            }
        }
    }
}