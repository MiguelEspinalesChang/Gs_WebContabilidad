$(document).ready(function () {

    var alertasComponent = Vue.component("alertas-noob", {

        template: [
            '<div class="row" v-show="visibleAlerta">',
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
        /*	template: [
            '<table :id="idTabla">',
            '<thead>',
            '<tr>',
            '<td :v-for="colN in columnasNoob">',
            '{{colN.nombre}}'
            '</td>',
            '</tr>',
            '</thead>',
            '<tbody>',
            '<tr :v-for="filaN in dataNoob">',
                '<td>',
                '',
                ,'</td>',
            '</tr>',
            '</tbody>',
            '</table>'
            ].join(''),*/
        template: [
            '<table :id="idTabla" class="table table-striped table-hover"  style="width=100%" cellspacing="0">',
            '</table>'
        ].join(''),
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
            tablaDefinida: {
                type: Object
            }
        },
        mounted() {
            this.CrearTabla()
        },
        methods: {
            CrearTabla: function () {
                //	$("#"+this.idTabla).DataTable();
                //	$('#'+this.idTabla).DataTable( {
                //	data: this.dataNoob,
                //	columns: this.columnasNoob
                //	} );

                //	$("#"+this.idTabla).addClass("jeje");
                //	alert($("#"+this.idTabla).size());
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

                }
                else {
                    this.tablaDefinida.clear();
                    this.tablaDefinida.rows.add(val);
                    this.tablaDefinida.draw();
                }



            }
        }

    });

    var app = new Vue({
        el: "#appVue",
        data: {
            estaCreando: false,
            creando: true,
            idTabla: "jojojojo",
            columnasNoob: [
                {
                    data: "IdBodega"
                },
                {
                    data: "Nombre"
                },
                {
                    data: "Descripcion"
                },
                {
                    data: "Codigo"
                }
            ],
            dataNoob: [],
            total: 0,
            datosJson: [],
            estadoAlerta: false,
            accionAlerta: 0,
            textoAlerta: "",
            visibleAlerta : false
        },
        mounted() {
            this.RecargarTabla()
        },
        methods: {
            NuevaBodega: function () {
                this.creando = (this.estaCreando) ? true : false;
                this.estaCreando = (this.estaCreando) ? false : true;
                
            },
            CerrarForm: function(){
                this.creando = true;
                this.estaCreando = false;
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
                    if (json.Estado == false)
                    {
                        this.estadoAlerta = false;
                        this.textoAlerta = "jejee"
                    }
                    else {
                        this.dataNoob = json.Lista;
                    }

                    this.visibleAlerta = true;

                }.bind(this));

            },
            GuardarRegistro: function () {

                fetch('/Inventario/Bodega/Guardar', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    this.dataNoob = json.Lista;
                }.bind(this));


            }
        }
    });

    $('#example').DataTable();
});