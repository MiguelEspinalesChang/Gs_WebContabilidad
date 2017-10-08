using ModeloDatos.BaseDatos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

            [Required(ErrorMessage = "La Id es obligatoria.")]
            [Range(0, 100000, ErrorMessage = "El valor de la Id no esta en el rango permitido.")]
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

            [StringLength(2000, ErrorMessage = "La descripción no puede exceder de 2000 caracteres.")]
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

            [Required(ErrorMessage = "El nombre es obligatorio.")]
            [StringLength(90, MinimumLength = 2, ErrorMessage = "El nombre debe contener entre 2 y 90 caracteres.")]
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

            [Required(ErrorMessage = "El còdigo es obligatorio.")]
            [StringLength(5, MinimumLength = 1, ErrorMessage = "El còdigo debe contener entre 1 y 5 caracteres (despues de Bod-).")]
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

            [Required(ErrorMessage = "Especifique si el registro es nuevo o una edición.")]
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

        public ObjetoGuardado Guardar(ObjetosBodega datos)
        {
            
            Bodega registro = new Bodega();
            ObjetoGuardado peticion = new ObjetoGuardado();
            peticion.Peticion = false;


            datos.Codigo = "Bod-" + datos.Codigo;

            if(datos.EsNuevo)
            {
                try
                {
                    registro.Nombre = datos.Nombre;
                    registro.Descripcion = datos.Descripcion;
                    registro.Codigo = datos.Codigo;
                    registro.Estado = true;
                    dataContext.Bodegas.Add(registro);

                    dataContext.SaveChanges();
                    peticion.Peticion = true;
                    peticion.IdObjeto = registro.IdBodega;
                }
                catch(Exception e)
                {
                    peticion.Peticion = false;
                    peticion.ListaErrores.Add("Error al intentar guardar el registro.");
                }
                
            }
            else
            {
                try
                {
                    registro = (from item in dataContext.Bodegas
                                  where item.IdBodega == datos.IdBodega
                                  select item).FirstOrDefault();

                    if (registro != null)
                    {
                        registro.Nombre = datos.Nombre;
                        registro.Descripcion = datos.Descripcion;
                        registro.Codigo = datos.Codigo;
                        registro.Estado = true;

                        dataContext.Entry(registro).State = EntityState.Modified;
                        dataContext.SaveChanges();
                        peticion.Peticion = true;
                        peticion.IdObjeto = registro.IdBodega;
                    }
                    else
                    {
                        peticion.Peticion = false;

                        peticion.ListaErrores.Add("El registro solicitado para editar no fue encontrado.");
                    }


                }
                catch (Exception e)
                {
                    peticion.Peticion = false;
                    peticion.ListaErrores.Add("Error al intentar actualizar el registro.");
                }

            }

            return peticion;

        }


    }
}
