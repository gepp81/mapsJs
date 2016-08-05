angular.module('services', [])
    .factory('SICRResource', function ($resource) {
        return $resource('/api/point/byAll/:circle/:idCategories/:idsItems', {}, {
            getAll: {
                method: 'POST',
                data: {
                    circle: '@circle',
                    idCategories: '@idCategories',
                    idsItems: '@idsItems'
                },
                isArray: true,
                interceptor: {
                    response: function (response) {
                        return response.data;
                    }
                }
            }
        })
    })
    .factory('ItemPage', function ($resource) {
        return $resource('/mdqmaps/item/getPage/:page', {}, {
            getAll: {
                method: 'POST',
                data: {
                    page: "@page"
                },
                interceptor: {
                    response: function (response) {
                        return response.data;
                    }
                }
            }
        })
    })
    .factory('SubItem', function ($resource) {
        return $resource('/mdqmaps/item/saveSubItem/', {}, {
            save: {
                method: 'POST',
                interceptor: {
                    response: function (response) {
                        return response.data;
                    }
                }
            }
        })
    })
    .factory('Item', function ($resource) {
        return $resource('/mdqmaps/item/saveFullItem', {}, {
            save: {
                method: 'POST',
                interceptor: {
                    response: function (response) {
                        return response.data;
                    }
                }
            }
        })
    })
    .factory('Autocomplete', function ($resource) {
        return $resource("/category/:name", {}, {
            get: {
                method: 'GET',
                param: {
                    name: '@name'
                },
                isArray: true,
                interceptor: {
                    response: function (response) {
                        return response.data;
                    }
                }
            }
        })
    })
