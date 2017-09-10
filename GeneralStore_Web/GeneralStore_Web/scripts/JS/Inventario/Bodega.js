var tableColumns = [
        {
            name: 'id',
            title: '',
            dataClass: 'text-center',
            callback: 'showDetailRow'
        },
        {
            name: 'name',
            sortField: 'name',
        },
        {
            name: 'email',
            sortField: 'email',
        },
        {
            name: 'nickname',
            sortField: 'nickname',
            callback: 'allCap'
        },
        {
            name: 'birthdate',
            sortField: 'birthdate',
            callback: 'formatDate|D/MM/Y'
        },
        {
            name: 'gender',
            sortField: 'gender',
            titleClass: 'text-center',
            dataClass: 'text-center',
            callback: 'gender'
        },
        {
            name: '__component:custom-action',
            title: "Component",
            titleClass: 'center aligned',
            dataClass: 'custom-action center aligned',
        },
        {
            name: '__actions',
            dataClass: 'text-center',
        }
]


var vueObj = new Vue({
    el: "#appVue",
    data: {
        searchFor: '',
        fields: tableColumns,
        sortOrder: [{
            field: 'name',
            direction: 'asc'
        }],
        multiSort: true,
        perPage: 50,
        paginationComponent: 'vuetable-pagination',
        paginationInfoTemplate: 'แสดง {from} ถึง {to} จากทั้งหมด {total} รายการ',
        itemActions: [
            { name: 'view-item', label: '', icon: 'glyphicon glyphicon-zoom-in', class: 'btn btn-info', extra: { 'title': 'View', 'data-toggle': "tooltip", 'data-placement': "left" } },
            { name: 'edit-item', label: '', icon: 'glyphicon glyphicon-pencil', class: 'btn btn-warning', extra: { title: 'Edit', 'data-toggle': "tooltip", 'data-placement': "top" } },
            { name: 'delete-item', label: '', icon: 'glyphicon glyphicon-remove', class: 'btn btn-danger', extra: { title: 'Delete', 'data-toggle': "tooltip", 'data-placement': "right" } }
        ],
        moreParams: [],
    },
    watch: {
        'perPage': function (val, oldVal) {
            this.$broadcast('vuetable:refresh')
        },
        'paginationComponent': function (val, oldVal) {
            this.$broadcast('vuetable:load-success', this.$refs.vuetable.tablePagination)
            this.paginationConfig(this.paginationComponent)
        }
    },
    methods:
    {
        /**
             * Callback functions
             */
        showDetailRow: function (value) {
            var icon = this.$refs.vuetable.isVisibleDetailRow(value) ? 'glyphicon glyphicon-minus-sign' : 'glyphicon glyphicon-plus-sign'
            return [
                '<a class="show-detail-row">',
                    '<i class="' + icon + '"></i>',
                '</a>'
            ].join('')
        },


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
        this.CargarDataInventario();
    },



});

vueObj.config.debug = true;
