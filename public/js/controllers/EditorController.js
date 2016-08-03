function EditorController($scope, uiGmapGoogleMapApi, ItemPage, SICRResource, SubItem, Item, $modal) {

    /*** Init Controller **/
    var CENTER_MDQ = {
        latitude: -38.000404,
        longitude: -57.556197
    };
    var sizeByPage = 20;
    $scope.map = {};

    function initEditItem() {
        $scope.itemToEdit = {};
        $scope.itemToEdit.markersResult = [];
    }

    initEditItem();

    /**
     * Crea el mapa inicial.
     * Genera el mapa con la configuación por defecto.
     * Se definen los eventos del mapa.
     */
    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {
            center: CENTER_MDQ,
            zoom: 16,
            options: {
                scrollwheel: true,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                scaleControl: true,
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                }
            },
            control: {},
        };
        // Evento clik: genera un nuevo marker.
        $scope.map.events = {
            click: function(map, click, event) {
                var e = event[0];
                var model = {};
                model.latitude = e.latLng.lat();
                model.longitude = e.latLng.lng();
                model.idKey = model.latitude + "." + model.longitude;
                var marker = {
                    model: model
                };
                $scope.onClick(marker, click, event);
            }
        };
    });

    /**
     * Genera un pagina por defecto
     */
    function getNewPage(pageNumber) {
        var page = {
            "pageNumber": pageNumber,
            "pageSize": sizeByPage,
            "orderType": 0,
            "sortColumn": "id"
        }
        return page;
    }

    /**
     * Recupera la lista de items de forma paginada.
     * Permite busqueda por nombre de item
     */
    $scope.getItems = function(page) {
        var newItem = {
            name: $scope.textSearchItem
        }
        ItemPage.getAll({
            page: getNewPage(page),
            item: newItem
        }, function(data) {
            if (data.totalResults > 0) {
                $scope.items = data.result;
                $scope.totalResults = data.totalResults;
            }
        }, function(error) {});
    }

    $scope.pageChanged = function() {
        $scope.getItems($scope.currentPage);
    }

    $scope.getItems(1);

    /**
     * SubItems
     */
    $scope.listSubItems = function(item) {
        initEditItem();
        $scope.itemToEdit.item = angular.copy(item);
        $scope.itemToEdit.itemSource = item;
        getSubItems();
    }

    /**
     * Recupera los SubItems dado un item
     */
    var getSubItems = function() {
        SICRResource.getAll({
            idsItems: [$scope.itemToEdit.item.id]
        }, function(data) {
            if (data.length > 0) {
                $scope.itemToEdit.markersResult = data;
                $scope.itemToEdit.markersResult.options = {
                    draggable: true
                };
                $scope.itemToEdit.markersResult.events = {
                    rightclick: function(marker, eventName, model) {
                        $scope.rightClick(marker, eventName, model);
                    },
                    click: function(marker, eventName, model) {
                        $scope.onClick(marker, eventName, model);
                    }
                };
            }
        }, function(error) {});
    }

    $scope.subItemPageChanged = function() {
        getSubItems($scope.currentSubItemPage);
    }

    /*** EDITION de Item ***/

    /**
     * Cancela la edición del item.
     */
    $scope.cancelItem = function() {
        initEditItem();
    }

    $scope.saveItem = function() {
        if ($scope.itemToEdit.itemSource === undefined) {
            $scope.itemToEdit.itemSource = {};
        }
        $scope.itemToEdit.itemSource.name = $scope.itemToEdit.item.name;
        $scope.itemToEdit.itemSource.description = $scope.itemToEdit.item.description;
        $scope.itemToEdit.itemSource.url = $scope.itemToEdit.item.url;
        Item.save({
            item: $scope.itemToEdit.itemSource,
            subItems: $scope.itemToEdit.markersResult,
            removedSubItems: $scope.itemToEdit.markersToRemove
        }, function(itemSaved) {
            $scope.itemToEdit.itemSource = itemSaved;
        }, function(err) {});
    }

    /** Modal para SubItem **/

    /**
     * Genera el Modal para poder crear / editar un subItem.
     */
    $scope.onClick = function(marker, eventName, model) {
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'templates/subItemModal.jsp',
            controller: 'SubItemModalController',
            resolve: {
                subItemToEdit: function() {
                    return marker;
                }
            }
        });

        modalInstance.result.then(function(data) {
            marker.model.name = data.name;
            marker.model.description = data.description;
            marker.model.address = data.address;

            // Si data contiene id entonces era un marker viejo
            if (!data.id) {
                data.item = $scope.itemToEdit.item;
                $scope.itemToEdit.markersResult.push(data);
            }
        }, function(err) {});
    };

    /**
     * Genera el Modal para eliminar un subitem
     */
    $scope.rightClick = function(marker, eventName, model) {
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            size: 'sm',
            templateUrl: 'templates/subItemRemove.jsp',
            controller: 'SubItemModalController',
            resolve: {
                subItemToEdit: function() {
                    return marker;
                }
            }
        });

        modalInstance.result.then(function(data) {
            $scope.itemToEdit.markersToRemove = _.remove($scope.itemToEdit.markersResult, function(item) {
                return item.idKey === marker.model.idKey;
            });
            $scope.itemToEdit.markersResult = _.remove($scope.itemToEdit.markersResult, function(item) {
                return item.idKey !== marker.model.idKey;
            });
        }, function(err) {});
    };
}
