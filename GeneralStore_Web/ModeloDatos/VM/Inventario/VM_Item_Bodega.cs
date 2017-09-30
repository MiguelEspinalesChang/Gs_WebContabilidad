using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModeloDatos.VM.Inventario
{
    class VM_Item_Bodega
    {

        public class ObjetoItem_Bodega
        {


            public int IdItemBodega { get; set; }
            public int IdItem { get; set; }
            public int IdBodega { get; set; }
            public string Ubicacion { get; set; }
            public int Unidad { get; set; }


        }


    }
}
