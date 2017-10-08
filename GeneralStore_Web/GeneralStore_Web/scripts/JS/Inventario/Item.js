$(document).ready(function () {


    var modaltasacambio = Vue.component("modal-tasa-cambio", {


        template: [
                    '<div id="modal-tasaCambio" class="modal fade" role="dialog" >',
                    '<div class="modal-dialog">',
                    '<div class="modal-content">',

                        '<div class="modal-header">',
                        '</div>',
                        '<div class="modal-body">',
                            '<h1>asdasdasdsadsad {{tasaCambio}}</h1>',
                        '</div>',
                        '<div class="modal-footer">',
                        '</div>',

                    '</div>',
                    '</div>',
                    '</div>'
        ].join(''),
        props: {
            tasaCambio: {
                type: Number || String,
                required: true
            }
        },

    });

    var alertasComponent = Vue.component("alertas-noob", {

        template: [
            '<div class="row">',
            '<div class="col-xs-12 col-lg-12">',
            '<div v-show="visibleAlerta" class="alert alert-dismissable animated zoomInUp" id="elementoAnimado" v-bind:class="clasesAlerta">',
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;',
            '</a>',
            '<strong v-show="mensajeErrorTabla"><i class="fa fa-exclamation-circle"></i> Error al cargar los datos en la tabla',
            '</strong>',
            '<strong v-show="mensajeDatoGuardado" ><i class="fa fa-upload"></i> Dato guardado con éxito',
            '</strong>',
            '<strong v-show="mensajeDatoEliminado" ><i class="fa fa-trash-o"></i> Dato eliminado con éxito',
            '</strong>',
            '<strong v-show="mensajeDatoActualizado" ><i class="fa fa-edit"></i> Dato actualizado con éxito',
            '</strong>',
            '<strong v-show="mensajeErrorDato" ><i class="fa fa-exclamation-triangle"></i> Error en la petición, por favor revise los datos',
            '</strong>',
            '<strong v-show="mensajeErrorServer" ><i class="fa fa-exclamation"></i> Error en el servidor, por favor recargue la página !!',
            '</strong>',
            '</div>',
            '</div>',
            '</div>'
        ].join(''),
        data: {
            mensajeErrorTabla: false,
            mensajeDatoGuardado: false,
            mensajeDatoEliminado: false,
            mensajeDatoActualizado: false,
            mensajeErrorDato: false,
            mensajeErrorServer: false
        },
        props: {
            estadoAlerta: {
                type: Boolean,
                required: true
            },
            accionAlerta: {
                type: Number,
                required: true
            },
            visibleAlerta: {
                type: Boolean,
                required: true
            }

        },
        computed: {
            clasesAlerta: function () {
                return {
                    'alert-info': this.estadoAlerta == true,
                    'alert-danger': this.estadoAlerta == false,
                }
            }
        },
        watch: {

            visibleAlerta: function (val, oldVal) {

                this.mensajeErrorTabla = (this.estadoAlerta == false && this.accionAlerta == 1 || this.accionAlerta == 500) ? true : false;
                this.mensajeDatoGuardado = (this.estadoAlerta == true && this.accionAlerta == 0) ? true : false;
                this.mensajeDatoEliminado = (this.estadoAlerta == true && this.accionAlerta == 3) ? true : false;
                this.mensajeDatoActualizado = (this.estadoAlerta == true && this.accionAlerta == 2) ? true : false;
                this.mensajeErrorDato = (this.estadoAlerta == false && this.accionAlerta != 1 && this.accionAlerta != 500) ? true : false;
                this.mensajeErrorServer = (this.estadoAlerta == false && this.accionAlerta == 500) ? true : false;


            }
        }

    })

    var tablaNoobVar = Vue.component("tabla-noob", {
        template: [
            `<div>`,
            '<div class="row" v-show="errorDataNoob">',
            '<div class="col-xs-12 col-lg-12">',
            '<h2 class="h3 display text-danger text-center"><i class="fa fa-warning"></i> ERROR AL CARGAR DATOS A LA TABLA !! </h2>',
            '</div>',
            '</div>',
            '<div class="row" v-show="errorServer==false">',
            '<div class="col-xs-12 col-lg-12" style="margin-bottom: 20px !important; margin-top: 6px !important">',
            '<button class="btn btn-sm btn-info botonesDataTable" v-on:click="NuevoRegistro" v-bind:disabled="peticionServer"><i class="fa fa-plus"></i> Agregar </button>',
            '<button class="btn btn-sm btn-warning botonesDataTable" v-show="dataNoob.length>0" v-on:click="EditarRegistro" v-bind:disabled="dataNoob.length<1 || peticionServer"><i class="fa fa-edit"></i> Editar </button>',
            '<button class="btn btn-sm btn-danger botonesDataTable" v-show="dataNoob.length>0" v-on:click="EliminarRegistro" v-bind:disabled="dataNoob.length<1 || peticionServer"><i class="fa fa-trash"></i> Eliminar </button>',
            '</div>',
            '</div>',
            '<div class="row" v-show="filaEstaSeleccionada == false">',
                '<div class="col-xs-12 col-lg-12" style="margin-bottom: 20px !important; margin-top: 6px !important">',
                    '<h3 class="h3 display text-danger text-center" ><i class="fa fa-warning"></i> Primero seleccione una fila de la tabla </h3>',
                '</div>',
            '</div>',
            '<table :id="idTabla" class="table table-striped table-hover"  style="width=100%" cellspacing="0">',
            '</table>',
            '</div>'
        ].join(''),
        data: {
            tablaDefinida: {}
        },
        props: {
            idTabla: {
                type: String,
                required: true
            },
            columnasNoob: {
                type: Array,
                required: true
            },
            dataNoob: {
                type: Array,
                required: true
            },
            errorDataNoob: {
                type: Boolean,
                required: true
            },
            estaCreando: {
                type: Boolean,
                required: true
            },
            filaEstaSeleccionada: false,
            errorServer: {
                type: Boolean,
                required: true
            }
            ,
            peticionServer: {
                type: Boolean,
                required: true
            }
        },
        mounted() {

        },
        methods: {

            EliminarRegistro: function () {
                let count = this.tablaDefinida.rows({ selected: true }).count();
                let filaData = this.tablaDefinida.rows({ selected: true }).data();

                this.filaEstaSeleccionada = (count !== undefined && count > 0) ? true : false;
            },
            EditarRegistro: function () {

                let count = this.tablaDefinida.rows({ selected: true }).count();
                let filaData = this.tablaDefinida.rows({ selected: true }).data();

                this.filaEstaSeleccionada = (count !== undefined && count > 0) ? true : false;

                if (this.filaEstaSeleccionada) {
                    let objeto = {};
                    objeto.Descripcion = filaData[0].Descripcion;
                    objeto.Codigo = filaData[0].Codigo;
                    objeto.IdItem = filaData[0].IdItem;
                    objeto.UniCosDolar = filaData[0].UniCosDolar1;
                    objeto.UniCosCordo = filaData[0].UniCosCordo1;
                    objeto.CantidadTotal = filaData[0].CantidadTotal;
                    this.$emit('editar', objeto);
                }



            },
            NuevoRegistro: function () {
                this.$emit('agregar');
            }
        },
        watch: {
            dataNoob: function (val, oldVal) {


                if (this.tablaDefinida === undefined) {

                    this.tablaDefinida = $('#' + this.idTabla).DataTable({
                        "language": {
                            sProcessing: "Procesando...",
                            sLengthMenu: "Mostrar _MENU_ registros",
                            sZeroRecords: "No se encontraron resultados",
                            sEmptyTable: "Ningún dato disponible en esta tabla",
                            sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                            sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                            sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                            sInfoPostFix: "",
                            sSearch: "Buscar:",
                            sUrl: "",
                            sInfoThousands: ",",
                            sLoadingRecords: "Cargando...",
                            oPaginate: {
                                sFirst: "Primero",
                                sLast: "Último",
                                sNext: "Siguiente",
                                sPrevious: "Anterior"
                            },
                            oAria: {
                                sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                                sSortDescending: ": Activar para ordenar la columna de manera descendente"
                            }
                        },
                        "select": true,
                        "data": this.dataNoob,
                        "columns": this.columnasNoob

                    });

                    this.tablaDefinida.columns().visible();
                    this.tablaDefinida.columns().add

                }
                else {
                    this.tablaDefinida.clear();
                    if (val !== undefined)
                        this.tablaDefinida.rows.add(val);
                    this.tablaDefinida.draw();
                    this.tablaDefinida.columns().visible();
                }



            }
        }

    });

    var app = new Vue({
        el: "#appVue",
        data: {
            errorServer: false,
            estaCreando: false,
            peticionServer: true,
            esNuevo: true,
            idTabla: "jojojojo",
            columnasNoob: [
                {
                    "data": "IdItem",
                    "title": "Id Item",
                    "width": "12%"
                },
                {
                    "data": "Descripcion",
                    "title": "Descripción",
                    "width": "20%"
                },
                {
                    "data": "Codigo",
                    "title": "Código",
                    "width": "13%"
                },
                {
                    "data": "CantidadTotal",
                    "title": "Unidades",
                    "width": "25%"
                },
                {
                    "data": "UniCosDolar1",
                    "title": "Dolar",
                    "width": "15%"
                },
                {
                    "data": "UniCosCordo1",
                    "title": "Cordoba",
                    "width": "15%"
                }
            ],
            dataNoob: [],
            errorDataNoob: false,
            total: 0,
            datosJson: [],
            estadoAlerta: false,
            accionAlerta: 0,
            visibleAlerta: false,
            mDescripcion: "",
            tasaCambio: 0,
            mCodigo: "",
            mIdItem: 0,
            mUniCosDolar: 0,
            mUniCosCordo: 0,
            mTotalCosCordo: 0,
            mTotalCosDolar: 0,
            mCantidadTotal: 0,
            listaErrores: [],
            tasaCambioModal: false,
            listaItem_Bodegas: []
        },
        mounted() {
            $("#appVue").toggle("fast", function () {
                // Animation complete.
            });
            this.RecargarTabla();
        },
        methods: {
            LimpiarVariables: function () {
                this.mDescripcion = "";
                this.mCodigo = "";
                this.mIdItem = 0;
                this.mUniCosDolar = 0;
                this.mUniCosCordo = 0;
                this.mCantidadTotal = 0;
                this.mTotalCosCordo = 0,
                this.mTotalCosDolar = 0,
                this.listaErrores = [];
                this.listaItem_Bodegas = [];
            },
            NuevoRegistroNoob: function () {
                this.LimpiarVariables();
                this.estaCreando = true;
                this.visibleAlerta = false;
                this.esNuevo = true;
                this.FormatPreciosUniDolar();
                this.ObtenerDetalleItem();
            },
            EditarRegistroNoob: function (datos) {
                this.LimpiarVariables();
                this.estaCreando = true;
                this.visibleAlerta = false;
                this.esNuevo = false;
                this.mDescripcion = "" + datos.Descripcion,
                this.mCodigo = "" + datos.Codigo,
                this.mIdItem = datos.IdItem;
                this.mCantidadTotal = datos.CantidadTotal;
                this.FormatPreciosUniDolar();

                this.ObtenerDetalleItem();
            },
            CerrarForm: function () {
                this.LimpiarVariables();
                this.estaCreando = false;
                this.visibleAlerta = false;
            },
            RecargarTabla: function () {
                this.LimpiarVariables();
                if (this.errorServer == false) {

                    fetch('/Inventario/Item/ObtenerTodo', {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(function (response) {


                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Network response was not ok.');

                    })
                    .then(function (json) {

                        if (json.Lista !== undefined && json.Lista.length > 0)
                            this.dataNoob = json.Lista;
                        else
                            this.dataNoob = [];

                        //tipos de accion+
                        //0: Crear
                        //1: Leer
                        //2: Actualizar
                        //3: Eliminar
                        //500: error interno del server

                        this.accionAlerta = 1;
                        if (json.ErrorTasaCambio == true) {
                            alert("ERROR CON LA TASA DE CAMBIO !!");
                        }
                        else {

                            if (json.Estado == false) {

                                this.estadoAlerta = false;
                                this.errorDataNoob = true;
                                this.dataNoob = [];
                                this.visibleAlerta = true;

                            }
                            else {
                                this.errorDataNoob = false;
                                this.estadoAlerta = true;
                                this.visibleAlerta = false;
                            }
                        }



                        this.peticionServer = false;
                        this.errorServer = false;

                    }.bind(this))
                        .catch(function (error) {

                            this.accionAlerta = 500;
                            this.dataNoob = [];
                            this.estadoAlerta = false;
                            this.errorDataNoob = true;
                            this.visibleAlerta = true;
                            this.errorServer = true;

                        }.bind(this));


                }//fin if


            },
            ObtenerDetalleItem: function () {



                if (this.errorServer == false) {

                    fetch('/Inventario/Item/DetalleItem', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            IdItem: this.mIdItem
                        })
                    })
                    .then(function (response) {


                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Network response was not ok.');

                    })
                    .then(function (json) {

                        //tipos de accion+
                        //0: Crear
                        //1: Leer
                        //2: Actualizar
                        //3: Eliminar
                        //500: error interno del server

                        this.accionAlerta = 1;

                        if (json.Estado == false) {

                            this.estadoAlerta = false;
                            this.errorDataNoob = false;
                            this.visibleAlerta = true;
                        }
                        else {
                            this.errorDataNoob = false;
                            this.estadoAlerta = false;
                            this.visibleAlerta = false;

                            this.tasaCambio = json.TasaCambio;

                            if (json.ErrorTasaCambio == true) {
                                alert("ERROR CON LA TASA DE CAMBIO !!");
                            }
                            else
                            {
                                if (this.esNuevo == false) {
                                    this.mDescripcion = json.Lista[0].Descripcion;
                                    this.mCodigo = json.Lista[0].Codigo;
                                    this.mCantidadTotal = json.Lista[0].CantidadTotal;
                                    this.mUniCosDolar = json.Lista[0].UniCosDolar1;
                                    this.FormatPreciosUniDolar();
                                    this.listaItem_Bodegas = json.Lista[0].ListaEnBodega;
                                }
                            }



                        }


                        this.peticionServer = false;
                        this.errorServer = false;

                    }.bind(this))
                        .catch(function (error) {

                            this.accionAlerta = 500;
                            this.estadoAlerta = false;
                            this.errorDataNoob = true;
                            this.visibleAlerta = true;
                            this.errorServer = true;

                        }.bind(this));


                }//fin if




            },
            GuardarBodega: function () {

                //if (this.errorServer == false && this.peticionServer == false) {

                //    this.listaErrores = [];
                //    this.peticionServer = true;
                //    this.visibleAlerta = false;

                //    fetch('/Inventario/Bodega/Guardar', {
                //        method: 'post',
                //        headers: {
                //            'Content-Type': 'application/json'
                //        },
                //        body: JSON.stringify({
                //            Nombre: this.mNombre,
                //            Descripcion: this.mDescripcion,
                //            Codigo: this.mCodigo,
                //            EsNuevo: this.esNuevo,
                //            IdItem: this.mIdItem
                //        })
                //    })
                //    .then(function (response) {

                //        if (response.ok) {
                //            return response.json();
                //        }
                //        throw new Error('Network response was not ok.');

                //    })
                //    .then(function (json) {

                //        if (json.Lista !== undefined && json.Lista.length > 0)
                //            this.dataNoob = json.Lista;
                //        else {

                //            if (json.Estado !== undefined)
                //                this.dataNoob = [];
                //        }

                //        if (json.Estado !== undefined && json.Peticion == true)
                //            this.mIdItem = json.IdObjeto;

                //        this.peticionServer = false;
                //        this.estaCreando = true;

                //        if (this.esNuevo == false) {
                //            this.accionAlerta = 2;
                //        }
                //            //si la peticion era nuevo y la peticion del server viene en true
                //            //cambiar a esnuevo = false
                //        else {
                //            this.accionAlerta = 0;

                //            if (json.Peticion == true)
                //                this.esNuevo = false;
                //        }


                //        if (json.Estado !== undefined && (json.Estado == false || json.Peticion == false)) {

                //            if (json.Estado == false)
                //                this.errorDataNoob = true;

                //            if (json.Peticion == false) {
                //                this.listaErrores = json.Errores;
                //            }

                //            this.estadoAlerta = false;
                //        }
                //        else {
                //            this.errorDataNoob = false; //para el datatable
                //            this.estadoAlerta = true; //para la alerta

                //            if (json.Estado === undefined)
                //                this.listaErrores = json.Errores;
                //        }

                //        if (json.Estado !== undefined)
                //            this.visibleAlerta = true;

                //        this.errorServer = false; //es por si el ASP no termina la peticion


                //    }.bind(this)).catch(function (error) {


                //        this.accionAlerta = 500;
                //        this.dataNoob = [];
                //        this.estadoAlerta = false;
                //        this.errorDataNoob = true;
                //        this.visibleAlerta = true;
                //        this.peticionServer = true;
                //        this.estaCreando = true;
                //        this.errorServer = true;
                //        this.listaErrores = [];
                //        this.listaErrores.push({
                //            "mensaje": "Error en el servidor, porfavor recargue la página !!"
                //        });

                //    }.bind(this));



                //}//fin if




            }
            ,
            Btn_EditarTasa: function () {

                this.tasaCambioModal = true;


            },
            KeyUpPreciosUniCordo: function (event) {

                let valorFormat = this.FormatearPreciosUni(this.mUniCosCordo);
                this.mUniCosCordo = valorFormat;

                if (valorFormat[valorFormat.length - 1] != '.') {
                    this.mUniCosDolar = (parseFloat(valorFormat) / parseFloat(this.tasaCambio)).toFixed(4);
                    this.mTotalCosCordo = (parseFloat(valorFormat) * parseFloat(this.mCantidadTotal)).toFixed(4);
                    this.mTotalCosDolar = (parseFloat(this.mUniCosDolar) * parseFloat(this.mCantidadTotal)).toFixed(4);
                }

            },
            KeyUpPreciosUniDolar: function (event) {

                let valorFormat = this.FormatearPreciosUni(this.mUniCosDolar);
                this.mUniCosDolar = valorFormat;

                if (valorFormat[valorFormat.length - 1] != '.') {
                    this.mUniCosCordo = (parseFloat(valorFormat) * parseFloat(this.tasaCambio)).toFixed(4);
                    this.mTotalCosCordo = (parseFloat(this.mUniCosCordo) * parseFloat(this.mCantidadTotal)).toFixed(4);
                    this.mTotalCosDolar = (parseFloat(valorFormat) * parseFloat(this.mCantidadTotal)).toFixed(4);
                }

            },
            KeyUpUnidades: function (idItemBodega) {

                let temporal = 0;
                for (let ciclo = 0; ciclo < this.listaItem_Bodegas.length; ciclo++) {
                    if (this.listaItem_Bodegas[ciclo].IdItemBodega == idItemBodega) {
                        temporal = this.listaItem_Bodegas[ciclo].Unidad;
                    }
                }
                let valorFormat = this.FormatearPreciosUni(temporal);
                //this.mUniCosDolar = valorFormat;
                let contadorTotal = 0;
                for(let ciclo = 0; ciclo < this.listaItem_Bodegas.length; ciclo++)
                {
                    if(this.listaItem_Bodegas[ciclo].IdItemBodega == idItemBodega)
                    {
                        this.listaItem_Bodegas[ciclo].Unidad = valorFormat;
                        if (valorFormat[valorFormat.length - 1] != '.')
                            contadorTotal += parseFloat(this.listaItem_Bodegas[ciclo].Unidad);
                    }
                    else
                            contadorTotal += parseFloat(this.listaItem_Bodegas[ciclo].Unidad);
                    
                }

                if (valorFormat[valorFormat.length - 1] != '.') {
                    this.mCantidadTotal = contadorTotal;
                    this.FormatPreciosUniDolar();
                }

            },
            FormatPreciosUniDolar: function () {
                let valorFormat = this.FormatearPreciosUni(this.mUniCosDolar);
                this.mUniCosDolar = valorFormat;

                if (valorFormat[valorFormat.length - 1] != '.') {
                    this.mUniCosCordo = (parseFloat(valorFormat) * parseFloat(this.tasaCambio)).toFixed(4);
                    this.mTotalCosCordo = (parseFloat(this.mUniCosCordo) * parseFloat(this.mCantidadTotal)).toFixed(4);
                    this.mTotalCosDolar = (parseFloat(valorFormat) * parseFloat(this.mCantidadTotal)).toFixed(4);
                }
            },
            FormatearPreciosUni: function (val) {
                let numeros = "0123456789.";
                let nuevoVal = "";
                let contadorPunto = 0;
                val = '' + val;
                for (let i = 0; i < val.length; i++) {
                    if (val[i] == '.') {
                        contadorPunto++;
                    }
                    if (contadorPunto > 1)
                        break;

                    if (numeros.indexOf(val[i]) > -1) {
                        nuevoVal += '' + val[i];
                    }

                }
                if (val.length == 0 || nuevoVal.length == 0)
                    nuevoVal = "0";

                let contadorCeroIzquierda = 0;
                let seguimiento = false;
                for (let i = 0; i < nuevoVal.length; i++) {
                    if (i == 0 && nuevoVal[i] == "0") {
                        contadorCeroIzquierda++;
                        seguimiento = true;
                    }

                    if (i > 0)
                        if (seguimiento == true && nuevoVal[i] == "0")
                            contadorCeroIzquierda++;

                        else
                            break;


                }

                if (seguimiento && contadorCeroIzquierda > 1) {

                    nuevoVal = nuevoVal.slice(contadorCeroIzquierda - 1, nuevoVal.length);

                }
                else
                    if (seguimiento && nuevoVal.length > 1 && nuevoVal[1] != '.')
                        nuevoVal = nuevoVal.slice(1, nuevoVal.length);

                val = nuevoVal;

                return val;
            }

        },
        computed: {
            clasesTasaCambio: function () {
                return {
                    'inputError': this.tasaCambio < 26
                }
            },
            clasesFormulario: function () {
                return {
                    'cartaAgregar': this.esNuevo,

                    'cartaEditar': this.esNuevo == false,
                }
            },
            clasesCard: function () {
                return {
                    'col-xs-12 col-sm-12 col-md-6 col-lg-6': this.estaCreando,

                    'col-xs-12 col-sm-12 col-md-12 col-lg-12': this.estaCreando == false,
                }
            },
            clasesAnimacion: function () {
                let arrayAnimaciones = [
                    "jackInTheBox",
                    "rollIn",
                    "flipInX",
                    "fadeInUp",
                    "pulse",
                    "lightSpeedIn",
                    "flipInY",
                    "fadeInRight"
                ]

                let aleatorio = Math.floor((Math.random() * 7) + 0);

                return {
                    'animated jackInTheBox elementoAnimado': this.estaCreando && aleatorio == 0,
                    'animated rollIn elementoAnimado': this.estaCreando && aleatorio == 1,
                    'animated flipInX elementoAnimado': this.estaCreando && aleatorio == 2,
                    'animated fadeInUp elementoAnimado': this.estaCreando && aleatorio == 3,
                    'animated pulse elementoAnimado': this.estaCreando && aleatorio == 4,
                    'animated lightSpeedIn elementoAnimado': this.estaCreando && aleatorio == 5,
                    'animated flipInY elementoAnimado': this.estaCreando && aleatorio == 6,
                    'animated fadeInRight elementoAnimado': this.estaCreando && aleatorio == 7,
                    '': this.estaCreando == false,
                }


            }
        },
        watch: {
            //mUniCosDolar: function (val, oldVal) {

            //    this.KeyUpPreciosUniDolar();

            //},
            //mUniCosCordo: function (val, oldVal) {


            //    this.KeyUpPreciosUniCordo();

            //}
        }


    });

});