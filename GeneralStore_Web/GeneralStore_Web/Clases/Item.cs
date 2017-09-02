using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GeneralStore_Web.Clases
{
    public class Item
    {

        private int idItem;
        private string descripcion;
        private string ubicacion;
        private int cantidad;
        private string marca;
        private string codigo;
        private int precioListaCordoba;
        private int precioListaDollar;


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

        public string Ubicacion
        {
            get
            {
                return ubicacion;
            }

            set
            {
                ubicacion = value;
            }
        }

        public int Cantidad
        {
            get
            {
                return cantidad;
            }

            set
            {
                cantidad = value;
            }
        }

        public string Marca
        {
            get
            {
                return marca;
            }

            set
            {
                marca = value;
            }
        }

        public string Codigo
        {
            get
            {
                return codigo;
            }

            set
            {
                codigo = value;
            }
        }

        public int PrecioListaCordoba
        {
            get
            {
                return precioListaCordoba;
            }

            set
            {
                precioListaCordoba = value;
            }
        }

        public int PrecioListaDollar
        {
            get
            {
                return precioListaDollar;
            }

            set
            {
                precioListaDollar = value;
            }
        }
    }
}