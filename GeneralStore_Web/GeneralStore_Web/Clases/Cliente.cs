using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GeneralStore_Web.Clases
{
    public class Cliente
    {
        private string idCliente;
        private string nombre;
        private string apellido;
        private short telefono ;
        private string cedula;
        private string correo;
        private string empresa;
        private string atencion;
        private int numeroCliente;
        private string condicionPago;
             


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

        public string Apellido
        {
            get
            {
                return apellido;
            }

            set
            {
                apellido = value;
            }
        }

        public short Telefono
        {
            get
            {
                return telefono;
            }

            set
            {
                telefono = value;
            }
        }

        public string Cedula
        {
            get
            {
                return cedula;
            }

            set
            {
                cedula = value;
            }
        }

        public string Correo
        {
            get
            {
                return correo;
            }

            set
            {
                correo = value;
            }
        }

        public string Empresa
        {
            get
            {
                return empresa;
            }

            set
            {
                empresa = value;
            }
        }

        public string Atencion
        {
            get
            {
                return atencion;
            }

            set
            {
                atencion = value;
            }
        }

        public int NumeroCliente
        {
            get
            {
                return numeroCliente;
            }

            set
            {
                numeroCliente = value;
            }
        }

        public string CondicionPago
        {
            get
            {
                return condicionPago;
            }

            set
            {
                condicionPago = value;
            }
        }

        public string IdCliente
        {
            get
            {
                return idCliente;
            }

            set
            {
                idCliente = value;
            }
        }
    }
}