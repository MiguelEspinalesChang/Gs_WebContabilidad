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

            public List<ObjetoItem_Bodega> ListaEnBodega
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
            private bool errorTasaCambio;

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

            public bool ErrorTasaCambio
            {
                get
                {
                    return errorTasaCambio;
                }

                set
                {
                    errorTasaCambio = value;
                }
            }
        }

        private DB_A2A2D5_GsContabilidadEntities dataContext = new DB_A2A2D5_GsContabilidadEntities();

        public Json_Item ObtenerItems()
        {

            Json_Item retorno = new Json_Item();
            retorno.Lista = new List<ObjetosItem>();



            try
            {

                var tasaCambio = (from item in dataContext.TasaCambios
                                  where item.Validez == true && item.Valor > 26
                                  select item.Valor).FirstOrDefault();



                if (tasaCambio < 26)
                {
                    retorno.TasaCambio = 0.00F;
                    retorno.Peticion = true;
                    return retorno;
                }
                else
                {
                    retorno.TasaCambio = tasaCambio;
                    retorno.Peticion = true;
                    retorno.ErrorTasaCambio = false;
                }
            }
            catch (Exception e)
            {
                retorno.TasaCambio = 0.00F;
                retorno.ErrorTasaCambio = true;
                retorno.Peticion = false;
                return retorno;
            }


            try
            {
                retorno.Lista = (from item in dataContext.Items
                                 where item.Estado == true
                                 select new ObjetosItem
                                 {
                                     IdItem = item.IdItem,
                                     Descripcion = item.Descripcion,
                                     Codigo = item.Codigo,
                                     CantidadTotal = 0,
                                     UniCosDolar1 = item.UniCosDolar,
                                     UniCosCordo1 = 0
                                 }).ToList();


                var listaItemBodega = (from item in dataContext.Item_Bodega
                                       select item).ToList();

                foreach (var itemNorma in retorno.Lista)
                {
                    foreach (var itemBodega in listaItemBodega)
                    {
                        if (itemNorma.IdItem == itemBodega.IdItem)
                        {
                            itemNorma.CantidadTotal += itemBodega.Unidad;
                            itemNorma.UniCosCordo1 = retorno.TasaCambio * itemNorma.UniCosDolar1;
                        }
                    }
                }

                retorno.Peticion = true;

            }
            catch (Exception e)
            {
                retorno.Peticion = false;
            }





            return retorno;



        }



        public Json_Item DetalleItem(int idItemDetalle)
        {
            Json_Item retorno = new Json_Item();
            try
            {

                var tasaCambio = (from item in dataContext.TasaCambios
                                  where item.Validez == true && item.Valor > 26
                                  select item.Valor).FirstOrDefault();



                if (tasaCambio < 26)
                {
                    retorno.TasaCambio = 0.00F;
                    retorno.Peticion = false;
                    retorno.ErrorTasaCambio = true;
                    return retorno;
                }
                else
                {
                    retorno.TasaCambio = tasaCambio;
                    retorno.Peticion = true;
                    retorno.ErrorTasaCambio = false;
                }
            }
            catch (Exception e)
            {
                retorno.TasaCambio = 0.00F;
                retorno.Peticion = false;
                retorno.ErrorTasaCambio = true;
                return retorno;
            }

            try
            {
                Item itemBuscar = new Item();
                retorno.Lista = new List<ObjetosItem>();

                if (idItemDetalle > 0)
                    itemBuscar = (from item in dataContext.Items
                                  where item.IdItem == idItemDetalle
                                  && item.Estado == true
                                  select item).FirstOrDefault();

                if (idItemDetalle > 0 && itemBuscar == null)
                {
                    retorno.TasaCambio = 0.00F;
                    retorno.Peticion = false;
                    return retorno;
                }


                if (idItemDetalle > 0)
                {

                    retorno.Lista.Add(new ObjetosItem
                    {
                        IdItem = itemBuscar.IdItem,
                        Descripcion = itemBuscar.Descripcion,
                        Codigo = itemBuscar.Codigo,
                        UniCosDolar1 = itemBuscar.UniCosDolar,
                        CantidadTotal = 0,
                        UniCosCordo1 = 0
                    });

                    var item_bodega = (from item in dataContext.Item_Bodega
                                       where item.IdItem == idItemDetalle
                                       select item).ToList();

                    foreach (var itemNorma in retorno.Lista)
                    {
                        itemNorma.ListaEnBodega = new List<ObjetoItem_Bodega>();
                        foreach (var itemBodega in item_bodega)
                        {
                            if (itemNorma.IdItem == itemBodega.IdItem)
                            {
                                itemNorma.CantidadTotal += itemBodega.Unidad;
                                itemNorma.ListaEnBodega.Add(new ObjetoItem_Bodega
                                {
                                    IdItemBodega = itemBodega.IdItemBodega,
                                    IdItem = itemBodega.IdItem,
                                    IdBodega = itemBodega.IdBodega,
                                    Ubicacion = itemBodega.Ubicacion,
                                    Unidad = itemBodega.Unidad,
                                    DescripcionBodega = itemBodega.Bodega.Descripcion,
                                    CodigoBodega = itemBodega.Bodega.Codigo,
                                    Union = true
                                });
                            }
                        }
                    }
                }


            }
            catch (Exception e)
            {
                retorno.TasaCambio = 0.00F;
                retorno.Peticion = false;
                return retorno;
            }


            retorno.Peticion = true;

            return retorno;





        }


    }
}
