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
    
    public partial class Bodega
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Bodega()
        {
            this.Herramienta_Bodega = new HashSet<Herramienta_Bodega>();
            this.Item_Bodega = new HashSet<Item_Bodega>();
        }
    
        public int IdBodega { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public string Direccion { get; set; }
        public string Nombre { get; set; }
        public bool Estado { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Herramienta_Bodega> Herramienta_Bodega { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Item_Bodega> Item_Bodega { get; set; }
    }
}
