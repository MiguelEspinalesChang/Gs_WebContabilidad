using ModeloDatos.BaseDatos;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModeloDatos.VM.Inventario
{
    public class VM_Bodega
    {
        public class ObjetosBodega
        {
            private int idBodega;
            private string descripcion;
            private string nombre;
            private string codigo;
            private bool estado;
            private bool esNuevo;
            private bool peticion;

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

            public bool EsNuevo
            {
                get
                {
                    return esNuevo;
                }

                set
                {
                    esNuevo = value;
                }
            }
        }


        public class Json_Bodega
        {

            private List<ObjetosBodega> lista;
            private bool peticion;

            public List<ObjetosBodega> Lista
            {
                get
                {
                    return lista;
                }

                set
                {
                    lista = value;
                }
            }

            public bool Peticion
            {
                get
                {
                    return peticion;
                }

                set
                {
                    peticion = value;
                }
            }
        }

        private DB_A2A2D5_GsContabilidadEntities dataContext = new DB_A2A2D5_GsContabilidadEntities();

        public Json_Bodega ObtenerBodegas()
        {
            Json_Bodega lista = new Json_Bodega();


            try
            {
                lista.Lista = (from item in dataContext.Bodegas
                         where item.IdBodega > 0
                         select new ObjetosBodega
                         {
                             IdBodega = item.IdBodega,
                             Descripcion = item.Descripcion,
                             Nombre = item.Nombre,
                             Estado = item.Estado,
                             Codigo = item.Codigo
                         }).ToList();

                lista.Peticion = true;

            }catch(Exception e)
            {
                lista.Lista = new List<ObjetosBodega>();
                lista.Peticion = false;
            }
            return lista;

        }

        public bool Guardar(ObjetosBodega datos)
        {
            
            Bodega registro = new Bodega();
            bool peticion = false;
            registro.Nombre = datos.Nombre;
            registro.Descripcion = datos.Descripcion;
            registro.Codigo = datos.Codigo;

            if(datos.EsNuevo)
            {
                try
                {
                    dataContext.Bodegas.Add(registro);
                    dataContext.SaveChanges();
                    peticion = true;
                }
                catch(Exception e)
                {
                    peticion = false;
                }
                
            }
            else
            {
                try
                {
                    dataContext.Entry(registro).State = EntityState.Modified;
                    dataContext.SaveChanges();
                    peticion = true;
                }
                catch (Exception e)
                {
                    peticion = false;
                }

            }

            return peticion;

        }


    }
}
