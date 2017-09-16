$(document).ready(function () {


    var alertasComponent = Vue.component("alertas-noob", {

        template: [
            '<div class="row">',
            '<div class="col-xs-12 col-lg-12">',
            '<div v-show="visibleAlerta" class="alert alert-dismissable animated zoomInUp" id="elementoAnimado" v-bind:class="clasesAlerta">',
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;',
            '</a>',
            '<strong v-show="mensajeErrorTabla"><i class="fa fa-warning"></i> Error al cargar los datos en la tabla',
            '</strong>',
            '<strong v-show="mensajeDatoGuardado" ><i class="fa fa-save"></i> Dato guardado con exito',
            '</strong>',
            '<strong v-show="mensajeDatoEliminado" ><i class="fa fa-trash-o"></i> Dato eliminado con exito',
            '</strong>',
            '<strong v-show="mensajeDatoActualizado" ><i class="fa fa-pencil-squere-o"></i> Dato actualizado con exito',
            '</strong>',
            '</div>',
            '</div>',
            '</div>'
        ].join(''),
        data:{
            mensajeErrorTabla: false,
            mensajeDatoGuardado: false,
            mensajeDatoEliminado: false,
            mensajeDatoActualizado: false,
            mensajeErrorDato: false
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

                this.mensajeErrorTabla = (this.estadoAlerta==false && this.accionAlerta == 1) ? true: false;
                this.mensajeDatoGuardado = (this.estadoAlerta == true && this.accionAlerta == 0) ? true : false;
                this.mensajeDatoEliminado = (this.estadoAlerta == true && this.accionAlerta == 3) ? true : false;
                this.mensajeDatoActualizado = (this.estadoAlerta == true && this.accionAlerta == 2) ? true : false;
                this.mensajeErrorDato = (this.estadoAlerta == true && this.accionAlerta != 1) ? true : false;


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
            }
        },
        mounted() {
            this.CrearTabla()
        },
        methods: {
            CrearTabla: function () {

            },
            FormatoColumnas: () => {

                let lista = [];
                let objeto = {}
                $.each(this.columnasNoob, function (value, key) {

                    objeto = {
                        "data": "" + value
                    }

                    lista.push(objeto);


                });

                return lista;
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
                        "data": this.dataNoob,
                        "columns": this.columnasNoob

                    });

                    this.tablaDefinida.columns().visible();

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
                }
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
            mCodigo: ""
        },
        mounted() {
            $("#appVue").toggle("fast", function () {
                // Animation complete.
            });
            this.RecargarTabla()
        },
        methods: {
            LimpiarVariables: function () {
                this.mNombre = "",
                this.mDescripcion = "",
                this.mCodigo = ""
            },
            NuevaBodega: function () {
                this.LimpiarVariables();
                this.estaCreando = (this.estaCreando) ? false : true;
                this.visibleAlerta = false;
                this.esNuevo = true;
            },
            CerrarForm: function () {
                this.LimpiarVariables();
                this.estaCreando = false;
                this.visibleAlerta = false;
            },
            RecargarTabla: function () {


                fetch('/Inventario/Bodega/ObtenerTodo', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function (response) {
                    return response.json();
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

                }.bind(this));

            },
            GuardarBodega: function () {

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
                        EsNuevo: this.esNuevo
                    })
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {

                    if (json.Lista !== undefined && json.Lista.length > 0)
                        this.dataNoob = json.Lista;
                    else
                        this.dataNoob = [];

                    this.peticionServer = false;
                    this.estaCreando = false;
                    this.accionAlerta = 0;

                    if (json.Estado == false) {
                        this.errorDataNoob = true;
                        this.estadoAlerta = false;
                    }
                    else {
                        this.errorDataNoob = false;
                        this.estadoAlerta = true;
                    }
                    this.visibleAlerta = true;


                }.bind(this));


            }
        },
        computed: {
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
                    'animated jackInTheBox elementoAnimado': this.estaCreando && aleatorio ==0,
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