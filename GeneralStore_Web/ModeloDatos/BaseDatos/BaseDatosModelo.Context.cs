﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class DB_A2A2D5_GsContabilidadEntities : DbContext
    {
        public DB_A2A2D5_GsContabilidadEntities()
            : base("name=DB_A2A2D5_GsContabilidadEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Bodega> Bodegas { get; set; }
        public virtual DbSet<Herramienta> Herramientas { get; set; }
        public virtual DbSet<Herramienta_Bodega> Herramienta_Bodega { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<Item_Bodega> Item_Bodega { get; set; }
        public virtual DbSet<TasaCambio> TasaCambios { get; set; }
    
        public virtual ObjectResult<Pro_GetFullItems_Result> Pro_GetFullItems()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Pro_GetFullItems_Result>("Pro_GetFullItems");
        }
    }
}
