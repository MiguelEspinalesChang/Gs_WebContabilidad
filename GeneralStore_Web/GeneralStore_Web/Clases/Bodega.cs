using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GeneralStore_Web.Clases
{
    public class Bodega
    {

        private int idBodega;
        private string descripcion;
        private int idItem;
        


        public int IdBodega
        {
            get
            {
                return idBodega;
            }

            set
            {
                idBodega = value;
            }
        }

        public string Descripcion
        {
            get
            {
                return descripcion;
            }

            set
            {
                descripcion = value;
            }
        }

        public int IdItem
        {
            get
            {
                return idItem;
            }

            set
            {
                idItem = value;
            }
        }
    }
}