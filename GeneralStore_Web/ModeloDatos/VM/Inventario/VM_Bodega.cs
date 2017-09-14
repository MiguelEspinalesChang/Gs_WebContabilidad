using ModeloDatos.BaseDatos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModeloDatos.VM.Inventario
{
    public class VM_Bodega
    {

        private int idBodega;
        private string descripcion;
        private string nombre;
        private string codigo;
        private bool estado;

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

        public bool Estado
        {
            get
            {
                return estado;
            }

            set
            {
                estado = value;
            }
        }
        private DB_A2A2D5_GsContabilidadEntities dataContext = new DB_A2A2D5_GsContabilidadEntities();

        public List<VM_Bodega> ObtenerBodegas()
        {
            List<VM_Bodega> lista = new List<VM_Bodega>();


            lista = (from item in dataContext.Bodegas
                     where item.IdBodega>0
                     select new VM_Bodega {
                         IdBodega = item.IdBodega,
                         Descripcion = item.Descripcion,
                         Nombre = item.Nombre,
                         Estado = item.Estado,
                         Codigo = item.Codigo
                     }).ToList();

            lista.Add(new VM_Bodega {IdBodega = 23645, Descripcion = "Esta es una descripcion",Nombre="Juansito Policarpio",Estado=true, Codigo= "Cod-546" });
            return lista;

        }


    }
}
