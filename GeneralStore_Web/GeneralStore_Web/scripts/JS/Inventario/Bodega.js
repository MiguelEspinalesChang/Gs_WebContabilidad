$(document).ready(function () {


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
                    objeto.Nombre = filaData[0].Nombre;
                    objeto.Descripcion = filaData[0].Descripcion;
                    objeto.Codigo = filaData[0].Codigo;
                    objeto.IdBodega = filaData[0].IdBodega;
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
                    "data": "IdBodega",
                    "title": "Id Bodega",
                    "width": "15%"
                },
                {
                    "data": "Nombre",
                    "title": "Nombre",
                    "width": "30%"
                },
                {
                    "data": "Descripcion",
                    "title": "Descripción",
                    "width": "40%"
                },
                {
                    "data": "Codigo",
                    "title": "Código",
                    "width": "15%"
                },
                //{
                //    "data": null,
                //    "title": "Editar",
                //    "defaultContent": '<button v-on:click="EditarRegistro" class="btn btn-sm btn-warning"><i class="fa fa-edit"></i>Editar</button>',
                //    "orderable": false
                //},
                //{
                //    "data": null,
                //    "title": "Eliminar",
                //    "defaultContent": '<button v-on:click="EliminarRegistro" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i>Eliminar</button>',
                //    "orderable": false
                //}
            ],
            dataNoob: [],
            errorDataNoob: false,
            total: 0,
            datosJson: [],
            estadoAlerta: false,
            accionAlerta: 0,
            visibleAlerta: false,
            mNombre: "",
            mDescripcion: "",
            mCodigo: "",
            mIdBodega: 0,
            listaErrores: []
        },
        mounted() {
            $("#appVue").toggle("fast", function () {
                // Animation complete.
            });
            this.RecargarTabla()
        },
        methods: {
            LimpiarVariables: function () {
                this.mNombre = "";
                this.mDescripcion = "";
                this.mCodigo = "";
                this.mIdBodega = 0;
                this.listaErrores = [];
            },
            NuevoRegistroNoob: function () {
                this.LimpiarVariables();
                this.estaCreando = true;
                this.visibleAlerta = false;
                this.esNuevo = true;
            },
            EditarRegistroNoob: function (datos) {
                this.LimpiarVariables();
                this.estaCreando = true;
                this.visibleAlerta = false;
                this.esNuevo = false;
                this.mNombre = "" + datos.Nombre,
                this.mDescripcion = "" + datos.Descripcion,
                this.mCodigo = "" + datos.Codigo,
                this.mIdBodega = datos.IdBodega;
            },
            CerrarForm: function () {
                this.LimpiarVariables();
                this.estaCreando = false;
                this.visibleAlerta = false;
            },
            RecargarTabla: function () {
                this.LimpiarVariables();
                if (this.errorServer == false) {

                    fetch('/Inventario/Bodega/ObtenerTodo', {
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
                            //console.log('There has been a problem with your fetch operation: ' + error.message);

                        }.bind(this));


                }//fin if


            },
            GuardarBodega: function () {

                if (this.errorServer == false && this.peticionServer == false) {

                    this.listaErrores = [];
                    this.peticionServer = true;
                    this.visibleAlerta = false;

                    fetch('/Inventario/Bodega/Guardar', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Nombre: this.mNombre,
                            Descripcion: this.mDescripcion,
                            Codigo: this.mCodigo,
                            EsNuevo: this.esNuevo,
                            IdBodega: this.mIdBodega
                        })
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
                        else {

                            if (json.Estado !== undefined)
                                this.dataNoob = [];
                        }

                        if (json.Estado !== undefined && json.Peticion == true)
                            this.mIdBodega = json.IdObjeto;

                        this.peticionServer = false;
                        this.estaCreando = true;

                        if (this.esNuevo == false) {
                            this.accionAlerta = 2;
                        }
                            //si la peticion era nuevo y la peticion del server viene en true
                            //cambiar a esnuevo = false
                        else {
                            this.accionAlerta = 0;

                            if (json.Peticion == true)
                                this.esNuevo = false;
                        }


                        if (json.Estado !== undefined && (json.Estado == false || json.Peticion == false)) {

                            if (json.Estado == false)
                                this.errorDataNoob = true;

                            if (json.Peticion == false) {
                                this.listaErrores = json.Errores;
                            }

                            this.estadoAlerta = false;
                        }
                        else {
                            this.errorDataNoob = false; //para el datatable
                            this.estadoAlerta = true; //para la alerta

                            if(json.Estado === undefined)
                                this.listaErrores = json.Errores;
                        }

                        if (json.Estado !== undefined)
                            this.visibleAlerta = true;

                        this.errorServer = false; //es por si el ASP no termina la peticion


                    }.bind(this)).catch(function (error) {


                        this.accionAlerta = 500;
                        this.dataNoob = [];
                        this.estadoAlerta = false;
                        this.errorDataNoob = true;
                        this.visibleAlerta = true;
                        this.peticionServer = true;
                        this.estaCreando = true;
                        this.errorServer = true;
                        this.listaErrores = [];
                        this.listaErrores.push({
                            "mensaje": "Error en el servidor, porfavor recargue la página !!"
                        });

                    }.bind(this));



                }//fin if




            }
        },
        computed: {
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


    });

});