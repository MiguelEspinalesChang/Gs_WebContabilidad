using ModeloDatos.BaseDatos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ModeloDatos.VM.Inventario.VM_Item_Bodega;

namespace ModeloDatos.VM.Inventario
{
    public class VM_ITem
    {

        public class ObjetosItem
        {
            private int idItem;
            private string descripcion;
            private string codigo;
            private float UniCosDolar;
            private float UniCosCordo;

            private bool esNuevo;

            //cosas calculadas
            private float totalCosCordo;
            private float totalCosDolar;


            //calculdas y de bodegas
            private int cantidadTotal;
            private List<ObjetoItem_Bodega> listaEnBodega;


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

            public float UniCosDolar1
            {
                get
                {
                    return UniCosDolar;
                }

                set
                {
                    UniCosDolar = value;
                }
            }

            public float UniCosCordo1
            {
                get
                {
                    return UniCosCordo;
                }

                set
                {
                    UniCosCordo = value;
                }
            }

            public float TotalCosCordo
            {
                get
                {
                    return totalCosCordo;
                }

                set
                {
                    totalCosCordo = value;
                }
            }

            public float TotalCosDolar
            {
                get
                {
                    return totalCosDolar;
                }

                set
                {
                    totalCosDolar = value;
                }
            }

            public int CantidadTotal
            {
                get
                {
                    return cantidadTotal;
                }

                set
                {
                    cantidadTotal = value;
                }
            }

            internal List<ObjetoItem_Bodega> ListaEnBodega
            {
                get
                {
                    return listaEnBodega;
                }

                set
                {
                    listaEnBodega = value;
                }
            }
            
        }


        public class Json_Item
        {

            private List<ObjetosItem> lista;
            private bool peticion;
            private float tasaCambio;


            public List<ObjetosItem> Lista
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

            public float TasaCambio
            {
                get
                {
                    return tasaCambio;
                }

                set
                {
                    tasaCambio = value;
                }
            }
        }

        public Json_Item ObtenerItems()
        {

            Json_Item retorno = new Json_Item();
            retorno.Lista = new List<ObjetosItem>();

            retorno.Lista.Add(new ObjetosItem
            {

                IdItem= 1,
                Descripcion = "Descripcion del item",
                Codigo = "Ite-VDA10",
                CantidadTotal = 12,
                UniCosDolar1 = 1,
                UniCosCordo1 = 30.75F,
                

            });

            retorno.Lista.Add(new ObjetosItem
            {

                IdItem = 2,
                Descripcion = "item con descripcion",
                Codigo = "Ite-VD323",
                CantidadTotal = 12,
                UniCosDolar1 = 2,
                UniCosCordo1 = 61.50F,


            });

            retorno.Lista.Add(new ObjetosItem
            {

                IdItem = 3,
                Descripcion = "Descripcion del item",
                Codigo = "Ite-VGA3",
                CantidadTotal = 52,
                UniCosDolar1 = 3,
                UniCosCordo1 = 92.25F,


            });

            retorno.Peticion = true;

            return retorno;
            //        using (var context = new DB_A2A2D5_GsContabilidadEntities())
            //        {
            //            ////var errorPro = new objectP
            //            //ObjectParameter error = new ObjectParameter("Error", 0);
            //            //ObjectParameter mensaje = new ObjectParameter("Mensaje", "");

            //            //context.Pro_GetFullItems();

            //            List<float> valorTasaCambio = (from item in context.TasaCambios
            //                                     where item.Valor > 27 && item.Validez == true
            //                                     && item.FechaInicio != null
            //                                     select item.Valor).ToList();


            //            float valor = (valorTasaCambio.Any()) ? valorTasaCambio.Max(x => x) : 0;

            //            //var asdad = (from item in context.Item_Bodega
            //            //             where )

            //            string sqlQuery = "Select "+
            // "item_bodega.idITem AS IdItem,"+
            // "ite.Codigo AS CodigoItem,"+
            // "ite.UniCosDolar AS CostoDolar," +
            //" ite.UniCosDolar*30 AS CostoCordoba," +
            // " Count(Item_Bodega.idBodega) AS TotalBodegas," +
            // " Sum(Item_Bodega.Unidad) AS TotalUnidad " +


            //            " From Item AS ite inner join Item_Bodega on Item_Bodega.idItem = ite.idItem "+

            //            "inner join Bodega on Item_Bodega.idBodega = Bodega.IdBodega " +

            //            " Group By Item_Bodega.IdItem, ite.Codigo, ite.UniCosDolar";

            //            var consulta = context.Database.ExecuteSqlCommand(
            //                sqlQuery
            //                );


            //            return null;

            //        }

            //        return null;




        }



        public Json_Item DetalleItem(int idItem)
        {
            Json_Item retorno = new Json_Item();
            using (var context = new DB_A2A2D5_GsContabilidadEntities())
            {

                try
                {
                    var tasaCambio = (from item in context.TasaCambios
                                      where item.Validez == true && item.Valor > 26
                                      select item.Valor).FirstOrDefault();

                    if (tasaCambio < 26)
                    {
                        retorno.TasaCambio = 0.00F;
                        retorno.Peticion = false;
                    }
                    else
                    {
                        retorno.TasaCambio = tasaCambio;
                        retorno.Peticion = true;
                    }
                }
                catch(Exception e)
                {
                    retorno.TasaCambio = 0.00F;
                    retorno.Peticion = false;
                }
                

                return retorno;

            }
                


        }


    }
}
