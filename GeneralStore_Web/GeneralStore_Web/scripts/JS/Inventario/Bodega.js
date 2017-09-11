Vue.component('tabla-gs', {
    template: [
        '<table class="table table-striped">',
        '<thead>',
        '<tr>',
            '<th v-for="item in columnasGs">',
                '{{item.nombre}}',
            '</th>',
        '</tr>',
        '</thead>',
        '<tbody>',
        '</tbody>',
        '</table>'
    ].join(''),
    props: {
        columnasGs: {
            type: Array,
            required: true
        },
        dataJsonGs: {
            type: Array,
            required: true
        }
    }
});


var vueObj = new Vue({
    el: "#appVue",
    data: {
        columnasGs: [
            {
                nombre: "uno"
            },
            {
                nombre: "dos"
            },
            {
                nombre: "tres"
            }
        ],
        dataJsonGs: {}
    },
    methods:
    {
        CargarDataInventario: function () {
            fetch('/Inventario/MenuInventario/GetDataGeneral', {
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
    },
    mounted: function () {
        //this.CargarDataInventario();
    }



});
