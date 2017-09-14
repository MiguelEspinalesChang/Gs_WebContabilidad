$(document).ready(function () {


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
                        data: this.dataNoob,
                        columns: this.columnasNoob
                    });

                }
                else
                {
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
            mensaje: "Programando desde el Hospital",
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
            datosJson: []
        },
        mounted() {
            this.RecargarTabla()
        },
        methods: {
            BotonPrueba: function () {
                this.total = this.dataNoob.length;
                this.datosJson = JSON.stringify(this.dataNoob);
            },
            RecargarTabla: function () {
                //var random = Math.floor((Math.random() * 70) + 4);

                /*var arregloNombre = [
                    'Carazeña',
                    'Loquera',
                    'Alucin',
                    'Ninja',
                    'killa queen',
                    'Naniiii',
                    'Siuuuuu',
                    'Trapitos',
                    'Golazoo',
                    'El nexo',
                    'Taijutsu',
                    'Robocop',
                    'Chayo palo',
                    'Antena',
                    'Chun lee',
                    'Chaman mejora',
                    'Dk caster',
                    'Caza melee',
                    'Bootstrap',
                    'que nootaa',
                    'El chatel',
                ];*/

                /*var codigos = [
                    'Loq-',
                    'Cod-',
                    'Item-',
                    'Bode-',
                    'Gol-'
                ];*/

                /*for (var iii = 0; iii < random; iii++) {
                    var randomNombre = Math.floor((Math.random() * 19) + 0);
                    var randomCodigo = Math.floor((Math.random() * 4) + 0);
                    var objeto44 = {

                        "IdBodega": "" + iii,
                        "Nombre": "" + arregloNombre[randomNombre],
                        "Descripcion": "" + codigos[randomCodigo] + "  ///^&&&$$  " + arregloNombre[randomNombre] + " %€£##*#&",
                        "Codigo": "" + codigos[randomCodigo] + iii
                    };
                    this.dataNoob.push(objeto44);

                }*/

                fetch('/Inventario/Bodega/GetBodega', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function (response) {

                })
                .then(function (json) {

                }.bind(this));


            }
        }
    });

    $('#example').DataTable();
});