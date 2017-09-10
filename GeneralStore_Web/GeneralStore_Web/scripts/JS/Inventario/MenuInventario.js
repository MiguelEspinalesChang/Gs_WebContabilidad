
var vueObj = new Vue({
    el: "#appVue",
    data: {

    },
    methods:
    {
        CargarDataInventario: function() {
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
    mounted: function ()
    {
        this.CargarDataInventario();
    },



});

vueObj.config.debug = true;
