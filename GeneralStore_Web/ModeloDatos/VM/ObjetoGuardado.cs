using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModeloDatos.VM
{
    public class ObjetoGuardado
    {

        private int idObjeto;

        private List<string> listaErrores = new List<string>();

        private bool peticion;

        public int IdObjeto
        {
            get
            {
                return idObjeto;
            }

            set
            {
                idObjeto = value;
            }
        }

        public List<string> ListaErrores
        {
            get
            {
                return listaErrores;
            }

            set
            {
                listaErrores = value;
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
}
