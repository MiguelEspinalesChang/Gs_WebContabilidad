//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ModeloDatos.BaseDatos
{
    using System;
    using System.Collections.Generic;
    
    public partial class Item_Bodega
    {
        public int IdItemBodega { get; set; }
        public int IdItem { get; set; }
        public int IdBodega { get; set; }
        public string Ubicacion { get; set; }
        public int Unidad { get; set; }
    
        public virtual Bodega Bodega { get; set; }
        public virtual Item Item { get; set; }
    }
}
