//------------------------------------------------------------------------------
// <auto-generated>
//    Este código se generó a partir de una plantilla.
//
//    Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//    Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ModeloDatos.BaseDatos
{
    using System;
    using System.Collections.Generic;
    
    public partial class Item
    {
        public Item()
        {
            this.Item_Bodega = new HashSet<Item_Bodega>();
        }
    
        public int IdItem { get; set; }
        public string Ubicacion { get; set; }
        public float Cantidad { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public float UniCosDolar { get; set; }
        public float UniCosCordo { get; set; }
        public float TotalCosDolar { get; set; }
        public float TotalCosCordo { get; set; }
        public bool Estado { get; set; }
    
        public virtual ICollection<Item_Bodega> Item_Bodega { get; set; }
    }
}
