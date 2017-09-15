$(document).ready(function () {


    var alertasComponent = Vue.component("alertas-noob", {

        template: [
            '<div class="row" v-show="visibleAlerta" >',
            '<div class="col-xs-12 col-lg-12">',
            '<div class="alert alert-dismissable animated zoomInUp" id="elementoAnimado" v-bind:class="clasesAlerta">',
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;',
            '</a>',
            '<strong>{{textoAlerta}}',
            '</strong>',
            '</div>',
            '</div>',
            '</div>'
        ].join(''),
        props: {
            estadoAlerta: {
                type: Boolean,
                required: true
            },
            accionAlerta: {
                type: Number,
                required: true
            },
            textoAlerta: {
                type: String,
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
                    'alert-success': this.accionAlerta == 1 && this.estadoAlerta == false,
                    'alert-danger': this.accionAlerta == 1 && this.estadoAlerta == true,
                }
            }
        },
        watch: {

            visibleAlerta: function (val, oldVal) {




            }
        }

    })

    var tablaNoobVar = Vue.component("tabla-noob", {
        template: [
            '<table :id="idTabla" class="table table-striped table-hover"  style="width=100%" cellspacing="0">',
            '</table>'
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
            estaGuardando: false,
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
            total: 0,
            datosJson: [],
            estadoAlerta: false,
            accionAlerta: 0,
            textoAlerta: "",
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

                    this.textoAlerta = "jejeedsfsd sdfsdf"
                    this.accionAlerta = 1;
                    if (json.Estado == false) {
                        this.estadoAlerta = false;
                        this.textoAlerta = "jejee"
                    }
                    else {
                        this.dataNoob = json.Lista;
                    }

                    this.visibleAlerta = true;

                }.bind(this));

            },
            GuardarBodega: function () {

                this.estaGuardando = true;
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
                    this.dataNoob = json.Lista;
                    this.estaGuardando = false;
                    this.estaCreando = false;
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
                var arrayAnimaciones = [
                    "jackInTheBox",
                    "rollIn",
                    "flipInX",
                    "fadeInUp",
                    "pulse",
                    "lightSpeedIn",
                    "flipinY",
                    "fadeInRight"
                ]

                var clase = arrayAnimaciones[Math.floor((Math.random() * 7) + 0)];

                return {
                    'animated jackInTheBox': this.estaCreando,

                    '': this.estaCreando == false,
                }


            }
        },


    });

});