//https://davidwalsh.name/fetch

var _areaGs = document.getElementById('areaGS').textContent;
var _controllerGs = document.getElementById('controllerGS').textContent;

var vueObj = new Vue({
    el: '#side-main-menu',
    mounted: function () {
        this.CargarMenuActivo();
    },
    data:
    {
        menuHome: true,
        menuCliente: false,
        menuInventario: false
    },
    methods: {
        CargarMenuActivo: function () {

            //fetch('/Home/MenuActivo/', {
            //    method: 'post',
            //    headers: {
            //        'Content-Type': 'application/json'
            //    },
            //    body: JSON.stringify({
            //        _areaValue: "" + _areaGs,
            //        _controllerValue: "" + _controllerGs
            //    })
            //})
            //.then(function (response) {

            //})
            //.then(function (json) {

            //}.bind(this));

            this.menuHome = false;
            this.menuCliente = false;
            this.menuInventario = false;

            var controlador = "" + _controllerGs.toLocaleLowerCase();
            var areaServer = (_areaGs != "null") ? _areaGs.toLowerCase() : "";

            if (areaServer == "" && controlador == 'home')
                this.menuHome = true;

            if (areaServer != "" && areaServer == "inventario")
                this.menuInventario = true;

            if (areaServer != "" && areaServer == "cliente")
                this.menuCliente = true;

        }
    },


});
